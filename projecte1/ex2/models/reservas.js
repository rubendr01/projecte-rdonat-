const Reserva = require("./reserva");
const Sala = require("./sala");
require("colors");

class Reservas {
  _lista = {
    abc: 123,
  };
  sala;

  get listadoArr() {
    const listado = [];
    Object.keys(this._lista).forEach((key) => {
      const reserva = this._lista[key];
      listado.push(reserva);
    });

    return listado;
  }

  constructor() {
    this._lista = {};
    this.sala = new Sala();
  }

  cargarReservasFromArray(reservas = []) {
    for (let i = 0; i < reservas.length; i++) {
      this.sala.salaArr[reservas[i].fila][reservas[i].columna];
    }
  }

  mostrarSala() {
    console.log();

    let fila;
    console.log("   " + "|||PANTALLA|||".bgWhite.black);
    for (let i = 0; i < 6; i++) {
      fila = "";
      for (let j = 0; j < 10; j++) {
        if (this.sala.salaArr[i][j] == 0) {
          fila += "U ".green;
        } else if (this.sala.salaArr[i][j] == 1) {
          fila += "U ".red;
        }
      }
      console.log(fila);
    }
  }

  crearReserva(fila, columna) {
    const reserva = new Reserva(fila, columna);

    let x = 0;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.sala.salaArr[i][j] == 1) {
          x++;
        }
      }
    }

    if (x != 60) {
      if (fila >= 1 && fila <= 6 && columna >= 1 && columna <= 10) {
        if (this.sala.salaArr[fila - 1][columna - 1] == 0) {
          this.sala.salaArr[fila - 1][columna - 1] = 1;
          this.sala.ocupa++;
          this._lista[reserva.id] = reserva;
        } else {
          console.log("ERROR: Fila ocupada".red);
        }
      } else {
        console.log("ERROR: Fila/Columna no encontrada".red);
      }
    } else {
      console.log("ERROR: Sala llena".red);
    }
  }

  mostraReca() {
    let total = this.sala.ocupa * 5.5;
    console.log(`La recaudación total de la sala és: ${(total + "").green}€`);
  }

  eliminaReserva(fila, columna) {
    let x = 0;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.sala.salaArr[i][j] == 1) {
          x++;
        }
      }
    }
    if (x > 0) {
      if (fila >= 1 && fila <= 6 && columna >= 1 && columna <= 10) {
        if (this.sala.salaArr[fila - 1][columna - 1] == 1) {
          this.sala.salaArr[fila - 1][columna - 1] = 0;
          this.sala.ocupa--;
          console.log("Reserva eliminada!".green);
        } else {
          console.log("La posición seleccionada está libre".red);
        }
      } else {
        console.log("ERROR: Fila/Columna no encontrada".red);
      }
    } else {
      console.log("Sala vacía".red);
    }
  }
}

module.exports = Reservas;
