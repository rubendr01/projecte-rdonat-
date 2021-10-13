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
        name: `${"1".green} Nueva reserva`,
      },
      {
        value: "2",
        name: `${"2".green} Mostrar sala`,
      },
      {
        value: "3",
        name: `${"3".green} Mostrar recaudación`,
      },
      {
        value: "4",
        name: `${"4".green} Eliminiar reserva`,
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

const newReservaFila = async (msg) => {
  const quest = [
    {
      type: "input",
      name: "fila",
      message: msg,
      validate(value) {
        if (value.length === 0) {
          return "Por favor, introduce una fila válida";
        }
        return true;
      },
    },
  ];
  const { fila } = await inquirer.prompt(quest);
  return fila;
};

const newReservaColumna = async (msg) => {
  const quest = [
    {
      type: "input",
      name: "columna",
      message: msg,
      validate(value) {
        if (value.length === 0) {
          return "Por favor, introduce una columna válida";
        }
        return true;
      },
    },
  ];
  const { columna } = await inquirer.prompt(quest);
  return columna;
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
  newReservaFila,
  newReservaColumna,
  confirmar,
};
