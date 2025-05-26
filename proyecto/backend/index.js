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


//Variables globales
const repository = new OpenProjectRepository(new ConectionBBDD());
let tocken = '';

// Càrrega de middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'frontend' folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Route to serve the HTML page
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'index.html'));
});

/*
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'tocken.html'));
});*/






app.post('/dashboard', async (req, res) => {
    try {
        const json = {
            "tocken": tocken,
            "proyecto": req.body.proyecto,
            "usuario": req.body.usuario,
            "tareas": req.body.tareas,
        };
        

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/dashboard/recarga', async (req, res) => {
    try {

        

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/usuarios', async (req, res) => {
    try {
        repository.cambiar(new ConectionBBDD());
        
        const json = await repository.getUsuarios();

        console.log(json);
        res.json(json);

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/usuarios/filtrar/proyecto', async (req, res) => {
    try {
        let body = req.body;
        repository.cambiar(new ConectionBBDD());
        repository.getUsuariosByProyecto(body.proyecto)
            .then((json) => {
                console.log(json);
                res.json(json);
            })
            .catch((error) => {
                console.error("Error al obtener usuarios por proyecto:", error);
                res.status(500).send('Error al obtener usuarios por proyecto');
            });
        

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/usuarios/filtrar/id', async (req, res) => {
    try {
        let body = req.body;
        repository.cambiar(new ConectionBBDD());
        repository.getUsuariosByID(body.id)
            .then((json) => {
                console.log(json);
                res.json(json);
            })
            .catch((error) => {
                console.error("Error al obtener usuario por ID:", error);
                res.status(500).send('Error al obtener usuario por ID');
            });

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/usuarios/filtrar/nombre', async (req, res) => {
    try {
        let body = req.body;
        repository.cambiar(new ConectionBBDD());
        repository.getUsuariosByName(body.nombre)
            .then((json) => {
                console.log(json);
                res.json(json);
            })
            .catch((error) => {
                console.error("Error al obtener usuario por nombre:", error);
                res.status(500).send('Error al obtener usuario por nombre');
            });

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/usuario/mod', async (req, res) => {
    try {
        
        

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/usuario/crear', async (req, res) => {
    try {

        

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/usuario/borrar', async (req, res) => {
    try {

        

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/usuario/tareas', async (req, res) => {
    try {
        

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/tocken', async (req, res) => {
    try {
        tocken = req.body.tocken;
        repository.cambiar(new ConectionAPI(tocken));

        repository.getProjects();

    } catch (error) {
        console.error("Error en el Tocken:", error);
        res.status(500).send('Error en el Tocken');
    }
});



// Escoltem el servidor
app.listen(PORT, () => {
    console.log(`Servidor escoltant a http://localhost:${PORT}`);
});

