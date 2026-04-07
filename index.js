const express = require('express');
const app = express();
const port = 5000;

// Middleware para entender JSON
app.use(express.json());

// Base de datos simulada en memoria
let pedidos = [
    { id: 1, cliente: "Tienda A", producto: "Laptop", cantidad: 5 },
    { id: 2, cliente: "Tienda B", producto: "Mouse", cantidad: 10 }
];

// R - Leer todos los pedidos (GET)
app.get('/pedidos', (req, res) => {
    res.json(pedidos);
});

// C - Crear un pedido (POST)
app.post('/pedidos', (req, res) => {
    const nuevoPedido = {
        id: pedidos.length + 1,
        ...req.body
    };
    pedidos.push(nuevoPedido);
    res.status(201).json(nuevoPedido);
});

// U - Actualizar un pedido (PUT)
app.put('/pedidos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = pedidos.findIndex(p => p.id === id);
    if (index !== -1) {
        pedidos[index] = { ...pedidos[index], ...req.body };
        res.json(pedidos[index]);
    } else {
        res.status(404).json({ error: "Pedido no encontrado" });
    }
});

// D - Eliminar un pedido (DELETE)
app.get('/pedidos/eliminar/:id', (req, res) => { // Usamos GET por facilidad de prueba en navegador
    const id = parseInt(req.params.id);
    pedidos = pedidos.filter(p => p.id !== id);
    res.json({ mensaje: `Pedido ${id} eliminado` });
});

app.get('/', (req, res) => {
    res.send('Sistema de Gestión PyME con Node.js - Activo');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});