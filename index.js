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
app.get('/pedidos/eliminar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    pedidos = pedidos.filter(p => p.id !== id);
    res.json({ mensaje: `Pedido ${id} eliminado` });
});

// RUTA PRINCIPAL CON BOTÓN (HTML LIMPIO)
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Panel de Control PyME</title>
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                height: 100vh; 
                margin: 0; 
                background-color: #f0f2f5; 
            }
            .card { 
                text-align: center; 
                padding: 50px; 
                background: white; 
                border-radius: 15px; 
                box-shadow: 0 10px 25px rgba(0,0,0,0.1); 
                max-width: 450px; 
            }
            h1 { color: #1c1e21; margin-bottom: 10px; }
            p { color: #606770; margin-bottom: 30px; line-height: 1.5; }
            .btn { 
                background-color: #007bff; 
                color: white; 
                padding: 15px 30px; 
                text-decoration: none; 
                border-radius: 8px; 
                font-weight: bold; 
                font-size: 1.1rem; 
                transition: background 0.3s, transform 0.2s;
                display: inline-block;
            }
            .btn:hover { 
                background-color: #0056b3; 
                transform: translateY(-2px);
            }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>Sistema PyME Activo</h1>
            <p>El backend de gestión de pedidos está corriendo correctamente en el puerto 5000.</p>
            <a href="/pedidos" class="btn">Ver Listado de Pedidos (JSON)</a>
        </div>
    </body>
    </html>
    `);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});