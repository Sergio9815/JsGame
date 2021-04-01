import Timer from "../node_modules/@sagb_24/mytimerjs/lib/myTimer.js";

const play = document.querySelector('#btn-Start')

play.addEventListener('click', (e) => {
  const init = new Timer({
    idContainer: 'timerJS',  //USE HTML ELEMENT ID
  });

  init.start();
})