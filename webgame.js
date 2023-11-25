const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const canvas_width = 2000;
const canvas_height = 1200;
let direction = 4;
let bgX = -canvas.width / 2;
let bgY = -canvas.height / 2;

const backgroundimg = new Image();
backgroundimg.src = 'images/background.png';
const playerimg = new Image();

//보는 방향에 따른 플레이어 이미지
function LoadplayerImage() {
  if (direction == 1) playerimg.src = 'images/playerUp.png';
  else if (direction == 2) playerimg.src = 'images/playerDown.png';
  else if (direction == 3) playerimg.src = 'images/playerLeft.png';
  else if (direction == 4) playerimg.src = 'images/playerRight.png';
}
const swordimg = new Image();

//보는 방향에 따른 검 이미지
function LoadswordImage() {
  if (direction == 1) swordimg.src = 'images/swordUp.png';
  else if (direction == 2) swordimg.src = 'images/swordDown.png';
  else if (direction == 3) swordimg.src = 'images/swordLeft.png';
  else if (direction == 4) swordimg.src = 'images/swordRight.png';
}

const enemyimg = new Image();
enemyimg.src = 'images/enemy.png';
const enemy2img = new Image();
enemy2img.src = 'images/enemy2.png';
const enemy3img = new Image();
enemy3img.src = 'images/enemy3.png';
const enemy4img = new Image();
enemy4img.src = 'images/enemy4.png';
const boss1img = new Image();
boss1img.src = 'images/boss1.png';
const boss2img = new Image();
boss2img.src = 'images/boss2.png';

const enemyAttackimg = new Image();
enemyAttackimg.src = 'images/enemyAttack.png';
const enemy2Attackimg = new Image();
enemy2Attackimg.src = 'images/enemy2Attack.png';

let gameRunning = true;
let score = 0;

const player = {
  x: canvas.width / 2 - 25,
  y: canvas.height / 2 - 25,
  width: 50,
  height: 50,
  hp: 100,
};

const sword = {
  x: player.x + 40,
  y: player.y + 13,
  width: 70,
  height: 30,
  damage: 10,
};

const playerSpeed = 4;

const weaponRadius = 80; // 무기의 회전 반경
const weaponAngleSpeed = 0.1; // 무기의 회전 속도
let weaponAngle = 0; // 무기의 현재 각도
let mvplayerX = canvas_width / 2 - player.width / 2; //2000x1200인 실제 맵크기에서 플레이어 위치
let mvplayerY = canvas_height / 2 - player.height / 2; //2000x1200인 실제 맵크기에서 플레이어 위치
let lr = false,
  ud = false;

