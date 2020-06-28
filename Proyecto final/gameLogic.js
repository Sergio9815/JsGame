/*jshint esversion: 9 */

const spanLevel = document.querySelector('#currentLevel');
const spanScore = document.querySelector('#score');
spanLevel.innerHTML = 0;
spanScore.innerHTML = 0;
const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");
const ULTIMO_NIVEL = 10;

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel, 500);
  }

  inicializar() {
    this.elegirColor = this.elegirColor.bind(this);
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.toggleBtnEmpezar();
    this.nivel = 1;
    spanLevel.innerHTML = this.nivel;
    this.score = 0;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde,
    };
  }

  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains("hide")) {
      btnEmpezar.classList.remove("hide");
    } else {
      btnEmpezar.classList.add("hide");
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }

  siguienteNivel() {
    this.subNivel = 0;
    this.iluminarSecuencia();
    this.agregarEventosCLick();
  }

  transformarNumeroAColor(num) {
    switch (num) {
      case 0:
        return "celeste";
      case 1:
        return "violeta";
      case 2:
        return "naranja";
      case 3:
        return "verde";
    }
  }

  transformarColorANumero(color) {
    switch (color) {
      case "celeste":
        return 0;
      case "violeta":
        return 1;
      case "naranja":
        return 2;
      case "verde":
        return 3;
    }
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), 1000 * i);
    }
  }

  iluminarColor(color) {
    this.colores[color].classList.add("light");
    setTimeout(() => this.apagarColor(color), 350);
  }

  apagarColor(color) {
    this.colores[color].classList.remove("light");
  }

  agregarEventosCLick() {
    this.colores.celeste.addEventListener("click", this.elegirColor);
    this.colores.violeta.addEventListener("click", this.elegirColor);
    this.colores.naranja.addEventListener("click", this.elegirColor);
    this.colores.verde.addEventListener("click", this.elegirColor);
  }

  removerEventosClick() {
    this.colores.celeste.removeEventListener("click", this.elegirColor);
    this.colores.violeta.removeEventListener("click", this.elegirColor);
    this.colores.naranja.removeEventListener("click", this.elegirColor);
    this.colores.verde.removeEventListener("click", this.elegirColor);
  }

  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color;
    const numeroColor = this.transformarColorANumero(nombreColor);
    this.iluminarColor(nombreColor);
    if (numeroColor === this.secuencia[this.subNivel]) {
      this.subNivel++;
      if (this.subNivel === this.nivel) {
        this.nivel++;
        this.removerEventosClick();
        if (this.nivel === ULTIMO_NIVEL + 1) {
          //GANO
          this.score += 100;
          spanScore.innerHTML = this.score;
          this.ganador();
        } else {
          this.score += 100;
          spanScore.innerHTML = this.score;
          this.mostrarNivel();
        }
      }
    } else {
      //PERDIO
      this.perdedor();
    }
  }

  mostrarNivel() {
  /*swal("Congratulations", `Next level`, {
      buttons: false,
      timer: 1000,
    });*/
    spanLevel.innerHTML = this.nivel;
    setTimeout(this.siguienteNivel, 1600);
  }

  ganador() {
    swal(
      "Platzi Game",
      `Felicidades desafío completado!\n Puntuacion: ${this.score}`,
      "success"
    ).then(() => {
      this.inicializar();
    });
    spanScore.innerHTML = 0;
  }

  perdedor() {
    swal(
      "Platzi Game",
      `Fin del juego! :( \n Puntuacion: ${this.score}`,
      "error"
    ).then(() => {
      this.removerEventosClick();
      this.inicializar();
    });
    this.nivel = 0
  }
}

function empezarJuego() {
  window.juego = new Juego();
}
