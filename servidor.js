//init
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// import
const Contenedor = require("./archivos");
const Item = require("./item");

// router
const routerProductos = express.Router();
const routerCarrito = express.Router();
app.use("/api", routerProductos);
app.use("/api/carrito", routerCarrito);
routerProductos.use(express.json());
routerCarrito.use(express.json());

//creo archivo que contiene los productos
const listaProducto = new Contenedor("./productos.txt");
const listaCarrito = new Contenedor("./carritos.txt");

//rutas productos ---------------------------------------------------------------------------
//get productos
routerProductos.get("/productos/:id?", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    const productos = await listaProducto.getAll();
    res.send(JSON.stringify(productos));
  } else {
    const idNum = parseInt(id);
    const productoConsultado = await listaProducto.getById(idNum);
    res.send(productoConsultado);
  }
});
// post de producto
routerProductos.post("/api/productos", async (req, res) => {
  const item = req.body;
  const productoNuevo = await listaProducto.save(item);
  res.redirect("/api/productos");
});

// rutas carro ----------------------------------------------

// get carros
routerCarrito.get("/:id?", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    const carritos = await listaCarrito.getAll();
    res.send(JSON.stringify(carritos));
  } else {
    const idNum = parseInt(id);
    const carritoConsultado = await listaCarrito.getById(idNum);
    res.send(carritoConsultado);
  }
});

//post carro
routerCarrito.post("/", async (req, res) => {
  // const item = JSON.stringify(req.body);
  const item = req.body;
  await listaCarrito.save(item);
  const nombreCarro = item.nombre + ".txt";
  console.log(nombreCarro);
  const nuevoCarro = new Contenedor(nombreCarro);
  await nuevoCarro.writeFile("");
  res.redirect("/api/carrito");
  return nuevoCarro;
});

// prueba carrito POST
routerCarrito.post("/:id/productos", async (req, res) => {
  // id del carrito
  const id = parseInt(req.params.id);
  // id de producto obtenido del body
  const producto = req.body;
  // obtengo el carrito correspondiente
  const carrito = await listaCarrito.getById(id);
  // nombre del carrito
  const nombreCarrito = carrito[0].nombre + ".txt";
  // creo el carro si no existe
  const nuevoCarro = new Contenedor(nombreCarrito);
  await nuevoCarro.writeFile("");
  // obtengo el producto a agregar al carrito
  const addItem = await listaProducto.getById(producto.id);
  // guardo el producto en el carrito
  const carritoNuevo = await nuevoCarro.save(addItem);
  console.log(carritoNuevo);
  res.send("Producto agragdo al carrito!");
});

// server ---------------------------------------------------
const PORT = process.env.port || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
