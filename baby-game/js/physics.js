import { playSound } from './audio.js';
import { createParticles, createHitEffect } from './renderer.js';

const { Engine, World, Bodies, Body, Events } = window.Matter;

export const engine = Engine.create();
engine.world.gravity.y = 0;
engine.world.gravity.x = 0;

export let activeBodies = [];
let walls = [];
let targetSpeed = 0;

export function updateWalls(w, h) {
  if (walls.length > 0) World.remove(engine.world, walls);
  const thickness = 100;
  const opts = { isStatic: true, friction: 0, restitution: 1 };
  walls = [
    Bodies.rectangle(w/2, -thickness/2, w*2, thickness, opts),
    Bodies.rectangle(w/2, h + thickness/2, w*2, thickness, opts),
    Bodies.rectangle(-thickness/2, h/2, thickness, h*2, opts),
    Bodies.rectangle(w + thickness/2, h/2, thickness, h*2, opts)
  ];
  World.add(engine.world, walls);
  targetSpeed = Math.min(w, h) * 0.0015 + 1; // Gentler floating speed
}

Events.on(engine, 'beforeUpdate', () => {
  activeBodies.forEach(body => {
    const speed = Math.sqrt(body.velocity.x**2 + body.velocity.y**2);
    if (speed > 0 && Math.abs(speed - targetSpeed) > 0.1) {
      const scale = targetSpeed / speed;
      Body.setVelocity(body, {
        x: body.velocity.x * scale,
        y: body.velocity.y * scale
      });
    }
  });
});

Events.on(engine, 'collisionStart', (event) => {
  event.pairs.forEach(pair => {
    const isWall = walls.includes(pair.bodyA) || walls.includes(pair.bodyB);
    const isShapeA = activeBodies.includes(pair.bodyA);
    const isShapeB = activeBodies.includes(pair.bodyB);
    
    let shapeBody = null;
    if (isShapeA) shapeBody = pair.bodyA;
    if (isShapeB) shapeBody = pair.bodyB;
    
    if (isWall && shapeBody) {
      shapeBody.userData.bounceCount++;
      playSound('bounce');
      
      // 画面端を沿うように移動するのを防ぐため、画面中央付近へ向かってバウンドさせる
      const w = window.innerWidth;
      const h = window.innerHeight;
      const targetX = w * 0.25 + Math.random() * w * 0.5;
      const targetY = h * 0.25 + Math.random() * h * 0.5;
      const dirX = targetX - shapeBody.position.x;
      const dirY = targetY - shapeBody.position.y;
      const dist = Math.sqrt(dirX * dirX + dirY * dirY);
      
      if (dist > 0) {
        Body.setVelocity(shapeBody, {
          x: (dirX / dist) * targetSpeed,
          y: (dirY / dist) * targetSpeed
        });
      }

      if (shapeBody.userData.bounceCount >= 5) {
        popShape(shapeBody);
      }
    } else if (isShapeA && isShapeB) {
      // オブジェクト同士がぶつかった場合
      playSound('bounce');
      const hitX = (pair.bodyA.position.x + pair.bodyB.position.x) / 2;
      const hitY = (pair.bodyA.position.y + pair.bodyB.position.y) / 2;
      createHitEffect(hitX, hitY);
      
      // 完全ランダムな角度に反射させる
      const angleA = Math.random() * Math.PI * 2;
      const angleB = Math.random() * Math.PI * 2;
      Body.setVelocity(pair.bodyA, {
        x: Math.cos(angleA) * targetSpeed,
        y: Math.sin(angleA) * targetSpeed
      });
      Body.setVelocity(pair.bodyB, {
        x: Math.cos(angleB) * targetSpeed,
        y: Math.sin(angleB) * targetSpeed
      });
    }
  });
});

Events.on(engine, 'collisionActive', (event) => {
  event.pairs.forEach(pair => {
    const isWall = walls.includes(pair.bodyA) || walls.includes(pair.bodyB);
    let shapeBody = null;
    if (activeBodies.includes(pair.bodyA)) shapeBody = pair.bodyA;
    if (activeBodies.includes(pair.bodyB)) shapeBody = pair.bodyB;
    
    if (isWall && shapeBody) {
      // 念のため、壁に触れ続けている場合も中央へ向かう速度を設定する
      const w = window.innerWidth;
      const h = window.innerHeight;
      const targetX = w * 0.5;
      const targetY = h * 0.5;
      const dirX = targetX - shapeBody.position.x;
      const dirY = targetY - shapeBody.position.y;
      const dist = Math.sqrt(dirX * dirX + dirY * dirY);
      
      if (dist > 0) {
        Body.setVelocity(shapeBody, {
          x: (dirX / dist) * targetSpeed,
          y: (dirY / dist) * targetSpeed
        });
      }
    }
  });
});

export function popShape(body) {
  if (!body) return;
  createParticles(body.position.x, body.position.y, body.userData.color);
  World.remove(engine.world, body);
  activeBodies = activeBodies.filter(b => b !== body);
  playSound('pop');
}

// For backwards compatibility if needed, though we will remove calls to it
export function popCurrentShape() {
  if (activeBodies.length > 0) popShape(activeBodies[0]);
}

export function spawnShape(x, y, w, h) {
  if (activeBodies.length >= 10) {
    popShape(activeBodies[0]); // Remove oldest if too many
  }
  
  const size = Math.min(w, h) * 0.083;
  const baseRadius = size / 2;
  const shapesList = ['star', 'circle', 'triangle', 'square'];
  const type = shapesList[Math.floor(Math.random() * shapesList.length)];
  const color = `rgba(255, 210, 80, 1)`;
  
  const bodyOpts = { restitution: 1, friction: 0, frictionAir: 0 };
  let body;
  
  const hitboxScale = 0.75; // 当たり判定を見ためより少し小さくする
  
  if (type === 'square') {
    body = Bodies.rectangle(x, y, baseRadius * 5.2 * hitboxScale, baseRadius * 5.2 * hitboxScale, bodyOpts);
  } else if (type === 'triangle') {
    body = Bodies.polygon(x, y, 3, baseRadius * 3.46 * hitboxScale, bodyOpts);
  } else if (type === 'star') {
    body = Bodies.polygon(x, y, 5, baseRadius * 1.75 * hitboxScale, bodyOpts);
  } else {
    body = Bodies.circle(x, y, baseRadius * 1.75 * hitboxScale, bodyOpts);
  }
  
  // Initialize trail array inside userData
  body.userData = { type, color, radius: baseRadius, bounceCount: 0, trail: [] };
  
  const angle = Math.random() * Math.PI * 2;
  Body.setVelocity(body, { x: Math.cos(angle) * targetSpeed, y: Math.sin(angle) * targetSpeed });
  Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.015);
  
  activeBodies.push(body);
  World.add(engine.world, body);
  playSound('spawn');
}

export function handleObjectTap(x, y) {
  const { Query } = window.Matter;
  const bodies = Query.point(activeBodies, { x, y });
  if (bodies.length > 0) {
    const body = bodies[0];
    const sign = body.angularVelocity >= 0 ? 1 : -1;
    // ゆっくりくるくる回転させる (0.08 〜 0.1くらいが適度なゆっくりさ)
    Body.setAngularVelocity(body, sign * 0.1);
    
    // 回転したよという合図に音を鳴らすのも良い
    playSound('bounce');
    return true;
  }
  return false;
}
