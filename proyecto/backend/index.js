import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { OpenProjectRepository } from './repository/openProjectRepository.js';
import { ConectionBBDD } from './conexiones/conectionBBDD.js';
import { ConectionAPI } from './conexiones/conectionAPI.js';
import { rmSync } from 'fs';


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
        repository.cambiar(new ConectionBBDD());
        let json = {
            usuarios: []
        };
        let usuarios = await repository.getUsuarios2();

        for (const aux of usuarios) {
            const usuario = {
                id: aux.id,
                nombre: aux.nombre,
                activo: false,
            };

            repository.cambiar(new ConectionBBDD());
            usuario.activo = await repository.usuarioActivo(aux.id);

            json.usuarios.push(usuario);
        }

        console.log(json);
        res.json(json);

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/dashboard', async (req, res) => {
    try {
        repository.cambiar(new ConectionBBDD());
        let json = {
            usuarios: []
        };
        let usuarios = await repository.getUsuarios2();

        for (const aux of usuarios) {
            const usuario = {
                id: aux.id,
                nombre: aux.nombre,
                activo: false,
            };

            repository.cambiar(new ConectionBBDD());
            usuario.activo = await repository.usuarioActivo(aux.id);

            json.usuarios.push(usuario);
        }

        console.log(json);
        res.json(json);

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});


app.post('/timeEntries/dia', async (req, res) => {
    try {
        const body = req.body;
        var fecha = body.fecha;
        var usuario = body.id;
        repository.cambiar(new ConectionBBDD());
        
        const json = await repository.getTimeEntriesPorDia(fecha,id);

        res.json(json);

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/usuarios', async (req, res) => {
    try {
        repository.cambiar(new ConectionBBDD());
        
        const json = await repository.getUsuarios();

        res.json(json);

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/proyectos', async (req, res) => {
    try {
        repository.cambiar(new ConectionBBDD());
        
        const json = await repository.getProjects();

        //console.log(json);
        res.json(json);

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/tareas', async (req, res) => {
    try {
        repository.cambiar(new ConectionBBDD());
        
        const json = await repository.getTareas();

        //console.log(json);
        res.json(json);

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/tipoTareas', async (req, res) => {
    try {
        repository.cambiar(new ConectionBBDD());
        
        const json = await repository.getTipoTareas();

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
/* CONSULTAR DATOS */
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

app.post('/proyecto/mod', async (req, res) => {
    try {
        const body = req.body;
        repository.cambiar(new ConectionAPI(tocken));
        const json = await repository.modificarProyecto(body);
        res.json({ success: json.ok });

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/proyecto/mod/datos', async (req, res) => {
    try {
        const body = req.body;
        repository.cambiar(new ConectionBBDD());
        const id = parseInt(body.id, 10);
        const json = await repository.getProyectoModificar(id);
        res.json(json);
    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/tarea/mod', async (req, res) => {
    try {
        const body = req.body;
        repository.cambiar(new ConectionAPI(tocken));
        const json = await repository.modificarTarea(body);
        res.json({ success: json.ok });

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/tarea/mod/datos', async (req, res) => {
    try {
        const body = req.body;
        repository.cambiar(new ConectionBBDD());
        const id = parseInt(body.id, 10);
        const json = await repository.getTareaModificar(id);
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

app.post('/proyecto/crear', async (req, res) => {
    try {
        const body = req.body;
        repository.cambiar(new ConectionAPI(tocken));
        repository.crearProyecto(body);
        res.json({ success: true });
    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/tarea/crear', async (req, res) => {
    try {
        const body = req.body;
        repository.cambiar(new ConectionAPI(tocken));
        repository.crearTarea(body);
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

app.post('/proyecto/borrar', async (req, res) => {
    try {
        console.log('Borrar proyecto');
        const body = req.body;
        repository.cambiar(new ConectionAPI(tocken));
        const id = parseInt(body.id, 10);
        const response = await repository.deleteProyecto(id);
        console.log('Respuesta de borrar proyecto:', response);
        res.json({ success: response.ok });

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/tarea/borrar', async (req, res) => {
    try {
        console.log('Borrar tarea');
        const body = req.body;
        repository.cambiar(new ConectionAPI(tocken));
        const id = parseInt(body.id, 10);
        const response = await repository.deleteTarea(id);
        console.log('Respuesta de borrar tarea:', response);
        res.json({ success: response.ok });

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});


app.post('/historial', async (req, res) => {
    try {
        console.log("entro");
        const body = req.body;
        repository.cambiar(new ConectionBBDD());
        const json = {timeEntries:[]};
        const entries = await repository.getTimeEntriesPorUsuario(body.id);
        console.log(entries);
        json.timeEntries = entries;

        res.json(json);

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

