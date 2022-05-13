const fs = require("fs");

//class
class Contenedor {
  constructor(nombreArchivo) {
    this.fileName = nombreArchivo;
  }
  //metodos
  //escribir
  async writeFile(data) {
    try {
      const contenido = await fs.promises.writeFile(this.fileName, data);
      console.log("Creado!");
      return contenido;
    } catch (error) {
      console.log("No se pudo guardar el archivo", error);
    }
  }
  //leer todo
  async getAll() {
    try {
      const archivo = await fs.promises.readFile(this.fileName, "utf-8");
      const contenido = JSON.parse(archivo);
      console.log("Obtenido!");
      // console.log(contenido);
      return contenido;
    } catch (error) {
      ("No se pudo leer el archivo!");
    }
  }
  //guardar
  async save(data) {
    try {
      let contenido = await this.getAll();
      // console.log(contenido);
      if (contenido === undefined) {
        // console.log("SOY UNDEFINEDDD!");
        contenido = [];
        const nuevoId = 1;
        const timestamp = new Date();
        // console.log("soy la data: " + data);
        let nuevoItem = { ...data, id: nuevoId, timestamp: timestamp };
        // console.log("soy el new item: " + nuevoItem);
        contenido.push(nuevoItem);
        let contenidoString = JSON.stringify(contenido);
        await this.writeFile(contenidoString);
        return nuevoId;
      } else {
        const ids = contenido.map((item) => item.id);
        const nuevoId = Math.max(...ids);
        const timestamp = new Date();
        let nuevoItem = { ...data, id: nuevoId + 1, timestamp: timestamp };
        contenido.push(nuevoItem);
        let contenidoString = JSON.stringify(contenido);
        await this.writeFile(contenidoString);
        return nuevoId;
      }
    } catch (error) {
      console.log(`No se pudo guardar el archivo ${error}`);
    }
  }
  //leer x id
  async getById(id) {
    try {
      const archivo = await fs.promises.readFile(this.fileName, "utf-8");
      const contenidoParse = JSON.parse(archivo);
      const item = contenidoParse.filter((prod) => prod.id === id);
      console.log("Obtenido x id!");
      // console.log(JSON.stringify(item));
      // console.log(contenidoParse[id]);
      return item;
    } catch (error) {
      ("No se pudo leer el archivo x id!");
    }
  }
  //borrar por ID
  async deleteById(id) {
    try {
      const archivo = await fs.promises.readFile(this.fileName, "utf-8");
      const contenidoParse = JSON.parse(archivo);
      const items = contenidoParse.filter((item) => item.id !== id);
      const contenidoNuevo = await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(items)
      );
      console.log("Borrado x id!");
      return contenidoNuevo;
    } catch (error) {
      ("No se pudo leer el archivo x id!");
    }
  }
  //borrar todo
  async deleteAll() {
    const items = [];
    await this.writeFile(items);
  }
  async getRandom(min, max) {
    const numRandom = await parseInt(Math.random() * (max - min) + min + 1);
    return numRandom;
  }
}

module.exports = Contenedor;
