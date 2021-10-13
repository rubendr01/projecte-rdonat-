const { guardarDB, readDB } = require("../ex2/helpers/guardarFitxer");
const {
  inquirerMenu,
  pausa,
  newReservaFila,
  newReservaColumna,
  confirmar,
} = require("./helpers/inquirer");
const Reservas = require("./models/reservas");

require("colors");

const main = async () => {
  let opt = "";
  const reservas = new Reservas();

  const reservasDb = readDB();

  if (reservasDb) {
    reservas.cargarReservasFromArray(reservas);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const fila = await newReservaFila("Numero de fila: ");
        const col = await newReservaColumna("Numero de columna: ");
        console.log(`Fila: ${(fila + " ").yellow}Columna: ${col.yellow}`);
        reservas.crearReserva(fila, col);
      case "2":
        //reservas.mostrarSala();
        break;
      case "3":
        reservas.mostraReca();
        break;
      case "4":
        const fila2 = await newReservaFila("Numero de fila: ");
        const col2 = await newReservaColumna("Numero de columna: ");

        const x = await confirmar("Quieres eliminar la reserva? ");
        if (x) {
          reservas.eliminaReserva(fila2, col2);
        } else {
          console.log("Reserva no eliminada".red);
        }
        break;
      default:
        break;
    }
    guardarDB(reservas.listadoArr);

    await pausa();
  } while (opt != "0");
};

main();