function movePlayer() {
  if (keysPressed['ArrowUp']) {
    mvplayerY -= playerSpeed;
    if (
      mvplayerX >= -4 &&
      mvplayerX + player.width <= canvas_width + 4 &&
      mvplayerY >= canvas.height / 2 &&
      mvplayerY + player.height <= canvas_height - canvas.height / 2
    ) {
      bgY += playerSpeed;
      spawnY += playerSpeed;
      for (let enemy of enemies[0]) enemy.y += playerSpeed;
      for (let enemy of enemies[1]) enemy.y += playerSpeed;
      for (let enemy of enemies[2]) enemy.y += playerSpeed;
      for (let enemy of enemies[3]) enemy.y += playerSpeed;
      for (let enemy of enemies[4]) enemy.y += playerSpeed;
      for (let enemy of enemies[5]) enemy.y += playerSpeed;
      for (let enemy2atk of enemy2AttackArray) enemy2atk.y += playerSpeed;
    } else {
      player.y -= playerSpeed;
    }
    if (!keysPressed['x'] || (keysPressed['z'] && keysPressed['x']))
      direction = 1;
  }
  if (keysPressed['ArrowDown']) {
    mvplayerY += playerSpeed;
    if (
      mvplayerX >= -4 &&
      mvplayerX + player.width <= canvas_width + 4 &&
      mvplayerY >= canvas.height / 2 &&
      mvplayerY + player.height <= canvas_height - canvas.height / 2
    ) {
      bgY -= playerSpeed;
      spawnY -= playerSpeed;
      for (let enemy of enemies[0]) enemy.y -= playerSpeed;
      for (let enemy of enemies[1]) enemy.y -= playerSpeed;
      for (let enemy of enemies[2]) enemy.y -= playerSpeed;
      for (let enemy of enemies[3]) enemy.y -= playerSpeed;
      for (let enemy of enemies[4]) enemy.y -= playerSpeed;
      for (let enemy of enemies[5]) enemy.y -= playerSpeed;
      for (let enemy2atk of enemy2AttackArray) enemy2atk.y -= playerSpeed;
    } else {
      player.y += playerSpeed;
    }
    if (!keysPressed['x'] || (keysPressed['z'] && keysPressed['x']))
      direction = 2;
  }
  if (keysPressed['ArrowLeft']) {
    mvplayerX -= playerSpeed;
    if (
      mvplayerX >= canvas.width / 2 &&
      mvplayerX + player.width <= canvas_width - canvas.width / 2 &&
      mvplayerY >= -4 &&
      mvplayerY + player.height <= canvas_height + 4
    ) {
      bgX += playerSpeed;
      spawnX += playerSpeed;
      for (let enemy of enemies[0]) enemy.x += playerSpeed;
      for (let enemy of enemies[1]) enemy.x += playerSpeed;
      for (let enemy of enemies[2]) enemy.x += playerSpeed;
      for (let enemy of enemies[3]) enemy.x += playerSpeed;
      for (let enemy of enemies[4]) enemy.x += playerSpeed;
      for (let enemy of enemies[5]) enemy.x += playerSpeed;
      for (let enemy2atk of enemy2AttackArray) enemy2atk.x += playerSpeed;
    } else {
      player.x -= playerSpeed;
    }
    if (!keysPressed['x'] || (keysPressed['z'] && keysPressed['x']))
      direction = 3;
  }
  if (keysPressed['ArrowRight']) {
    mvplayerX += playerSpeed;
    if (
      mvplayerX >= canvas.width / 2 &&
      mvplayerX + player.width <= canvas_width - canvas.width / 2 &&
      mvplayerY >= -4 &&
      mvplayerY + player.height <= canvas_height + 4
    ) {
      bgX -= playerSpeed;
      spawnX -= playerSpeed;
      for (let enemy of enemies[0]) enemy.x -= playerSpeed;
      for (let enemy of enemies[1]) enemy.x -= playerSpeed;
      for (let enemy of enemies[2]) enemy.x -= playerSpeed;
      for (let enemy of enemies[3]) enemy.x -= playerSpeed;
      for (let enemy of enemies[4]) enemy.x -= playerSpeed;
      for (let enemy of enemies[5]) enemy.x -= playerSpeed;
      for (let enemy2atk of enemy2AttackArray) enemy2atk.x -= playerSpeed;
    } else {
      player.x += playerSpeed;
    }
    direction = 4;
  }

  //player가 움직이는 구간에서 background가 움직이는 구간으로 넘어갈 때 좌표가 +-4가 되는 문제가 있어서 만듦
  if (
    mvplayerX >= -4 &&
    mvplayerX + player.width <= canvas_width + 4 &&
    mvplayerY >= canvas.height / 2 &&
    mvplayerY + player.height <= canvas_height - canvas.height / 2
  ) {
    if (ud && mvplayerY < canvas_height / 2) player.y += 4;
    else if (ud && mvplayerY > canvas_height / 2) player.y -= 4;
    ud = false;
  } else {
    ud = true;
  }
  if (
    mvplayerX >= canvas.width / 2 &&
    mvplayerX + player.width <= canvas_width - canvas.width / 2 &&
    mvplayerY >= -4 &&
    mvplayerY + player.height <= canvas_height + 4
  ) {
    if (lr && mvplayerX < canvas_width / 2) player.x += 4;
    else if (lr && mvplayerX > canvas_width / 2) player.x -= 4;
    lr = false;
  } else {
    lr = true;
  }

  console.log(player.x);
  LoadswordImage();
  LoadplayerImage();

  // 캐릭터 밖으로 안나가게 설정
  mvplayerX = Math.max(
    25,
    Math.min(canvas_width - player.width - 25, mvplayerX)
  );
  mvplayerY = Math.max(
    25,
    Math.min(canvas_height - player.height - 25, mvplayerY)
  );
  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
}

