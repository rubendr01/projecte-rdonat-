const Tarea = require("./tarea");

class Tareas {
  _lista = {
    abc: 123,
  };

  get llistatArr() {
    const listado = [];
    Object.keys(this._lista).forEach((key) => {
      const tarea = this._lista[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._lista = {};
  }

  crearTarea(nom = "", completada) {
    const tarea = new Tarea(nom, completada);
    this._lista[tarea.id] = tarea;
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._lista[tarea.id] = tarea;
    });
  }

  listarTareas() {
    console.log(); // sóc un salt de línia

    let conta = 0;
    this.llistatArr.forEach((tarea) => {
      const { nom, completada } = tarea;
      conta += 1;
      if (completada == 1) {
        console.log(
          `${(conta + ".").green} ${nom} - Completada?:  ${"Completada".green}`
        );
      } else if (completada == 0) {
        console.log(
          `${(conta + ".").green} ${nom} - Completada?:  ${"Pendiente".red}`
        );
      }
    });
  }

  listarTareasCompletadas() {
    console.log();
    let conta = 0;

    this.llistatArr.forEach((tarea) => {
      const { nom, completada } = tarea;

      const c = completada != 0 ? `${completada}`.green : `${completada}`.red;

      if (completada == 1) {
        conta += 1;
        console.log(
          `${(conta + ".").green} ${"Nom:".yellow} ${(nom + "").cyan} ${
            "::".green
          } ${"Completada:".yellow} ${c}`
        );
      }
    });
  }

  listarTareasPendientes() {
    console.log();
    let conta = 0;

    this.llistatArr.forEach((tarea) => {
      const { nom, completada } = tarea;

      const c = completada != 0 ? `${completada}`.green : `${completada}`.red;

      if (completada == 0) {
        conta += 1;
        console.log(
          `${(conta + ".").green} ${"Nom:".yellow} ${(nom + "").cyan} ${
            "::".green
          } ${"Completada:".yellow} ${c}`
        );
      }
    });
  }

  async eliminarTarea(id) {
    delete this._lista[id];
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._lista[id];

      if (tarea.completada == 0) {
        tarea.completada = 1;
        //return console.log(tarea.completada);
      } else {
        tarea.completada = 0;
      }
    });

    /*this.llistatArr.forEach((tarea) => {
      if (ids.includes(tarea.id)) {
        this._lista[tarea.id].completada = 0;
      }
    });*/
  }
}

module.exports = Tareas;
