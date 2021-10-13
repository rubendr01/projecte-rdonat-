const { readDB, guardarDB } = require("./helpers/guardarFitxer");
const {
  inquirerMenu,
  newTarea,
  pausa,
  tareaSelect,
  confirmar,
  tareaSelectCB,
} = require("./helpers/inquirers");
const Tareas = require("./models/tareas");

require("colors");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = readDB();

  if (tareasDB) {
    // si hi ha dades, carrégales
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      //Crear tarea
      case "1":
        const tarea1 = await newTarea("Nombre de la tarea: ");
        console.log(tarea1);
        tareas.crearTarea(tarea1, 0);
        break;

      //Listar tarea
      case "2":
        tareas.listarTareas();
        break;

      //Listar tareas completadas
      case "3":
        tareas.listarTareasCompletadas();
        break;

      //Listar tareas pendientes
      case "4":
        tareas.listarTareasPendientes();
        break;

      //Completar tareas
      case "5":
        const ids = await tareaSelectCB(tareas.llistatArr);

        if (ids !== "0") {
          //console.log("PRUEBA");
          //console.log(ids);
          tareas.toggleCompletadas(ids);
        }
        break;

      //Borrar tareas
      case "6":
        const id2 = await tareaSelect(tareas.llistatArr);

        //Eliminar de la base de dades
        if (id2 !== "0") {
          const ok = await confirmar("Vols eliminar?");
          if (ok) {
            tareas.eliminarTarea(id2);
            console.log("Tarea eliminada".green);
          } else {
            console.log("Tarea NO eliminada".red);
          }
        }
        break;

      //Salir
      default:
        break;
    }
    guardarDB(tareas.llistatArr);

    await pausa();
  } while (opt != 0);
};

main();