let enemies = [[], [], [], [], [], []];
const enemySpeed = 1;
const enemy2Speed = 1;
const enemy3Speed = 1;
const enemy4Speed = 1;
const boss1Speed = 1;
const boss2Speed = 1;

let spawnX = 0;
let spawnY = 0;

function spawnEnemy() {
  const size = Math.random() * (50 - 20) + 20; // 적의 크기를 무작위로 설정
  let x, y;

  // 적이 어느 방향에서 나타날지 결정
  const side = Math.floor(Math.random() * 4); // 0: 위쪽, 1: 오른쪽, 2: 아래쪽, 3: 왼쪽

  switch (side) {
    case 0: // 위쪽
      x = Math.random() * (canvas.width + canvas_width / 4 - size) + spawnX;
      y = -canvas_height / 4 - size + spawnY;
      break;
    case 1: // 오른쪽
      x = -canvas_width / 4 + canvas_width + spawnX;
      y = Math.random() * (canvas.height + canvas_height / 4 - size) + spawnY;
      break;
    case 2: // 아래쪽
      x = Math.random() * (canvas.width + canvas_width / 4 - size) + spawnX;
      y = -canvas_height / 4 + canvas_height + spawnY;
      break;
    case 3: // 왼쪽
      x = -canvas_width / 4 - size + spawnX;
      y = Math.random() * (canvas.height + canvas_height / 4 - size) + spawnY;
      break;
  }
  if (score < 10) enemies[0].push({ x, y, width: size, height: size, hp: 10 });
  else if (score >= 10 && score < 20) {
    enemies[0] = [];
    enemies[1].push({ x, y, width: size, height: size, hp: 20 });
  } else if (score >= 20 && score < 30) {
    enemies[1] = [];
    enemy2AttackArray = [];
    attackInformation = [];
    enemies[2].push({ x, y, width: size, height: size, hp: 30 });
  } else if (score >= 30 && score < 40) {
    enemies[2] = [];
    enemies[3].push({ x, y, width: size, height: size, hp: 40 });
  }
}

let boss1spawn_status = false;
let boss2spawn_status = false;
let killBoss1 = false;

function spawnBoss() {
  const width = 100;
  const height = 80;
  let x = 1000;
  let y = 260;
  if (score >= 40 && !boss1spawn_status) {
    enemies[3] = [];
    enemies[4].push({ x, y, width: 200, height: 200, hp: 100 });
    boss1spawn_status = true;
  } else if (score >= 41 && !boss2spawn_status) {
    enemies[4] = [];
    enemies[5].push({ x, y, width: 400, height: 300, hp: 200 });
    boss2spawn_status = true;
  }
}
function drawEnemy() {
  if (score < 10) {
    for (const enemy of enemies[0]) {
      ctx.drawImage(enemyimg, enemy.x, enemy.y, enemy.width, enemy.height);
    }
  } else if (score >= 10 && score < 20) {
    for (const enemy of enemies[1]) {
      ctx.drawImage(enemy2img, enemy.x, enemy.y, enemy.width, enemy.height);
    }
  } else if (score >= 20 && score < 30) {
    for (const enemy of enemies[2]) {
      ctx.drawImage(enemy3img, enemy.x, enemy.y, enemy.width, enemy.height);
    }
  } else if (score >= 30 && score < 40) {
    for (const enemy of enemies[3]) {
      ctx.drawImage(enemy4img, enemy.x, enemy.y, enemy.width, enemy.height);
    }
  } else if (boss1spawn_status) {
    for (const enemy of enemies[4]) {
      ctx.drawImage(boss1img, enemy.x, enemy.y, enemy.width, enemy.height);
    }
  }
  for (const enemy of enemies[5]) {
    ctx.drawImage(boss2img, enemy.x, enemy.y, enemy.width, enemy.height);
  }
}

