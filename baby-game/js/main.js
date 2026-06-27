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

document.addEventListener('pointerdown', (e) => {
  if (e.target.closest('#parent-menu')) return;
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
      showParentMenu();
      return; 
    }
  }

  if (now - lastTapTime < 300) return;
  lastTapTime = now;
  
  getAudioCtx();
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

init();
