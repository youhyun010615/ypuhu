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

document.addEventListener('DOMContentLoaded', function () {
  const subText = document.querySelector('.sub_text2');
  const contIcons = document.querySelectorAll('.cont_icons li');

  subText.style.opacity = '0';

  contIcons.forEach(function (icon) {
    icon.style.opacity = '0';
  });

  let delay = 1000;

  setTimeout(function () {
    subText.style.transition = 'opacity 0.5s ease';
    subText.style.opacity = '1';
  }, 500);

  setTimeout(function () {
    contIcons.forEach(function (icon) {
      setTimeout(function () {
        icon.style.transition = 'opacity 0.5s ease';
        icon.style.opacity = '1';
      }, delay);
      delay += 600;
    });
  }, 500);
});