function moveEnemies() {
  if (score < 10) {
    for (const enemy of enemies[0]) {
      // 플레이어 위치와 적 위치 사이의 차이 계산
      const dx = player.x - enemy.x;
      const dy = player.y - (enemy.y + enemy.height / 2);

      // 차이를 이용하여 거리 계산
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 거리가 0이 아닐 경우에만 적을 이동시킴 (0으로 나누는 것을 방지)
      if (distance > 0) {
        const vx = (dx / distance) * enemySpeed;
        const vy = (dy / distance) * enemySpeed;

        // 적 위치 업데이트
        enemy.x += vx;
        enemy.y += vy;
      }
    }
  }
  if (score >= 10 && score < 20) {
    for (const enemy of enemies[1]) {
      // 플레이어 위치와 적 위치 사이의 차이 계산
      const dx = player.x - enemy.x;
      const dy = player.y - (enemy.y + enemy.height / 2);

      // 차이를 이용하여 거리 계산
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 거리가 0이 아닐 경우에만 적을 이동시킴 (0으로 나누는 것을 방지)
      if (distance > 0) {
        const vx = (dx / distance) * enemy2Speed;
        const vy = (dy / distance) * enemy2Speed;

        // 적 위치 업데이트
        enemy.x += vx;
        enemy.y += vy;
      }
    }
  }
  if (score >= 20 && score < 30) {
    for (const enemy of enemies[2]) {
      // 플레이어 위치와 적 위치 사이의 차이 계산
      const dx = player.x - enemy.x;
      const dy = player.y - (enemy.y + enemy.height / 2);

      // 차이를 이용하여 거리 계산
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 거리가 0이 아닐 경우에만 적을 이동시킴 (0으로 나누는 것을 방지)
      if (distance > 0) {
        const vx = (dx / distance) * enemy3Speed;
        const vy = (dy / distance) * enemy3Speed;

        // 적 위치 업데이트
        enemy.x += vx;
        enemy.y += vy;
      }
    }
  }
  if (score >= 30 && score < 40) {
    for (const enemy of enemies[3]) {
      // 플레이어 위치와 적 위치 사이의 차이 계산
      const dx = player.x - enemy.x;
      const dy = player.y - (enemy.y + enemy.height / 2);

      // 차이를 이용하여 거리 계산
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 거리가 0이 아닐 경우에만 적을 이동시킴 (0으로 나누는 것을 방지)
      if (distance > 0) {
        const vx = (dx / distance) * enemy4Speed;
        const vy = (dy / distance) * enemy4Speed;

        // 적 위치 업데이트
        enemy.x += vx;
        enemy.y += vy;
      }
    }
  }
  if (boss1spawn_status) {
    for (const enemy of enemies[4]) {
      // 플레이어 위치와 적 위치 사이의 차이 계산
      const dx = player.x - enemy.x;
      const dy = player.y - (enemy.y + enemy.height / 2);

      // 차이를 이용하여 거리 계산
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 거리가 0이 아닐 경우에만 적을 이동시킴 (0으로 나누는 것을 방지)
      if (distance > 0) {
        const vx = (dx / distance) * boss1Speed;
        const vy = (dy / distance) * boss1Speed;

        // 적 위치 업데이트
        enemy.x += vx;
        enemy.y += vy;
      }
    }
  }
  if (boss2spawn_status) {
    for (const enemy of enemies[5]) {
      // 플레이어 위치와 적 위치 사이의 차이 계산
      const dx = player.x - enemy.x;
      const dy = player.y - (enemy.y + enemy.height / 2);

      // 차이를 이용하여 거리 계산
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 거리가 0이 아닐 경우에만 적을 이동시킴 (0으로 나누는 것을 방지)
      if (distance > 0) {
        const vx = (dx / distance) * boss2Speed;
        const vy = (dy / distance) * boss2Speed;

        // 적 위치 업데이트
        enemy.x += vx;
        enemy.y += vy;
      }
    }
  }
}

let enemy2AttackArray = [];
let attackInformation = [];
let dx, dy, vx, vy, distance;

