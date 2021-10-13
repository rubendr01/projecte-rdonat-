const { crearAlumne } = require("./helpers/hours");

let nom = process.argv[2];
let hores = process.argv[3];

nom = nom.split("=")[1];
hores = hores.split("=")[1];

crearAlumne(nom, hores);
