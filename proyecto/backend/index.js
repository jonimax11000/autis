import express from 'express';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { OpenProjectRepository } from './repository/openProjectRepository.js';
import { ConectionBBDD } from './conexiones/conectionBBDD.js';
import { ConectionAPI } from './conexiones/conectionAPI.js';


// Inicialització d'Express
const app = express();
const PORT = 3000;

// Configuració de __dirname en mòduls ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Càrrega de middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'frontend' folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Route to serve the HTML page
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'index.html'));
});


app.post('/enviar-matricula', async (_, res) => {
    try {

        const repository = new OpenProjectRepository(new ConectionBBDD());

        repository.getProjects();

        repository.cambiar(new ConectionAPI());
        repository.getProjects();

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});



// Escoltem el servidor
app.listen(PORT, () => {
    console.log(`Servidor escoltant a http://localhost:${PORT}`);
});

