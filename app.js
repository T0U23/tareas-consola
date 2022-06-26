require("colors");

//const { mostrarMenu, pausa } = require("./helpers/mensajes");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer");
const Tarea = require("./models/Tarea");
const Tareas = require("./models/Tareas");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();
  if (tareasDB) {
    tareas.getTareasDB(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const desc = await leerInput("Descripcion: ");
        tareas.crearTarea(desc);
        break;
      case 2:
        tareas.listadoCompleto(tareas);
        break;
      case 3:
        tareas.listadoPendienteCompletas();
        break;
      case 4:
        tareas.listadoPendienteCompletas(false);
        break;
      case 5:
        const ids = await mostrarListadoChecklist(tareas.listadoArray);
        tareas.toggleCompletadas(ids);
        break;
      case 6:
        const id = await listadoTareasBorrar(tareas.listadoArray);
        if (id !== 0) {
          const ok = await confirmar("Deseas borrar?");
          if (ok) {
            tareas.borrarTarea(id);
          }
        }
        break;
      default:
        break;
    }
    guardarDB(tareas.listadoArray);
    await pausa();
  } while (opt !== 0);
};

main();
