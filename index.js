import express from 'express';
import { PORT } from './config.js';         // Importa la constante PORT desde el archivo de configuración
import indexRoutes from './routes/index.routes.js';  // Importa las rutas del índice
import taskRoutes from './routes/tasks.routes.js';    // Importa las rutas de las tareas
import cors from 'cors';

const app = express();

// Configuración de CORS para permitir solicitudes desde http://localhost:5173
app.use(cors({ origin: 'http://localhost:5173' }));

// Middleware para manejar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Configuración de las rutas
app.use(indexRoutes);
app.use(taskRoutes);

// Configuración del servidor para escuchar en el puerto especificado
app.listen(PORT);

// Imprime en la consola un mensaje indicando que el servidor está en ejecución
console.log(`Server is running on port ${PORT}`);
