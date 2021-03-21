/*jshint esversion: 9 */

/* --- --- -- - ELEMENTOS DE JUEGO  - -- --- --- */
const spanLevel = document.querySelector('#currentLevel');
const spanScore = document.querySelector('#score');
const selectdifficulty = document.querySelector('#level-Difficulty')
let LAST_LEVEL;

/* --- --- -- - DECLRACION DE COLORES  - -- --- --- */
const blue = document.getElementById("blue");
const rose = document.getElementById("rose");
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");

/* --- --- -- - DEFINICION DEL BOTON DE PLAY  - -- --- --- */
const btnEmpezar = document.getElementById("btnEmpezar");

class Game {
  constructor() {
    /* --- --- -- - INICIALIZANDO VARIABLES  - -- --- --- */
    spanLevel.innerHTML = 0;
    spanScore.innerHTML = 0;
    this.initialize = this.initialize.bind(this);
    this.initialize();
    this.ChangeDifficulty(); 
    this.generateSequence(); // ARRAY CON VALORES A ILUMINAR
    setTimeout(this.nextLevel, 500); // EMPEZAR A JUGAR
  }

  initialize() {
    this.chooseColor = this.chooseColor.bind(this);
    this.nextLevel = this.nextLevel.bind(this);

    //DEFINICION DE LOS VALORES INICIALES DEL JUEGO
    this.level = 1;
    this.score = 0;
    spanLevel.innerHTML = this.level;

    //OBJETO PARA MANIPULAR LOS COLORES DEL TABLERO
    this.colors = {
      blue,
      rose,
      yellow,
      green,
    };
  }

  // DIFICULTAD DE LA PARTIDA
  ChangeDifficulty() {
    switch (selectdifficulty.value) {
      case "Easy":
        LAST_LEVEL = 5;
        break;
      case "Normal":
        LAST_LEVEL = 10;
        break;
      case "Hard":
        LAST_LEVEL = 20;
        break;

      default:
        break;
    }
  }

  // GENERAR ARREGLO DE VALORES
  generateSequence() {
    this.sequence = new Array(LAST_LEVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }

  // SE ASIGNA UN NOMBRE DE COLOR A CADA NÚMERO
  numberToColor(num) {
    switch (num) {
      case 0:
        return "blue";
      case 1:
        return "rose";
      case 2:
        return "yellow";
      case 3:
        return "green";
    }
  }

  // SE ASIGNA UN VALOR NUMÉRICO A LOS NOMBRES DE CADA COLOR
  colorToNumber(color) {
    switch (color) {
      case "blue":
        return 0;
      case "rose":
        return 1;
      case "yellow":
        return 2;
      case "green":
        return 3;
    }
  }
  
  // ELIMINA LA CLASE DE COLORES ILUMINADOS EN CSS
  turnOffColor(color) {
    this.colors[color].classList.remove("light");
  }

  // AGREGA LA CLASE DE COLORES ILUMINADOS EN CSS
  illuminateColor(color) {
    this.colors[color].classList.add("light");
    setTimeout(() => this.turnOffColor(color), 350);
  }
  
  // ILUMINAR COLORES DEL TABLERO DE JUEGO
  illuminateSequence() {
    for (let i = 0; i < this.level; i++) {
      /* SE GUARDA EN LA VARIABLE COLOR EL NOMBRE DEL COLOR 
      CORRESPONDIENTE AL NUMERO DE SECUENCIA */
      const color = this.numberToColor(this.sequence[i]);
      setTimeout(() => this.illuminateColor(color), 1000 * i);
    }
  }

  // AVANZAR AL SIGUIENTE NIVEL
  nextLevel() {
    this.levelUp = 0;
    this.illuminateSequence();
    this.addEventsClick();
  }

  // SE AGREGAN LOS EVENTOS DE CLICK PARA CADA COLOR
  addEventsClick() {
    this.colors.blue.addEventListener("click", this.chooseColor);
    this.colors.rose.addEventListener("click", this.chooseColor);
    this.colors.yellow.addEventListener("click", this.chooseColor);
    this.colors.green.addEventListener("click", this.chooseColor);
  }

  // SE ELIMINAN LOS EVENTOS DE CLICK PARA CADA COLOR
  removeEventsClick() {
    this.colors.blue.removeEventListener("click", this.chooseColor);
    this.colors.rose.removeEventListener("click", this.chooseColor);
    this.colors.yellow.removeEventListener("click", this.chooseColor);
    this.colors.green.removeEventListener("click", this.chooseColor);
  }

  chooseColor(ev) {
    /* SE GUARDA EN UNA VARIABLE EL NOMBRE DEL COLOR CLICKEADO, 
    POR MEDIO DEL VALOR DEL DATA-SET DEFINIDO EN EL HTML */
    const nameColor = ev.target.dataset.color;

    /* SE OBTIENE EL VALOR NUMERICO QUE CORRESPONDE AL COLOR SELECCIONADO */
    const numberColor = this.colorToNumber(nameColor);

    /* SE ILUMINA EL COLOR CLICKEADO */
    this.illuminateColor(nameColor);

    // VERIFICA QUE EL COLOR CLICKEADO SEA IGUAL AL DE LA SECUENCIA
    if (numberColor === this.sequence[this.levelUp]) {
      this.levelUp++;

      // PASAR AL SIGUIENTE NIVEL
      if (this.levelUp === this.level) {
        this.level++;
        this.removeEventsClick();

        // VERIFICA SI EL NIVEL ACTUAL ES EL ULTIMO NIVEL
        if (this.level === LAST_LEVEL + 1) {
          //GANO
          this.score += 100;
          spanScore.innerHTML = this.score;
          this.winner();
        } else {
          this.score += 100;
          spanScore.innerHTML = this.score;
          this.showLevel();
        }
      }
    } else {
      //GAME OVER
      this.gameOver();
    }
  }

  // SE MUESTRA EN EL HEADER EL NIVEL ACTUAL Y SE PASA AL SIGUIENTE 
  showLevel() {
    spanLevel.innerHTML = this.level;
    setTimeout(this.nextLevel, 1600);
  }

  winner() {
    // SE MUESTRA LA VENTANA EMERGENTE PARA EL GANADOR
    Swal.fire({
      icon: 'success',
      title: 'YOU WIN!',
      timer: 10000,
      confirmButtonText: `<i class="fas fa-gamepad"></i> GREAT!`,
      timerProgressBar: true,
      text: `You're great, congrats`,
      footer: `SCORE: ${this.score} PTS`
    }).then(() => {
      this.initialize();
    });
    spanScore.innerHTML = 0;
  }

  gameOver() {
    Swal.fire({
      icon: 'error',
      title: 'GAME OVER!',
      timer: 10000,
      confirmButtonText: `<i class="fas fa-gamepad"></i> PLAY AGAIN!`,
      timerProgressBar: true,
      text: `Oops, try again! :(`,
      footer: `SCORE: ${this.score} PTS`
    }).then(() => {
      this.removeEventsClick();
      this.initialize();
    });
    this.level = 0
  }

}

function play() {
  window.game = new Game();
}