function enemy2Attack() {
  if (timer % 120 == 0) {
    for (const enemy of enemies[1]) {
      enemy2AttackArray.push({ x: enemy.x, y: enemy.y, width: 30, height: 30 });
      dx = player.x - enemy.x;
      dy = player.y - (enemy.y + 10);
      distance = Math.sqrt(dx * dx + dy * dy);
      attackInformation.push({ x: dx, y: dy, dt: distance });
    }
  }
  for (let i = 0; i <= attackInformation.length - 1; i++) {
    const enemy2atk = enemy2AttackArray[i];
    ctx.drawImage(
      enemy2Attackimg,
      enemy2atk.x,
      enemy2atk.y,
      enemy2atk.width,
      enemy2atk.height
    );
    vx = (attackInformation[i].x / attackInformation[i].dt) * 3;
    vy = (attackInformation[i].y / attackInformation[i].dt) * 3;
    enemy2atk.x += vx;
    enemy2atk.y += vy;

    if (
      !(
        0 < enemy2atk.x + enemy2atk.width &&
        canvas_width > enemy2atk.x &&
        0 < enemy2atk.y + enemy2atk.height &&
        canvas_height > enemy2atk.y
      )
    ) {
      enemy2AttackArray.splice(i, 1);
      attackInformation.splice(i, 1);
    }
  }
}

let swordAngle = (Math.PI / 180) * -70;
let swordAngle2 = 5;
const swordAngleSpeed = (Math.PI / 180) * 10;
const swordAngleSpeed2 = (Math.PI / 180) * 20;
let roundTrip = false;
let swordAngleInitialized = false;
let directionChanged = true;

function swordAttack() {
  // direction이 변경되었다면 초기화
  if (!swordAngleInitialized || directionChanged) {
    // direction에 따라 swordAngle 초기값 설정
    if (direction === 1) {
      swordAngle = (Math.PI / 180) * -70; // 방향이 위쪽일 때
    } else if (direction === 2) {
      swordAngle = (Math.PI / 180) * 110; // 방향이 아래쪽일 때
    } else if (direction === 3) {
      swordAngle = (Math.PI / 180) * 20; // 방향이 왼쪽일 때
    } else if (direction === 4) {
      swordAngle = (Math.PI / 180) * 200; // 방향이 오른쪽일 때
    }

    swordAngleInitialized = true; // 초기화 상태를 true로 변경
    directionChanged = false; // directionChanged 초기화
  }
  if (direction == 1 && keysPressed['z']) {
    if (swordAngle < (Math.PI / 180) * 340 && !roundTrip)
      swordAngle += swordAngleSpeed;
    else if (swordAngle > (Math.PI / 180) * 200 && roundTrip)
      swordAngle -= swordAngleSpeed;
    if (swordAngle >= (Math.PI / 180) * 340) roundTrip = true;
    else if (swordAngle <= (Math.PI / 180) * 200) roundTrip = false;

    ctx.save();
    ctx.translate(sword.x, sword.y + sword.height / 2);
    ctx.rotate(swordAngle - (Math.PI / 180) * 270);
    ctx.drawImage(
      swordimg,
      -sword.height / 2,
      -sword.width,
      sword.height,
      sword.width
    );
    ctx.restore();
  }

  if (direction == 2 && keysPressed['z']) {
    if (swordAngle < (Math.PI / 180) * 160 && !roundTrip)
      swordAngle += swordAngleSpeed;
    else if (swordAngle > (Math.PI / 180) * 20 && roundTrip)
      swordAngle -= swordAngleSpeed;
    if (swordAngle >= (Math.PI / 180) * 160) roundTrip = true;
    else if (swordAngle <= (Math.PI / 180) * 20) roundTrip = false;

    ctx.save();
    ctx.translate(sword.x - 30, sword.y + sword.height / 2);
    ctx.rotate(swordAngle - (Math.PI / 180) * 90);
    ctx.drawImage(swordimg, -sword.height / 2, 0, sword.height, sword.width);
    ctx.restore();
  }

  if (direction == 3 && keysPressed['z']) {
    if (swordAngle < (Math.PI / 180) * 250 && !roundTrip)
      swordAngle += swordAngleSpeed;
    else if (swordAngle > (Math.PI / 180) * 110 && roundTrip)
      swordAngle -= swordAngleSpeed;
    if (swordAngle >= (Math.PI / 180) * 250) roundTrip = true;
    else if (swordAngle <= (Math.PI / 180) * 110) roundTrip = false;

    ctx.save();
    ctx.translate(sword.x - 30, sword.y + sword.height / 2);
    ctx.rotate(swordAngle - (Math.PI / 180) * 180);
    ctx.drawImage(
      swordimg,
      -sword.width,
      -sword.height / 2,
      sword.width,
      sword.height
    );
    ctx.restore();
  }

  if (direction == 4 && keysPressed['z']) {
    if (swordAngle < (Math.PI / 180) * 70 && !roundTrip)
      swordAngle += swordAngleSpeed;
    else if (swordAngle > (Math.PI / 180) * -70 && roundTrip)
      swordAngle -= swordAngleSpeed;
    if (swordAngle >= (Math.PI / 180) * 70) roundTrip = true;
    else if (swordAngle <= (Math.PI / 180) * -70) roundTrip = false;

    ctx.save();
    ctx.translate(sword.x, sword.y + sword.height / 2);
    ctx.rotate(swordAngle);
    ctx.drawImage(swordimg, 0, -sword.height / 2, sword.width, sword.height);
    ctx.restore();
  }
}

