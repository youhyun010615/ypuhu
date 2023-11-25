const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#000000';
const CANVAS_SIZE = 350;

ctx.strokeStyle = '#2c2c2c';
ctx.fillStyle = 'white'; // 초기 배경색을 흰색으로 설정

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    if (!filling) {
      // 채우기 모드가 아닌 경우에만 선을 그림
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = 'Fill';
  } else {
    filling = true;
    mode.innerText = 'Paint';
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'faceImage';
  link.click();
}

function handleClearClick() {
  // 추가: 지우개 클릭 시 캔버스를 초기화
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
}

Array.from(colors).forEach((color) =>
  color.addEventListener('click', handleColorClick)
);

if (range) {
  range.addEventListener('input', handleRangeChange);
}

if (mode) {
  mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick);
}

const clearBtn = document.getElementById('jsClear'); // 추가: clear 버튼 요소 가져오기
if (clearBtn) {
  clearBtn.addEventListener('click', handleClearClick);
}

function drawFaceOutline() {
  ctx.beginPath();

  // 얼굴 부분 그리기 (원)
  const faceRadius = CANVAS_SIZE / 2 - 20; // 캔버스 중심으로부터 얼굴까지의 거리
  ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, faceRadius, 0, Math.PI * 2);

  // 눈 그리기 (원)
  const eyeRadius = 10;
  ctx.arc(
    CANVAS_SIZE / 2 - 60,
    CANVAS_SIZE / 2 - 40,
    eyeRadius,
    0,
    Math.PI * 2
  ); // 왼쪽 눈
  ctx.arc(
    CANVAS_SIZE / 2 + 60,
    CANVAS_SIZE / 2 - 40,
    eyeRadius,
    0,
    Math.PI * 2
  ); // 오른쪽 눈

  // 입술 그리기 (원)
  ctx.moveTo(CANVAS_SIZE / 2 - 80, CANVAS_SIZE / 2 + 40); // 입 시작점
  ctx.quadraticCurveTo(
    CANVAS_SIZE / 2,
    CANVAS_SIZE / 2 + 80,
    CANVAS_SIZE / 2 + 80,
    CANVAS_SIZE / 2 + 40
  ); // 입 중간점 및 끝점

  // 선 색상과 두께 설정
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.lineWidth = 2;

  // 윤곽선 그리기
  ctx.stroke();
}

// 밑도안 그리기 함수 호출
drawFaceOutline();
