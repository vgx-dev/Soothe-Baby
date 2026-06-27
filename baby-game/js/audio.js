let audioCtx;
let isSoundOn = true;

export function getAudioCtx() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

export function setSoundOn(value) {
  isSoundOn = value;
}

export function getSoundOn() {
  return isSoundOn;
}

export function playSound(type) {
  if (!isSoundOn) return;
  try {
    const ctx = getAudioCtx();
    const t = ctx.currentTime;
    
    if (type === 'spawn') {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'sine';
      
      const baseFreq = 300 + Math.random() * 200;
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 2, t + 0.15);
      
      gainNode.gain.setValueAtTime(0, t);
      gainNode.gain.linearRampToValueAtTime(0.3, t + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(t);
      osc.stop(t + 0.2);
    } 
    else if (type === 'bounce') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(150, t + 0.05);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(t); osc.stop(t + 0.1);
    } 
    else if (type === 'pop') {
      const freqs = [1046.50, 1318.51, 1567.98, 2093.00, 2637.02];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, t + i * 0.06);
        gain.gain.setValueAtTime(0, t + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.1, t + i * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, t + i * 0.06 + 0.2);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(t + i * 0.06); osc.stop(t + i * 0.06 + 0.2);
      });
    }
  } catch(e) { console.warn('Audio playback failed', e); }
}