function changeDirection(newDirection) {
  if (direction !== newDirection) {
    direction = newDirection;
    directionChanged = true;
  }
}

function swordAttack2() {
  if (keysPressed['x'] && !keysPressed['z']) {
    direction = 4;
    if (swordAngle2) swordAngle2 += swordAngleSpeed2;
    ctx.save();
    ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
    ctx.rotate(swordAngle2);
    ctx.drawImage(
      swordimg,
      -player.width / 2 + 40,
      -player.height / 2 + 20,
      sword.width,
      sword.height
    );
    ctx.drawImage(
      playerimg,
      -player.width / 2,
      -player.height / 2,
      player.width,
      player.height
    );
    ctx.restore();
  }
}

function checkCollisions() {
  //1단계 몹의 근접 공격
  for (const enemy of enemies[0]) {
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      ctx.drawImage(enemyAttackimg, player.x, player.y - 50, 50, 100);
      player.hp -= 0.25;
    }
  }
  //2단계 몸의 원거리 공격
  for (let i = 0; i <= enemy2AttackArray.length - 1; i++) {
    const enemy2atk = enemy2AttackArray[i];
    if (
      player.x < enemy2atk.x + enemy2atk.width &&
      player.x + player.width > enemy2atk.x &&
      player.y < enemy2atk.y + enemy2atk.height &&
      player.y + player.height > enemy2atk.y
    ) {
      player.hp -= 10;
      enemy2AttackArray.splice(i, 1);
      attackInformation.splice(i, 1);
    }
  }
  for (let a = 0; a <= 5; a++) {
    // 칼과 적의 충돌 검사
    for (let i = enemies[a].length - 1; i >= 0; i--) {
      const enemy = enemies[a][i];

      // 칼의 위치 계산
      const swordX = player.x + player.width / 2 + 75 * Math.cos(swordAngle);
      const swordY = player.y + player.height / 2 + 75 * Math.sin(swordAngle);

      //칼 히트박스
      if (
        (keysPressed['x'] &&
          ((player.x + player.width / 2 + 80 * Math.cos(swordAngle2) >
            enemy.x &&
            player.x + player.width / 2 + 80 * Math.cos(swordAngle2) <
              enemy.x + enemy.width &&
            player.y + player.height / 2 + 80 * Math.sin(swordAngle2) >
              enemy.y &&
            player.y + player.height / 2 + 80 * Math.sin(swordAngle2) <
              enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 70 * Math.cos(swordAngle2) >
              enemy.x &&
              player.x + player.width / 2 + 70 * Math.cos(swordAngle2) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 70 * Math.sin(swordAngle2) >
                enemy.y &&
              player.y + player.height / 2 + 70 * Math.sin(swordAngle2) <
                enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 60 * Math.cos(swordAngle2) >
              enemy.x &&
              player.x + player.width / 2 + 60 * Math.cos(swordAngle2) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 60 * Math.sin(swordAngle2) >
                enemy.y &&
              player.y + player.height / 2 + 60 * Math.sin(swordAngle2) <
                enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 50 * Math.cos(swordAngle2) >
              enemy.x &&
              player.x + player.width / 2 + 50 * Math.cos(swordAngle2) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 50 * Math.sin(swordAngle2) >
                enemy.y &&
              player.y + player.height / 2 + 50 * Math.sin(swordAngle2) <
                enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 40 * Math.cos(swordAngle2) >
              enemy.x &&
              player.x + player.width / 2 + 40 * Math.cos(swordAngle2) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 40 * Math.sin(swordAngle2) >
                enemy.y &&
              player.y + player.height / 2 + 40 * Math.sin(swordAngle2) <
                enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 30 * Math.cos(swordAngle2) >
              enemy.x &&
              player.x + player.width / 2 + 30 * Math.cos(swordAngle2) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 30 * Math.sin(swordAngle2) >
                enemy.y &&
              player.y + player.height / 2 + 30 * Math.sin(swordAngle2) <
                enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 20 * Math.cos(swordAngle2) >
              enemy.x &&
              player.x + player.width / 2 + 20 * Math.cos(swordAngle2) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 20 * Math.sin(swordAngle2) >
                enemy.y &&
              player.y + player.height / 2 + 20 * Math.sin(swordAngle2) <
                enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 10 * Math.cos(swordAngle2) >
              enemy.x &&
              player.x + player.width / 2 + 10 * Math.cos(swordAngle2) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 10 * Math.sin(swordAngle2) >
                enemy.y &&
              player.y + player.height / 2 + 10 * Math.sin(swordAngle2) <
                enemy.y + enemy.height))) ||
        (keysPressed['z'] &&
          ((player.x + player.width / 2 + 80 * Math.cos(swordAngle) > enemy.x &&
            player.x + player.width / 2 + 80 * Math.cos(swordAngle) <
              enemy.x + enemy.width &&
            player.y + player.height / 2 + 80 * Math.sin(swordAngle) >
              enemy.y &&
            player.y + player.height / 2 + 80 * Math.sin(swordAngle) <
              enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 70 * Math.cos(swordAngle) >
              enemy.x &&
              player.x + player.width / 2 + 70 * Math.cos(swordAngle) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 70 * Math.sin(swordAngle) >
                enemy.y &&
              player.y + player.height / 2 + 70 * Math.sin(swordAngle) <
                enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 60 * Math.cos(swordAngle) >
              enemy.x &&
              player.x + player.width / 2 + 60 * Math.cos(swordAngle) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 60 * Math.sin(swordAngle) >
                enemy.y &&
              player.y + player.height / 2 + 60 * Math.sin(swordAngle) <
                enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 50 * Math.cos(swordAngle) >
              enemy.x &&
              player.x + player.width / 2 + 50 * Math.cos(swordAngle) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 50 * Math.sin(swordAngle) >
                enemy.y &&
              player.y + player.height / 2 + 50 * Math.sin(swordAngle) <
                enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 40 * Math.cos(swordAngle) >
              enemy.x &&
              player.x + player.width / 2 + 40 * Math.cos(swordAngle) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 40 * Math.sin(swordAngle) >
                enemy.y &&
              player.y + player.height / 2 + 40 * Math.sin(swordAngle) <
                enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 30 * Math.cos(swordAngle) >
              enemy.x &&
              player.x + player.width / 2 + 30 * Math.cos(swordAngle) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 30 * Math.sin(swordAngle) >
                enemy.y &&
              player.y + player.height / 2 + 30 * Math.sin(swordAngle) <
                enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 20 * Math.cos(swordAngle) >
              enemy.x &&
              player.x + player.width / 2 + 20 * Math.cos(swordAngle) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 20 * Math.sin(swordAngle) >
                enemy.y &&
              player.y + player.height / 2 + 20 * Math.sin(swordAngle) <
                enemy.y + enemy.height) ||
            (player.x + player.width / 2 + 10 * Math.cos(swordAngle) >
              enemy.x &&
              player.x + player.width / 2 + 10 * Math.cos(swordAngle) <
                enemy.x + enemy.width &&
              player.y + player.height / 2 + 10 * Math.sin(swordAngle) >
                enemy.y &&
              player.y + player.height / 2 + 10 * Math.sin(swordAngle) <
                enemy.y + enemy.height)))
      ) {
        enemy.hp -= sword.damage;
      }
      if (enemy.hp <= 0) {
        enemies[a].splice(i, 1); // 충돌 시 적 제거
        score++;
      }
    }
  }
}

