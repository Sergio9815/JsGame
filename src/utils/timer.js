import Timer from "../libs/mytimer.min.js";

const play = document.querySelector('#btn-Start')

play.addEventListener('click', (e) => {
  const init = new Timer({
    idContainer: 'timerJS',  //USE HTML ELEMENT ID
    timerFormat: '00:00:00' 
  });

  init.start();
})