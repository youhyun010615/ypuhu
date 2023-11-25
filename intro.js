//index.html의 javascript

/* 텍스트 빛나는 효과 */
document.addEventListener('DOMContentLoaded', function () {
  var tit = document.getElementById('tit');

  tit.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
  tit.style.transition = 'text-shadow 0.5s ease';

  tit.addEventListener('click', function () {
    tit.style.textShadow = '0 0 20px rgba(255, 255, 255, 1)';
  });
});

/* background-video */
const video = document.getElementById('background-video');
video.play();
video.addEventListener('ended', () => {
  video.currentTime = 0;
  video.play();
});

/* music button */
var musicOn = true; // Default is music on

function toggleMusicOn() {
  var musicOnButton = document.getElementById('musicOn_BT');
  var musicOffButton = document.getElementById('musicOff_BT');

  // Update the button states
  musicOnButton.style.display = 'none';
  musicOffButton.style.display = 'block';

  // Add logic to play music
  console.log('Music ON');
}

function toggleMusicOff() {
  var musicOnButton = document.getElementById('musicOn_BT');
  var musicOffButton = document.getElementById('musicOff_BT');

  // Update the button states
  musicOnButton.style.display = 'block';
  musicOffButton.style.display = 'none';

  // Add logic to stop music
  console.log('Music OFF');
}
