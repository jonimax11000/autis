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
            const estado = await repository.usuarioActivo(aux.id);
            usuario.activo = estado;

            json.usuarios.push(usuario);
        }

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
        
        const json = await repository.getTimeEntriesPorDia(fecha,usuario);

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
        const json = await repository.getUsuariosByID(id + 3);

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
        res.json(json);

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/proyectos/filtrar/id', async (req, res) => {
    try {
        let body = req.body;
        repository.cambiar(new ConectionBBDD());
        const id = parseInt(body.id, 10);
        const json = await repository.getProyectosByID(id);

        res.json(json);

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/proyectos/filtrar/nombre', async (req, res) => {
    try {
        let body = req.body;
        repository.cambiar(new ConectionBBDD());
        const json = await repository.getProyectosByName(body.nombre);

        res.json(json);

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/tareas/filtrar/id', async (req, res) => {
    try {
        let body = req.body;
        repository.cambiar(new ConectionBBDD());
        const id = parseInt(body.id, 10);
        const json = await repository.getTareasByID(id);

        res.json(json);

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/tareas/filtrar/nombre', async (req, res) => {
    try {
        let body = req.body;
        repository.cambiar(new ConectionBBDD());
        const json = await repository.getTareasByName(body.nombre);

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
        const body = req.body;
        repository.cambiar(new ConectionAPI(tocken));
        const id = parseInt(body.id, 10);
        const response = await repository.deleteUsuario(id);
        res.json({ success: response.ok });

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/proyecto/borrar', async (req, res) => {
    try {
        const body = req.body;
        repository.cambiar(new ConectionAPI(tocken));
        const id = parseInt(body.id, 10);
        const response = await repository.deleteProyecto(id);
        res.json({ success: response.ok });

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/tarea/borrar', async (req, res) => {
    try {
        const body = req.body;
        repository.cambiar(new ConectionAPI(tocken));
        const id = parseInt(body.id, 10);
        const response = await repository.deleteTarea(id);
        res.json({ success: response.ok });

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});


app.post('/historial', async (req, res) => {
    try {
        const body = req.body;
        repository.cambiar(new ConectionBBDD());
        const json = {timeEntries:[]};
        const entries = await repository.getTimeEntriesPorUsuario(body.id);
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

app.post('/groups', async (req, res) => {
    try {
        repository.cambiar(new ConectionBBDD());
        const json = await repository.getGroups();
        res.json(json);
    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});


app.post('/group/users', async (req, res) => {
    try {
        const body = req.body;
        repository.cambiar(new ConectionBBDD());
        const usuarios = await repository.getUsuariosPorGrupo(body.id);
        const json = {cantidad: usuarios.length,
            empleados: usuarios.map(usuario => ({
                id: usuario.id,
                nombre: usuario.nombre,
            }))
        };
        res.json(json);
    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/group/projects', async (req, res) => {
    try {
        const body = req.body;
        repository.cambiar(new ConectionBBDD());
        const proyectos = await repository.getProyectosPorUsuario(body.id);
        const json = {cantidad: proyectos.length,
            proyactos: proyectos.map(proyecto => ({
                id: proyecto.id,
                nombre: proyecto.nombre,
            }))
        };
        res.json(json);
    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/horas/miembro', async (req, res) => {
    try {
        const body = req.body;
        repository.cambiar(new ConectionBBDD());
        const json = await repository.getHorasPorUsuarioYFecha(body.idUser,body.idGrupo,body.fecha1,body.fecha2);
        
        res.json(json);

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

app.post('/horas/miembros', async (req, res) => {
    try {
        const body = req.body;
        repository.cambiar(new ConectionBBDD());
        const data = await repository.getUsuariosPorGrupo(body.idGrupo);
        
        const json = { horas: 0 };
        
        for(let i = 0; i< data.length;i++){
            repository.cambiar(new ConectionBBDD());
            const data2 = await repository.getHorasPorUsuarioYFecha(data[i].id,body.idGrupo,body.fecha1,body.fecha2);
            json.horas+=data2.horas;
        }

        res.json(json);

    } catch (error) {
        console.error("Error en el endpoint:", error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

app.post('/horas/miembros/proyecto', async (req, res) => {
    try {
        const body = req.body;
        repository.cambiar(new ConectionBBDD());
        const json = await repository.getHorasPorUsuarioProyectoYFecha(body.idUser,body.idGrupo,body.idProyecto,body.fecha1,body.fecha2);
        
        res.json(json);

    } catch (error) {
        console.error("Error entrant:", error);
        res.status(500).send('Error entrant');
    }
});

// Escoltem el servidor
app.listen(PORT, () => {
    console.log(`Servidor escoltant a http://localhost:${PORT}`);
});

