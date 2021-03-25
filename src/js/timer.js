import Timer from "./myTimer.js";

const play = document.querySelector('#btnEmpezar')

function goTimer() {
  var init = new Timer();
  init.start('timerJS');//USE HTML ELEMENT ID
}

play.addEventListener('click', (e) => {
  goTimer();
})