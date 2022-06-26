const fs = require("fs");
const ruta = "./db/db.json";

const guardarDB = (data) => {
  fs.writeFileSync(ruta, JSON.stringify(data));
};

const leerDB = () => {
  if (!fs.existsSync(ruta)) {
    return null;
  }

  const data = JSON.parse(fs.readFileSync(ruta, { encoding: "utf-8" }));
  console.log(data);
  return data;
};

module.exports = {
  guardarDB,
  leerDB,
};
