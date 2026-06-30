import { initI18n, t } from './i18n.js';
import { getAudioCtx, setSoundOn, getSoundOn } from './audio.js';
import { engine, updateWalls, spawnShape, popCurrentShape, handleObjectTap } from './physics.js';
import { updateParticlesAndTrail, draw, createTapEffect } from './renderer.js';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW setup failed', err));
  });
}

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
let w, h;
let isPaused = false;
let isFirstTap = true;
let tapTimes = [];
let lastTapTime = 0;

// --- 画面スリープ防止 (Wake Lock) ---
let wakeLock = null;
async function acquireWakeLock() {
  if ('wakeLock' in navigator) {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
    } catch (_) {}
  }
}

// タブが非表示→再表示になったときにWake Lockを再取得し、ゲームを再開
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible') {
    await acquireWakeLock();
    if (!document.getElementById('parent-menu').classList.contains('active')) {
      isPaused = false;
    }
  } else {
    isPaused = true;
  }
});

// --- Android「戻る」ボタン・スワイプ防止 ---
history.pushState(null, '', location.href);
window.addEventListener('popstate', () => {
  history.pushState(null, '', location.href);
});

function handleResize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
  updateWalls(w, h);
}
window.addEventListener('resize', handleResize);

function init() {
  initI18n();
  handleResize();
  acquireWakeLock();
  requestAnimationFrame(loop);
}

function loop() {
  if (!isPaused) {
    window.Matter.Engine.update(engine, 1000 / 60);
    updateParticlesAndTrail();
  }
  draw(ctx, w, h, isFirstTap);
  requestAnimationFrame(loop);
}

document.addEventListener('contextmenu', e => e.preventDefault());

// --- PIN 保護 ---
const CORRECT_PIN = '1234';
let pinInput = '';

function showPinOverlay() {
  isPaused = true;
  pinInput = '';
  updatePinDots();
  document.getElementById('pin-overlay').classList.add('active');
}

function hidePinOverlay() {
  pinInput = '';
  updatePinDots();
  document.getElementById('pin-overlay').classList.remove('active');
}

function updatePinDots() {
  document.querySelectorAll('.pin-dot').forEach((dot, i) => {
    dot.classList.toggle('filled', i < pinInput.length);
    dot.classList.remove('error');
  });
}

function handlePinDigit(digit) {
  if (pinInput.length >= 4) return;
  pinInput += digit;
  updatePinDots();
  if (pinInput.length === 4) {
    if (pinInput === CORRECT_PIN) {
      hidePinOverlay();
      showParentMenu();
    } else {
      document.querySelectorAll('.pin-dot').forEach(dot => dot.classList.add('error'));
      const dialog = document.getElementById('pin-dialog');
      dialog.classList.add('pin-shake');
      setTimeout(() => {
        dialog.classList.remove('pin-shake');
        pinInput = '';
        updatePinDots();
      }, 450);
    }
  }
}

document.getElementById('pin-cancel').addEventListener('click', () => {
  hidePinOverlay();
  isPaused = false;
});

document.getElementById('pin-back').addEventListener('click', () => {
  pinInput = pinInput.slice(0, -1);
  updatePinDots();
});

document.querySelectorAll('.pin-key[data-digit]').forEach(btn => {
  btn.addEventListener('click', () => handlePinDigit(btn.dataset.digit));
});

document.addEventListener('pointerdown', (e) => {
  if (e.target.closest('#parent-menu') || e.target.closest('#pin-overlay')) return;
  e.preventDefault();

  if (isPaused) return;

  const x = e.clientX;
  const y = e.clientY;
  const now = Date.now();

  if (x <= 50 && y <= 50) {
    tapTimes.push(now);
    tapTimes = tapTimes.filter(t => now - t <= 1000);
    if (tapTimes.length >= 3) {
      tapTimes = [];
      showPinOverlay();
      return;
    }
  }

  if (now - lastTapTime < 300) return;
  lastTapTime = now;
  
  getAudioCtx();
  if (isFirstTap) {
    // 初回タップでフルスクリーンに移行 → ブラウザUIを隠す
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }
  isFirstTap = false;
  
  const hitObject = handleObjectTap(x, y);
  if (!hitObject) {
    spawnShape(x, y, w, h);
  }
  
  createTapEffect(x, y);

}, { passive: false });

function showParentMenu() {
  isPaused = true;
  document.getElementById('parent-menu').classList.add('active');
  document.getElementById('menu-overlay').classList.add('active');
}

function hideParentMenu() {
  isPaused = false;
  document.getElementById('parent-menu').classList.remove('active');
  document.getElementById('menu-overlay').classList.remove('active');
}

document.getElementById('btn-reset').addEventListener('click', () => {
  popCurrentShape();
  hideParentMenu();
});

document.getElementById('btn-sound').addEventListener('click', (e) => {
  setSoundOn(!getSoundOn());
  e.target.textContent = getSoundOn() ? t('soundOn') : t('soundOff');
});

document.getElementById('btn-close').addEventListener('click', hideParentMenu);

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  } else {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }
}

function updateFullscreenButton() {
  document.getElementById('btn-fullscreen').textContent = document.fullscreenElement ? t('exitFullscreen') : t('enterFullscreen');
}

document.addEventListener('fullscreenchange', updateFullscreenButton);
document.getElementById('btn-fullscreen').addEventListener('click', toggleFullscreen);

document.getElementById('btn-back-website').addEventListener('click', () => {
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  window.location.href = '/';
});

init();
