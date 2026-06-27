import { t } from './i18n.js';
import { activeBodies } from './physics.js';

let particles = [];
let time = 0;

const images = {};
const shapes = ['star', 'circle', 'triangle', 'square'];

function processImageBackground(img) {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  
  const w = canvas.width;
  const h = canvas.height;
  const corners = [
    0, 
    (w - 1) * 4, 
    (h - 1) * w * 4, 
    ((h - 1) * w + w - 1) * 4
  ];
  let bgR = 0, bgG = 0, bgB = 0;
  for (let c of corners) {
    bgR += data[c]; bgG += data[c+1]; bgB += data[c+2];
  }
  bgR /= 4; bgG /= 4; bgB /= 4;

  let minX = w, minY = h, maxX = 0, maxY = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const r = data[i], g = data[i+1], b = data[i+2];
      
      const dist = Math.abs(r - bgR) + Math.abs(g - bgG) + Math.abs(b - bgB);
      
      if (dist < 20) {
        data[i+3] = 0;
      } else if (dist < 50) {
        data[i+3] = 255 * ((dist - 20) / 30);
      }
      
      if (data[i+3] > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  
  ctx.putImageData(imgData, 0, 0);

  if (minX <= maxX && minY <= maxY) {
    const padding = 2;
    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = Math.min(w - 1, maxX + padding);
    maxY = Math.min(h - 1, maxY + padding);
    
    const cropW = maxX - minX + 1;
    const cropH = maxY - minY + 1;
    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = cropW;
    cropCanvas.height = cropH;
    const cropCtx = cropCanvas.getContext('2d');
    cropCtx.drawImage(canvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
    return cropCanvas;
  }
  return canvas;
}

shapes.forEach(shape => {
  let img = new Image();
  img.src = `./${shape}.png`;
  img.onload = () => {
    images[shape] = processImageBackground(img);
  };
});
export function createParticles(x, y, color) {
  for (let i = 0; i < 20; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 1;
    particles.push({
      x: x, y: y,
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      life: 1.0, decay: Math.random() * 0.02 + 0.02,
      color: color,
      size: Math.random() * 6 + 2
    });
  }
}

const powaColors = ['#FF6B81', '#1DD1A1', '#FECA57', '#54A0FF', '#FF9F43', '#5F27CD', '#FF9FF3', '#48DBFB'];
const powaShapes = ['circle', 'square', 'star'];

export function createTapEffect(x, y) {
  const mainColor = powaColors[Math.floor(Math.random() * powaColors.length)];
  particles.push({
    type: 'ripple',
    x: x, y: y,
    color: mainColor,
    radius: 10,
    life: 1.0,
    decay: 0.04
  });
  
  const count = Math.floor(Math.random() * 10) + 15;
  for(let i=0; i<count; i++) {
    const color = powaColors[Math.floor(Math.random() * powaColors.length)];
    const shape = powaShapes[Math.floor(Math.random() * powaShapes.length)];
    
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 10 + 2;
    particles.push({
      type: 'powaparticle',
      x: x, y: y,
      color: color,
      shape: shape,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 6,
      size: Math.random() * 15 + 10,
      life: 1.0,
      decay: Math.random() * 0.015 + 0.005,
      gravity: 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2
    });
  }
}

export function createHitEffect(x, y) {
  const count = 8 + Math.floor(Math.random() * 5);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + 2;
    const color = powaColors[Math.floor(Math.random() * powaColors.length)];
    
    particles.push({
      type: 'powaparticle',
      shape: 'star',
      x: x, y: y,
      color: color,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 10 + 5,
      life: 1.0,
      decay: Math.random() * 0.02 + 0.01,
      gravity: 0.1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.3
    });
  }
}

export function updateParticlesAndTrail() {
  time += 0.02;
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    if (p.type === 'ripple') {
      p.radius += 6;
      p.life -= p.decay;
    } else if (p.type === 'powaparticle') {
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      p.rotation += p.rotationSpeed;
    } else {
      p.x += p.vx; p.y += p.vy; p.life -= p.decay;
    }
    if (p.life <= 0 || p.y > window.innerHeight + 50) particles.splice(i, 1);
  }
  
  activeBodies.forEach(body => {
    let bTrail = body.userData.trail;
    if (!bTrail) return;
    for (let i = bTrail.length - 1; i >= 0; i--) {
      let t = bTrail[i];
      t.life -= 0.02;
      if (t.life <= 0) bTrail.splice(i, 1);
    }
    bTrail.push({ x: body.position.x, y: body.position.y, life: 1.0 });
    if (Math.random() < 0.4) {
      particles.push({
        x: body.position.x + (Math.random() - 0.5) * 40,
        y: body.position.y + (Math.random() - 0.5) * 40,
        vx: 0, vy: 0,
        life: 1.0, decay: 0.02,
        color: '#FFFFFF',
        size: Math.random() * 4 + 2
      });
    }
  });
}

