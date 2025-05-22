import express from 'express';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { Client } from 'pg';


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
        /*fetch('http://localhost:8080/api/v3/projects', {
            headers: {
            'Authorization': 'Basic ' + btoa('apikey:9b8992b395a58440d18778eb4a2d19d17d91dfef4ea0f0a7c6984806c1573554')
            }
            })
            .then(response => response.json())
            .then(data => {
            // procesar los datos de proyectos
            console.log(data);
        });*/

        // Configura la connexió a la base de dades de OpenProject (ajusta els valors segons el teu docker-compose)

        // Consulta la taula projects
        // Obtenim els primers 5 projectes
        // La taula es diu "projects"
        const client = new Client({
            host: 'localhost', // o el nom del servei docker, ex: 'db'
            port: 5555,
            user: 'postgres', // usuari per defecte OpenProject
            password: 'postgres', // contrasenya per defecte OpenProject
            database: 'openproject' // nom de la base de dades
        });

        await client.connect();

        // Exemple de consulta: obtenir els primers 5 usuaris
        const result = await client.query('SELECT * FROM users LIMIT 5;');
        console.log(result.rows);

        await client.end();

        res.json(result.rows);

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});



// Escoltem el servidor
app.listen(PORT, () => {
    console.log(`Servidor escoltant a http://localhost:${PORT}`);
});

