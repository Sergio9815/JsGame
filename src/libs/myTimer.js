/* --- --- -- TIME FORMAT -- --- --- */
//             00:00:00
//              00:00

const FORMAT_ONE = '00:00:00'
const FORMAT_TWO = '00:00'
const SECONDS = 60;
const MINUTES = 60;
const HOURS = 24;

export default class Timer {
  constructor(config) {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.time = 0;
    this.id = config.idContainer; // HTML CONTAINER ID 
    this.format = config.timerFormat;
    this.formatFull = false
    this.interval;
  }

  // RETURNS LAST SAVED TIME
  getCurrentTime () {
    return document.getElementById(this.id).textContent;
  }

  // ADD A ZERO TO NUMBERS LESS THAN 10
  addZero (number) {
    if (number < 10) {
      return `0${number}`;
    }
    else {
      return number;
    }
  }

  // RETURN THE DATA IN THE INDICATED FORMAT
  applyFormat (h, m, s) {
    if (this.format === FORMAT_ONE) {
      this.formatFull = true
      return this.addZero(h) +':'+ this.addZero(m) +':'+ this.addZero(s)
    }
    else if (this.format === FORMAT_TWO) {
      return this.addZero(m) +':'+ this.addZero(s)
    }
  }

  getTime () {
    this.seconds++;
    if (this.seconds === SECONDS) {
      this.minutes++;
      this.seconds = 0;
      if (this.minutes === MINUTES) {
        this.hours++;
        this.minutes = 0;
        this.seconds = 0;
        if (this.hours === HOURS) {
          this.hours = 0;
          this.minutes = 0;
          this.seconds = 0;
        }
      }
    }
    return this.applyFormat(this.hours, this.minutes, this.seconds)
  }

  // METHOD THAT START THE TIMER
  start () {
    this.interval = setInterval(() => {
      // GET THE VALUES IN THE DEFINED FORMAT
      this.time = this.getTime();
      // PRINT THE TIMER ON THE HTML CONTAINER
      document.getElementById(this.id).innerHTML = this.time; 
    }, 1000); //UPDATE EVERY SECOND
  }

  // METHOD THAT PAUSE THE TIMER 
  pause () {
    clearInterval(this.interval);
  }

  // METHOD THAT RESETS THE TIMER VALUES AND STOPS ITS EXECUTION
  stop () {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.time = 0;
    clearInterval(this.interval);

    if (this.formatFull) {
      document.getElementById(this.id).innerHTML = FORMAT_ONE;
    } 
    else {
      document.getElementById(this.id).innerHTML = FORMAT_TWO;
    }
  }

}
