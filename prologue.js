var video = document.querySelector('#prologue_video video');
video.addEventListener('mouseover', function () {
  this.controls = true;
});

// Show video controls on mouseout
video.addEventListener('mouseout', function () {
  this.controls = false;
});
