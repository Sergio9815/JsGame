/* --- --- -- TIME FORMAT -- --- --- */
//             00:00:00
const SECONDS = 60;
const MINUTES = 60;
const HOURS = 24;

export default class Timer {
  constructor(element) {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.time = 0;
    this.id = element.idContainer;
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
    return this.addZero(this.hours) +':'+ this.addZero(this.minutes) +':'+ this.addZero(this.seconds) 
  }

  // METHOD THAT START THE TIMER
  start () {
    setInterval(() => {
      this.time = this.getTime();
      document.getElementById(this.id).innerHTML = this.time; 
    }, 1000); //UPDATE EVERY SECOND
  }

}
