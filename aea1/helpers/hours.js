const fs = require("fs");
require("colors");

const crearAlumne = (nom = "noName", hores = 0) => {
  console.log(" ==================== ".bgWhite.black);
  console.log(` Alumne creat: ${nom}  `.bgWhite.black);
  console.log(" ==================== ".bgWhite.black);

  let sortida = `Nom: ${nom} \nHores: ${hores}`;

  fs.writeFile(`alumne_${nom}.txt`, sortida, (err) => {
    if (err) throw err;
    console.log("Fitxer guardat!");
  });
};

module.exports = {
  crearAlumne,
};
