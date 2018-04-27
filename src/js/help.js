const helpLink = document.querySelector('.header__help');
const helpMenu = document.querySelector('.help');
const helpClose = document.querySelector('.help__close');

function closeHelp() {
  helpMenu.classList.add('help__hide');
  helpLink.style.pointerEvents = '';
}

helpLink.addEventListener('click', function(){
  helpMenu.classList.remove('help__hide');
  this.style.pointerEvents = 'none';
});

helpClose.addEventListener('click', function(){
  closeHelp()
});

document.addEventListener('keyup', function(e) {
  if(e.keyCode === 27) {
    closeHelp()
  }
});