let timer = 0;

function gameLoop() {
  requestAnimationFrame(gameLoop);
  if (!gameRunning) {
    ctx.font = '48px serif';
    ctx.fillStyle = 'black';
    ctx.fillText('게임 오버', canvas.width / 2 - 100, canvas.height / 2);
    ctx.fillText(
      '점수: ' + score,
      canvas.width / 2 - 100,
      canvas.height / 2 + 60
    );
    if (keysPressed['r'] && gameRunning == false) {
      restartGame();
    }
  }

  if (player.hp <= 0) {
    gameRunning = false;
    return;
  }

  if (gameRunning) {
    timer++;

    ctx.clearRect(0, 0, canvas_width, canvas_height);

    ctx.drawImage(backgroundimg, bgX, bgY);

    if (timer % 60 == 0) {
      spawnEnemy();
    }
    enemy2Attack();
    spawnBoss();
    drawEnemy();
    moveEnemies();

    ctx.fillStyle = 'red';
    ctx.fillRect(20, 20, player.hp * 2, 30);
    if (!keysPressed['x'] || (keysPressed['z'] && keysPressed['x'])) {
      ctx.drawImage(playerimg, player.x, player.y, player.width, player.height);
      if (direction == 1 && !keysPressed['z'])
        ctx.drawImage(
          swordimg,
          sword.x - 13,
          sword.y - 60,
          sword.height,
          sword.width
        );
      else if (direction == 2 && !keysPressed['z'])
        ctx.drawImage(
          swordimg,
          sword.x - 45,
          sword.y + 24,
          sword.height,
          sword.width
        );
      else if (direction == 3 && !keysPressed['z'])
        ctx.drawImage(
          swordimg,
          sword.x - 97,
          sword.y,
          sword.width,
          sword.height
        );
      else if (direction == 4 && !keysPressed['z'])
        ctx.drawImage(swordimg, sword.x, sword.y, sword.width, sword.height);
    }
    if (keysPressed['z'] && keysPressed['x']) doubleAttack = true;
    else doubleAttack = false;
    checkCollisions();
    swordAttack();
    swordAttack2();
    movePlayer();
    sword.x = player.x + 40;
    sword.y = player.y + 13;

    //무기 그리기 부분을 주석 처리하거나 삭제합니다.
    weaponAngle += weaponAngleSpeed;
    /*const weaponX =
    player.x + player.width / 2 + weaponRadius * Math.cos(weaponAngle);
  const weaponY =
    player.y + player.height / 2 + weaponRadius * Math.sin(weaponAngle);

  ctx.beginPath();
  ctx.arc(weaponX, weaponY, 10, 0, Math.PI * 2); // 반지름이 10인 원
  ctx.fillStyle = "yellow";
  ctx.fill();
*/
  }
}

function restartGame() {
  score = 0;
  timer = 0;
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  player.hp = 100;
  enemies = [[], [], [], [], [], []];
  enemy2AttackArray = [];
  attackInformation = [];
  gameRunning = true;
}

let keysPressed = {};

function handleKeyDown(event) {
  keysPressed[event.key] = true;
}

function handleKeyUp(event) {
  keysPressed[event.key] = false;
}

// Add event listeners for keydown and keyup
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Event listeners
canvas.addEventListener('click', movePlayer);

// Start game loop
window.onload = function () {
  gameLoop();
};
