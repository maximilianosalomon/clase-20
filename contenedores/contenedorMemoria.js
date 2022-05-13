class ContenedorMemoria {
  constructor() {
    this.items = [];
  }
  // metodos
  getAll() {
    return [...this.items];
  }

  getById(id) {
    const item = this.item.find((item) => item.id === id);
    if (item === undefined) {
      console.log(`Error: El id "${id}" no corresponde a un item existente`);
    } else {
      console.log(item);
    }
  }

  save(item) {
    const ids = this.items.map((item) => item.id);
    const maxId = Math.max(...ids);
    let newItem = {
      id: maxId + 1,
      title: item.title,
      price: item.price,
      thumbnail: item.thumbnail,
    };
    this.items = [...this.item, newItem];
  }

  deleteAll() {
    this.items = [];
  }
}

//put prod id
routerProductos.put("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = req.body;
  const producto = productos.find((producto) => producto.id === id);
  producto.title = item.title;
  console.log(producto);
  res.send("es un put!");
});

//delete de producto x id
routerProductos.delete("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  producto = productos.filter((producto) => producto.id != id);
  res.send(producto);
});