function drawStarShape(ctx, x, y, radius, color) {
  const points = 5;
  ctx.beginPath();
  ctx.fillStyle = color;
  for (let i = 0; i < points * 2; i++) {
    const r = (i % 2 === 0) ? radius : radius / 2.2;
    const a = (i * Math.PI) / points - Math.PI / 2;
    if (i === 0) ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a));
    else ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
  }
  ctx.closePath();
  ctx.fill();
}

export function draw(ctx, w, h, isFirstTap) {
  ctx.clearRect(0, 0, w, h);

  if (isFirstTap) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(t('tapScreen'), w/2, h/2);
  }

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  activeBodies.forEach(body => {
    let bTrail = body.userData.trail;
    if (bTrail && bTrail.length > 1) {
      for (let i = 1; i < bTrail.length; i++) {
        ctx.beginPath();
        ctx.moveTo(bTrail[i-1].x, bTrail[i-1].y);
        ctx.lineTo(bTrail[i].x, bTrail[i].y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${bTrail[i].life * 0.6})`;
        ctx.lineWidth = 4 + bTrail[i].life * 8;
        ctx.stroke();
      }
    }
  });

  for (let p of particles) {
    ctx.globalAlpha = Math.max(0, p.life);
    if (p.type === 'ripple') {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 4;
      ctx.stroke();
    } else if (p.type === 'powaparticle') {
      ctx.save();
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.beginPath();
      if (p.shape === 'circle') {
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      } else if (p.shape === 'square') {
          ctx.rect(-p.size/2, -p.size/2, p.size, p.size);
      } else if (p.shape === 'star') {
          const points = 5;
          const inset = 0.5;
          ctx.moveTo(0, 0 - p.size);
          for (let i = 0; i < points; i++) {
              ctx.rotate(Math.PI / points);
              ctx.lineTo(0, 0 - (p.size * inset));
              ctx.rotate(Math.PI / points);
              ctx.lineTo(0, 0 - p.size);
          }
      }
      ctx.fill();
      ctx.restore();
    } else {
      drawStarShape(ctx, p.x, p.y, p.size, p.color);
    }
  }
  ctx.globalAlpha = 1.0;

  activeBodies.forEach(body => {
    const { color, radius } = body.userData;
    const { x, y } = body.position;
    const angle = body.angle;
    
    ctx.save();
    ctx.translate(x, y);
    
    const shapeType = body.userData.type;
    
    let drawAngle = angle;
    if (shapeType === 'triangle' || shapeType === 'star') {
      drawAngle += Math.PI / 2;
    }
    ctx.rotate(drawAngle);
    
    ctx.shadowColor = body.userData.color;
    ctx.shadowBlur = 20;
    
    const imgCanvas = images[shapeType];
    
    if (imgCanvas && imgCanvas.width > 0) {
      const imgRatio = imgCanvas.width / imgCanvas.height;
      
      let scaleMult = 3.5;
      if (shapeType === 'triangle' || shapeType === 'square') {
        scaleMult = 5.2; // Increase size to visually match star and circle
      }
      
      const drawHeight = radius * scaleMult; 
      const drawWidth = drawHeight * imgRatio;
      ctx.drawImage(imgCanvas, -drawWidth/2, -drawHeight/2, drawWidth, drawHeight);
    } else {
      drawStarShape(ctx, 0, 0, radius, color);
    }
    
    ctx.shadowBlur = 0;
    ctx.restore();
  });
}
