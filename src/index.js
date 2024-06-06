// Express framework de NodeJS para construir servidores web de manera eficaz.
import express from "express";

// Se importan los datos que sirven de ayuda para configurar las funciones del servicio.
import config from "./libs/config.js";

import cors from 'cors';

// Importamos los endpoints de la API
import { router as authRoutes } from './routes/auth.routes.js';
import { router as financesRoutes } from './routes/finances.routes.js';

const app = express(); // En esta variable se guarda la aplicación express

app.use(express.json()); // Aceptamos recibir datos en JSON por HTTP (parser)

app.use(cors());

app.use('/public/profiles', express.static('public/profiles'))

// Se cargan los endpoints a la app.
app.use('/api/auth', authRoutes);
app.use('/api/finances', financesRoutes);

// Se pone a correr la app en puerto 3000.
app.listen(config.PORT , () => {
    console.log("SERVER RUNNING ON PORT" + " " + config.PORT);
})