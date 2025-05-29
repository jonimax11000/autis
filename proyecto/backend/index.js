import express from 'express';
import path from 'path';
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
/* app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'jonathan.html'));
}); */


app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html', 'tocken.html'));
});






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

        //console.log(json);
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
        const json = await repository.getUsuariosByProyecto(body.proyecto);

        console.log(json);
        res.json(json);
        

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/usuarios/filtrar/id', async (req, res) => {
    try {
        let body = req.body;
        repository.cambiar(new ConectionBBDD());
        const id = parseInt(body.id, 10);
        console.log(id + 3);
        const json = await repository.getUsuariosByID(id + 3);

        console.log(json);
        res.json(json);

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/usuarios/filtrar/nombre', async (req, res) => {
    try {
        let body = req.body;
        repository.cambiar(new ConectionBBDD());
        const json = await repository.getUsuariosByName(body.nombre);

        console.log(json);
        res.json(json);

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/usuario/mod', async (req, res) => {
    try {
        const body = req.body;
        repository.cambiar(new ConectionAPI(tocken));
        const json = await repository.modificarUsuario(body);
        res.json({ success: json.ok });

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/usuario/mod/datos', async (req, res) => {
    try {
        const body = req.body;
        repository.cambiar(new ConectionBBDD());
        const id = parseInt(body.id, 10);
        const json = await repository.getUsuarioModificar(id);
        res.json(json);
    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/usuario/crear', async (req, res) => {
    try {
        const body = req.body;
        repository.cambiar(new ConectionAPI(tocken));
        repository.crearUsuario(body);
        res.json({ success: true });
    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/usuario/borrar', async (req, res) => {
    try {
        console.log('Borrar usuario');
        const body = req.body;
        repository.cambiar(new ConectionAPI(tocken));
        const id = parseInt(body.id, 10);
        const response = await repository.deleteUsuario(id);
        console.log('Respuesta de borrar usuario:', response);
        res.json({ success: response.ok });

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

/* 
* Endpoint para validar el token de la API externa (OpenProject)
* Recibe un token, intenta obtener los proyectos y responde si es válido o no
*/
app.post('/tocken', async (req, res) => {
    tocken = req.body.tocken;

    // Cambia la conexión del repositorio global al nuevo token recibido
    // Así, las siguientes operaciones usarán este token
    repository.cambiar(new ConectionAPI(tocken));
    try {
        const response = await repository.getProjects();

        // Comprueba que la respuesta tenga la estructura esperada de OpenProject

        // Si la respuesta es válida, el token es correcto
        if (response.ok) {
            res.json({ valido: true });
        } else {
            res.json({ valido: false });
        }
    } catch (err) {
        // Otros errores
        console.log('Error al obtener proyectos (token inválido):', err);
        res.json({ valido: false });
    }
});

// Escoltem el servidor
app.listen(PORT, () => {
    console.log(`Servidor escoltant a http://localhost:${PORT}`);
});

