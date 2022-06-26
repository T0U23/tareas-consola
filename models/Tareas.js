const Tarea = require("./Tarea");
const colores = require("colors");
class Tareas {
  _listado = {};

  constructor(desc) {
    this._listado = {};
  }

  get listadoArray() {
    let listado = [];

    Object.keys(this._listado).forEach((key) => {
      listado.push(this._listado[key]);
    });

    return listado;
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  getTareasDB(datosDB = []) {
    datosDB.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });

    console.log(this._listado);
  }

  listadoCompleto() {
    let contador = 1;
    let estado = "";

    console.log();
    this.listadoArray.forEach((tarea) => {
      if (tarea.finalizadoEn !== null) {
        estado = colores.green("COMPLETADA");
      } else {
        estado = colores.red("PENDIENTE");
      }
      console.log(`${colores.green(contador)}. ${tarea.desc} :: ${estado}`);
      contador++;
    });
    console.log();
  }

  listadoPendienteCompletas(completadas = true) {
    let contador = 1;
    const estado = completadas
      ? colores.green("COMPLETADA")
      : colores.red("PENDIENTE");

    console.log();
    this.listadoArray.forEach((tarea) => {
      if (completadas) {
        if (tarea.finalizadoEn) {
          console.log(
            `${colores.green(contador)}. ${tarea.desc} :: ${tarea.finalizadoEn}`
          );
          contador++;
        }
      } else {
        if (!tarea.finalizadoEn) {
          console.log(`${colores.green(contador)}. ${tarea.desc} :: ${estado}`);
          contador++;
        }
      }
    });
    console.log();
  }

  toggleCompletadas(ids = []) {
    this.listadoArray.forEach(tarea => {
      if (ids.includes(tarea.id)) {
        if (tarea.finalizadoEn === null) {
          tarea.finalizadoEn = new Date().toISOString();
        }
      } else {
        tarea.finalizadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
