const inquirer = require("inquirer");
require("colors");

const preguntes = [
  {
    type: "list",
    name: "opcio",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2".green} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3".green} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4".green} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5".green} Completar tareas`,
      },
      {
        value: "6",
        name: `${"6".green} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("==========================".cyan);
  console.log("   Selecciona una opción".yellow);
  console.log("==========================\n".cyan);

  const { opcio } = await inquirer.prompt(preguntes);

  return opcio; // retorno un valor entre 0 i 6
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presiona ${"enter".yellow} para continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

const newTarea = async (msg) => {
  const question = [
    {
      type: "input",
      name: "nom",
      message: msg,
      validate(value) {
        if (value.length === 0) {
          return "Por favor, introduce un nombre para la tarea";
        }
        return true;
      },
    },
  ];

  const { nom } = await inquirer.prompt(question);
  return nom;
};

const tareaSelect = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.nom}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0. ".green + "Cancel·lar",
  });

  const pregunta = [
    {
      type: "list",
      name: "id",
      message: "Selecciona tarea",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(pregunta);
  return id;
};

const tareaSelectCB = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.nom}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0. ".green + "Cancel·lar",
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "id",
      message: "Selecciona tarea",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(pregunta);
  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

module.exports = {
  inquirerMenu,
  pausa,
  newTarea,
  tareaSelect,
  confirmar,
  tareaSelectCB,
};
