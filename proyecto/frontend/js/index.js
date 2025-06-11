import './components/empleatsCard.js';
import './listas/projectsList.js';
import './listas/tareasList.js';
import './listas/DashboardList.js';
import './listas/historialList.js';
import './components/estadisticasCard.js';

// Remplazar la url
window.history.replaceState({}, '', '/');

document.addEventListener('DOMContentLoaded', async () => {
    const userMenu = document.getElementById('menu-empleados');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuLinks = document.querySelectorAll('.nav-menu a');
    const contentDiv = document.getElementById('content');

    // Evento para cerrar sesión
    const logoutLink = document.querySelector('.logout a');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('apiToken'); // Borra el token almacenado en el localStorage
            window.location.href = '/html/tocken.html'; // Redirige al loginPage
        });
    }

    // Cambiar el texto del topbar por el enlace pulsado y cargar contenido
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Limpia el contenido del contenedor principal
            contentDiv.innerHTML = '';

            // Cambia el texto de la barra central por el texto del enlace pulsado
            const txtCentral = document.querySelector('.txtcentral');
            if (txtCentral) {
                txtCentral.textContent = this.textContent;
            }
            if (this.textContent.trim() === 'Proyectos') {
                handlerProjects();                
            } 
            else if (this.textContent.trim() === 'Tareas') {
                /* const tareasList = document.createElement('tareas-list');
                contentDiv.appendChild(tareasList); */
                handlerTareas();
            } 
            else if (this.textContent.trim() === 'Estadísticas') {
                handleEstadisticas();
            // Lógica para cargar contenido específico según el enlace pulsado
            } 
            else if (this.id === 'menu-empleados') {
                handleUsers(e); // Llama a la función para cargar empleados
            } 
            else if (this.id === 'menu-dashboard') {
                handleDashboard();
            }
            else if (this.id === 'menu-historial') {
                handleHistorial();
            }

            else {
                // Si es otro enlace, puedes mostrar contenido vacío o cargar algo diferente
                const placeholder = document.createElement('p');
                placeholder.textContent = `Sección: ${this.textContent}`;
                contentDiv.appendChild(placeholder);
            }

            // Adaptación: solo un enlace activo en el menú lateral
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});


async function fetchTipoTareas() {
    const res = await fetch('/tipoTareas', { method: 'POST' });
    return await res.json(); // [{id: 1, name: "Bug"}, ...]
}

async function fetchProyectos() {
    const res = await fetch('/proyectos', { method: 'POST' });
    return await res.json(); // [{id: 1, name: "Proyecto A"}, ...]
}

/* HANDLER PARA ENTIDADES */
// PROYECTOS
async function handlerProjects(e) {
    if (e) {
        e.preventDefault();
    }
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = '';

    // Filtro y buscador
    const formDiv = document.createElement('div');
    formDiv.className = "formDiv";

    const searchInput = document.createElement('input');
    searchInput.className = "searchInput";
    searchInput.id = "buscador-proyecto";
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar...';

    const selectFilter = document.createElement('select');
    selectFilter.className = "selectFilter";
    selectFilter.id = "filtros-proyecto";
    const options = ['nombre', 'id'];
    
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        selectFilter.appendChild(opt);
    });

    const createButton = document.createElement('button');
    createButton.className = "createButton";
    createButton.textContent = 'Crear';
    
    createButton.addEventListener('click', async () => {
        const fieldsCrear = [
            ...proyectoFields,
        ];
        botonCrear('proyecto', fieldsCrear);
    });
    
    const plusIcon = document.createElement('span');
    plusIcon.textContent = '+ ';
    plusIcon.className = "plusIcon";
    createButton.prepend(plusIcon);

    formDiv.appendChild(searchInput);
    formDiv.appendChild(selectFilter);
    formDiv.appendChild(createButton);

    contentDiv.appendChild(formDiv);

    // Lista de proyectos
    const proyectosDiv = document.createElement("div");
    proyectosDiv.id = "proyectos";
    contentDiv.appendChild(proyectosDiv);
    
    // Carga inicial de proyectos
    const projectsList = document.createElement('projects-list');
    proyectosDiv.appendChild(projectsList);

    // Añadir el event listener después de crear el div
    searchInput.addEventListener('keypress', handleProjectsSearch);   
    
}

// TAREAS
async function handlerTareas(e) {
    if (e) {
        e.preventDefault();
    }

    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = '';

    // Filtro y buscador
    const formDiv = document.createElement('div');
    formDiv.className = "formDiv";

    const searchInput = document.createElement('input');
    searchInput.className = "searchInput";
    searchInput.id = "buscador-tarea";
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar...';

    const selectFilter = document.createElement('select');
    selectFilter.className = "selectFilter";
    selectFilter.id = "filtros-tarea";
    const options = ['nombre', 'id'];

    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        selectFilter.appendChild(opt);
    });

    const createButton = document.createElement('button');
    createButton.className = "createButton";
    createButton.textContent = 'Crear';
    
    createButton.addEventListener('click', async () => {
        const tipos = await fetchTipoTareas();
        const proyectos = await fetchProyectos();

        const fieldsCrear = [
            { label: 'Nombre de la tarea:', id: 'subject' },
            {
                label: 'Tipo:',
                id: 'type',
                type: 'select',
                options: tipos.map(t => ({ value: t.id, label: t.name })),
                endpoint: '/tipoTareas'
            },
            {
                label: 'Proyecto:',
                id: 'project',
                type: 'select',
                options: proyectos.map(p => ({ value: p.id, label: p.name })),
                endpoint: '/proyectos'
            }
        ];
        botonCrear('tarea', fieldsCrear);
    });

    const plusIcon = document.createElement('span');
    plusIcon.textContent = '+ ';
    plusIcon.className = "plusIcon";
    createButton.prepend(plusIcon);

    formDiv.appendChild(searchInput);
    formDiv.appendChild(selectFilter);
    formDiv.appendChild(createButton);
    
    contentDiv.appendChild(formDiv);

    // Lista de tareas
    const tareasDiv = document.createElement("div");
    tareasDiv.id = "tareas";
    contentDiv.appendChild(tareasDiv);
    
    // Carga inicial de tareas
    const tareasList = document.createElement('tareas-list');
    tareasDiv.appendChild(tareasList);

    // Añadir el event listener después de crear el div
    searchInput.addEventListener('keypress', handleTareasSearch);  
}

// USUARIOS
async function handleUsers(e) {
    if (e) {
        e.preventDefault();
    }

    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    const formDiv = document.createElement('div');
    formDiv.className = "formDiv";

    const searchInput = document.createElement('input');
    searchInput.className = "searchInput";
    searchInput.id = "buscador-usuario";
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar...';

    const selectFilter = document.createElement('select');
    selectFilter.className = "selectFilter";
    selectFilter.id = "filtros"
    const options = ['proyecto', 'usuario', 'id'];
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        selectFilter.appendChild(opt);
    });

    const createButton = document.createElement('button');
    createButton.className = "createButton";
    createButton.textContent = 'Crear';
    
    createButton.addEventListener('click', async () => {
        const fieldsCrear = [
            ...usuarioFields, //(spread operator) pa no dubplicar el array
            { label: 'Contraseña:', id: 'password', type: 'password' }
        ];

        botonCrear('usuario', fieldsCrear);
    });

    const plusIcon = document.createElement('span');
    plusIcon.textContent = '+ ';
    plusIcon.className = "plusIcon";

    createButton.prepend(plusIcon);

    formDiv.appendChild(searchInput);
    formDiv.appendChild(selectFilter);
    formDiv.appendChild(createButton);

    contentDiv.appendChild(formDiv);

    searchInput.addEventListener('keypress', handleSearch);

    try {
        const response = await fetch('/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const empleados = document.createElement("div");
        empleados.id = "empleados";
        const data = await response.json();
        data.forEach(item => {
            const empleat = document.createElement('empleat-card');
            empleat.setAttribute('empleats-id', item.id);
            empleat.setAttribute('empleats-nom', `${item.firstname} ${item.lastname}`); // Muestra nombre y apellido
            empleados.appendChild(empleat);
            contentDiv.appendChild(empleados);
        });

    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

async function handleSearch(event) {
    if (event.key === 'Enter') {

        event.preventDefault();
        const selectFilter = document.getElementById("filtros");
        const filterOption = selectFilter.value;

        try {
            let url = '/usuarios/filtrar/';
            const headers = {
                'Content-Type': 'application/json'
            };
            let body = {};

            if (filterOption === 'proyecto') {
                url += 'proyecto';
                body = { proyecto: document.getElementById('buscador-usuario').value };
            } else if (filterOption === 'id') {
                body = { id: document.getElementById('buscador-usuario').value };
                url += 'id';
            } else if (filterOption === 'usuario') {
                body = { nombre: document.getElementById('buscador-usuario').value };
                url += 'nombre';
            }
            const response = await fetch(`${url}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            const empleados = document.getElementById("empleados");
            empleados.innerHTML = '';
            data.forEach(item => {
                const empleat = document.createElement('empleat-card');
                empleat.setAttribute('empleats-id', item.id);
                empleat.setAttribute('empleats-nom', `${item.firstname} ${item.lastname}`);
                empleados.appendChild(empleat);
            });
        } catch (error) {
            console.error("Error fetching filtered user data:", error);
        }
    }
}

async function handleProjectsSearch(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const selectFilter = document.getElementById("filtros-proyecto");
        const filterOption = selectFilter.value;

        try {
            let url = '/proyectos/filtrar/';
            const headers = {
                'Content-Type': 'application/json'
            };
            let body = {};

            if (filterOption === 'nombre') {
                url += 'nombre';
                body = { nombre: document.getElementById('buscador-proyecto').value };
            } else if (filterOption === 'id') {
                url += 'id';
                body = { id: document.getElementById('buscador-proyecto').value };
            }
            
            const response = await fetch(`${url}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            const proyectosDiv = document.getElementById("proyectos");
            proyectosDiv.innerHTML = '';
            data.forEach(item => {
                const projectCard = document.createElement('project-card');
                projectCard.setAttribute('project-id', item.id);
                projectCard.setAttribute('project-name', item.name);
                proyectosDiv.appendChild(projectCard);
            });
        } catch (error) {
            console.error("Error fetching filtered project data:", error);
        }
    }
}

async function handleTareasSearch(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const selectFilter = document.getElementById("filtros-tarea");
        const filterOption = selectFilter.value;

        try {
            let url = '/tareas/filtrar/';
            const headers = {
                'Content-Type': 'application/json'
            };
            let body = {};

            if (filterOption === 'nombre') {
                url += 'nombre';
                body = { nombre: document.getElementById('buscador-tarea').value };
            } else if (filterOption === 'id') {
                url += 'id';
                body = { id: document.getElementById('buscador-tarea').value };
            }
            
            const response = await fetch(`${url}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            const tareasDiv = document.getElementById("tareas");
            tareasDiv.innerHTML = '';
            data.forEach(item => {
                const tareaCard = document.createElement('tarea-card');
                tareaCard.setAttribute('tarea-id', item.id);
                tareaCard.setAttribute('tarea-subject', item.subject);
                tareasDiv.appendChild(tareaCard);
            });
        } catch (error) {
            console.error("Error fetching filtered project data:", error);
        }
    }
}


/* DATOS EN FUNCIÓN DE LA ENTIDAD */

export const usuarioFields = [
    { label: 'Nombre de usuario:', id: 'login' },
    { label: 'Nombre:', id: 'firstName' },
    { label: 'Apellido:', id: 'lastName' },
    { label: 'Correo electrónico:', id: 'email', type: 'email' }
];

export const proyectoFields = [
    { label: 'Nombre del proyecto:', id: 'name' }
];

export const tareaFields = [
    { label: 'Nombre de la tarea:', id: 'subject' }
];

const endpointDatos = {
    usuario: '/usuario/mod/datos',
    proyecto: '/proyecto/mod/datos',
    tarea: '/tarea/mod/datos'
};

/* FORMULARIO BASE */

async function formularioEntidad(fields, idSeleccionado, entidad, endpointDatos) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    const userDetailsDiv = document.createElement('form');
    userDetailsDiv.className = "userDetailsDiv";

    let json = null;

    let lockVersion = null;
    
    if (idSeleccionado != null) {
        try {
            const response = await fetch(endpointDatos, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: idSeleccionado })
            });
    
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            json = await response.json();
            // Guarda lockVersion si es una tarea
            if (entidad === 'tarea' && json.lockVersion !== undefined) {
                lockVersion = json.lockVersion;
            }
        } catch (error) {
            console.error(`Error obteniendo datos de ${entidad}:`, error);
        }
    }    

    if (entidad === 'tarea' && lockVersion !== null) {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'lockVersion';
        hidden.value = lockVersion;
        userDetailsDiv.appendChild(hidden);
    }

    for (const field of fields) {
        const label = document.createElement('label');
        label.textContent = field.label;
        label.className = "label";

        let input;

        if (field.type === 'select') {
            input = document.createElement('select');
            input.id = field.id;

            // Usa las opciones del campo
            if (field.options) {
                field.options.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt.value;
                    option.textContent = opt.label;
                    input.appendChild(option);
                });
            }
            } else if (field.endpoint){
                // Carga las opciones dinámicamente
                try {
                    const response = await fetch(field.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
                    const data = await response.json();
                    data.forEach(item => {
                        const option = document.createElement('option');
                        option.value = item.id;
                        option.textContent = item.name;
                        input.appendChild(option);
                    });
                } catch (error) {
                    console.error(`Error cargando opciones para ${field.id}:`, error);
                }
            
            } else {
                input = document.createElement('input');
                input.id = field.id;
                if (field.type) input.type = field.type;
                if (idSeleccionado != null && json && json[field.id] !== undefined) {
                    input.value = json[field.id];
                }
                if (entidad === 'usuario') {
                    if (field.id === 'password') {
                        input.type = 'password';
                        input.minLength = 10;
                    } else if (field.id === 'email') {
                        input.type = 'email';
                        input.pattern = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]{1,}$";
                        input.title = "Introduce un correo válido, como usuario@dominio.com";
                    }
                }
            }
       
        input.className = "input";
        input.required = true;
        userDetailsDiv.appendChild(label);
        userDetailsDiv.appendChild(input);
    };

    contentDiv.appendChild(userDetailsDiv);
    return userDetailsDiv;
}

/* CREAR ENTIDAD */

const endpointCrear = {
    usuario: '/usuario/crear',
    proyecto: '/proyecto/crear',
    tarea: '/tarea/crear',
};

export async function botonCrear(entidad, fields) {
    const userDetailsDiv =  await formularioEntidad(fields, null, entidad, endpointDatos[entidad]);

    const createButton = document.createElement('input');
    createButton.type="submit";
    createButton.value = 'Crear';

    createButton.className="createButton";
    userDetailsDiv.appendChild(createButton);

    userDetailsDiv.addEventListener('submit', async (event) => {
        event.preventDefault();
        let userData = {

        };

        const inputs = userDetailsDiv.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (entidad === 'tarea' && input.id === 'type') {
                userData['type'] = { href: `/api/v3/types/${input.value}` };
            } else if (entidad === 'tarea' && input.id === 'project') {
                userData['_links'] = userData['_links'] || {};
                userData['_links']['project'] = { href: `/api/v3/projects/${input.value}` };
            } else {
                userData[input.id] = input.value;
            }
        });
        
        // Limpieza para tarea
        if (entidad === 'tarea') {
            delete userData.project;
        }

        try {
            const response = await fetch(endpointCrear[entidad], {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            alert(`${entidad} creado exitosamente`);
            // handleUsers(); // Recarga la lista de usuarios
            // Recarga la lista según la entidad
            if (entidad === "usuario") handleUsers();
            else if (entidad === "proyecto") {
                handlerProjects();
            }
            else if (entidad === "tarea") {
                handlerTareas();
            }
        } catch (error) {
            console.error(`Error creando ${entidad}:`, error);
            alert(`Error al crear ${entidad}`);
        }
    });
}

/* MODIFICAR */

const endpointGuardar = {
    usuario: '/usuario/mod',
    proyecto: '/proyecto/mod',
    tarea: '/tarea/mod',
};

export async function botonModificar(id, entidad = "usuario", fields = usuarioFields) {
    
    const userDetailsDiv = await formularioEntidad(fields, id, entidad, endpointDatos[entidad]);

    const saveButton = document.createElement('input');
    saveButton.className="saveButton";
    saveButton.type = "submit";
    saveButton.value = 'Guardar';

    userDetailsDiv.appendChild(saveButton);

    userDetailsDiv.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userData = { id }; // Incluye el ID
        
        /* const inputs = userDetailsDiv.querySelectorAll('input');
        inputs.forEach(input => {
            userData[input.id] = input.value;
        }); */

        if (entidad === 'tarea') {
            userData.subject = userDetailsDiv.querySelector('#subject').value;
            userData.lockVersion = Number(userDetailsDiv.querySelector('#lockVersion').value);
        } else {
            const inputs = userDetailsDiv.querySelectorAll('input');
            inputs.forEach(input => {
                userData[input.id] = input.value;
            });
        }


        try {
            const response = await fetch(endpointGuardar[entidad], {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            alert(`${entidad} modificado exitosamente`);
            
            if (entidad === "usuario") handleUsers();
            else if (entidad === "proyecto") {
                handlerProjects();
            }
            else if (entidad === "tarea") {
                handlerTareas();
            }
        } catch (error) {
            console.error("Error modificando usuario:", error);
            alert('Error al modificar el usuario.');
        }
    });
}

const mensajePopupEliminadoEntidad = {
    usuario: 'Usuario eliminado',
    proyecto: 'Proyecto eliminado',
    tarea: 'Tarea eliminada',
};

const mensajePopupEntidad = {
    usuario: '¿Seguro deseas eliminar este usuario?',
    proyecto: '¿Seguro deseas eliminar este proyecto?',
    tarea: '¿Seguro deseas eliminar esta tarea?',
};

/* ELIMINAR */

export async function botonEliminar(id, entidad = "usuario") {
    // Crear el popup
    const popup = document.createElement('div');
    popup.className ="popupeliminar";

    // Contenido del popup
    const popupContent = document.createElement('div');
    popupContent.className = "popupContent";

    const message = document.createElement('p');
    message.textContent = mensajePopupEntidad[entidad] || '¿Seguro deseas elimiar esta entidad?';
    message.className = "message"
    

    const buttonContainer = document.createElement('div');
    buttonContainer.className = "buttonContainer"

    const btnCancelar = document.createElement('button');
    btnCancelar.id = 'btnCancelar';
    btnCancelar.textContent = 'Cancelar';
    btnCancelar.className = "btnCancelar"

    const btnEliminar = document.createElement('button');
    btnEliminar.id = 'btnEliminar';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.className = "btnEliminar";

    buttonContainer.appendChild(btnCancelar);
    buttonContainer.appendChild(btnEliminar);

    popupContent.appendChild(message);
    popupContent.appendChild(buttonContainer);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);

    // Evento cancelar
    btnCancelar.addEventListener('click', () => {
        document.body.removeChild(popup);
    });

    // Evento eliminar
    btnEliminar.addEventListener('click', async (e) => {
    try {
        const eliminado = await confirmar_eliminado(id, entidad);
        document.body.removeChild(popup);
        if (eliminado) {
            // Mostrar popup de confirmación
            const confirmationPopup = document.createElement('div');
            confirmationPopup.className = "confirmationPopup";

            const confirmationContent = document.createElement('div');
            confirmationContent.className = "confirmationContent";

            const confirmationMessage = document.createElement('p');
            confirmationMessage.textContent = mensajePopupEliminadoEntidad[entidad] || 'Elemento eliminado';
            confirmationMessage.className = "confirmationMessage";

            const btnAceptar = document.createElement('button');
            btnAceptar.className = "btnAceptar";
            btnAceptar.textContent = 'Aceptar';

            confirmationContent.appendChild(confirmationMessage);
            confirmationContent.appendChild(btnAceptar);
            confirmationPopup.appendChild(confirmationContent);
            document.body.appendChild(confirmationPopup);

            btnAceptar.addEventListener('click', () => {
                document.body.removeChild(confirmationPopup);
                const contentDiv = document.getElementById("content");
                setTimeout(() => {
                    if (entidad === "usuario") handleUsers();
                    else if (entidad === "proyecto") {
                        contentDiv.innerHTML = '';
                        const projectsList = document.createElement('projects-list');
                        contentDiv.appendChild(projectsList);
                    }
                    else if (entidad === "tarea") {
                        const contentDiv = document.getElementById("content");
                        contentDiv.innerHTML = '';
                        const tareasList = document.createElement('tareas-list');
                        contentDiv.appendChild(tareasList);
                    }
                }, 100);
            });
        } else {
            alert(`No se pudo eliminar el ${entidad}.`);
        }
    } catch (error) {
        console.error(`Error eliminando ${entidad}:`, error);
    }
});

}

const endPointEliminar = {
    usuario: '/usuario/borrar',
    proyecto: '/proyecto/borrar',
    tarea: '/tarea/borrar',
};

// Función que JONATHAN completará
async function confirmar_eliminado(id, entidad = "usuario") {
    let url = endPointEliminar[entidad];
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"id": id})
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return true;
    } catch (error) {
        console.error(`Error deleting ${entidad}:`, error);
        return false;
    }
}

async function handleDashboard() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    try {
       const DashBoardList = document.createElement("dashboard-list");

        contentDiv.appendChild(DashBoardList);
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        const errorMessage = document.createElement('p');
        errorMessage.className = "errorMessage";
        errorMessage.textContent = 'Error loading data.';
        contentDiv.appendChild(errorMessage);
    }
}

//HISTORIAL
async function handleHistorial() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    const formDiv = document.createElement('div');
    formDiv.className="formDiv";

    const selectUsuarios = document.createElement('select');
    selectUsuarios.id = "historial-search";
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const labelStart = document.createElement('label');
    labelStart.setAttribute('for', 'startDate');
    labelStart.textContent = 'Fecha de inicio:';
    const inputStart = document.createElement('input');
    inputStart.type = 'date';
    inputStart.id = 'startDate';
    inputStart.name = 'startDate';
    inputStart.required = true;
    inputStart.value = todayStr;
    inputStart.max = todayStr;

    const labelEnd = document.createElement('label');
    labelEnd.setAttribute('for', 'endDate');
    labelEnd.textContent = 'Fecha de fin:';
    const inputEnd = document.createElement('input');
    inputEnd.type = 'date';
    inputEnd.id = 'endDate';
    inputEnd.name = 'endDate';
    inputEnd.max = todayStr;
    inputEnd.required = true;
    inputEnd.value = todayStr;

    formDiv.appendChild(labelStart);
    formDiv.appendChild(inputStart);
    formDiv.appendChild(labelEnd);
    formDiv.appendChild(inputEnd);

    inputStart.addEventListener('change', () => {
        inputEnd.min =inputStart.value;
        const startDate = new Date(inputStart.value);
        const endDate = new Date(inputEnd.value);
        if (startDate > endDate) {
            inputEnd.value = inputStart.value;
        }
        crearHistorialList();
    });

    inputEnd.addEventListener('change', () => {
        inputStart.max = inputEnd.value;
        const startDate = new Date(inputStart.value);
        const endDate = new Date(inputEnd.value);
        if (endDate < startDate) {
            inputStart.value = inputEnd.value;
        }
        crearHistorialList();
    });

    try {
        const response = await fetch('/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();
        data.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = `${user.firstname} ${user.lastname}`;
            selectUsuarios.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
    }

    formDiv.appendChild(selectUsuarios);
    
    contentDiv.appendChild(formDiv);

    crearHistorialList();
    
    selectUsuarios.addEventListener('change', crearHistorialList);
}

async function crearHistorialList() {
    const fecha1 = document.getElementById("startDate").value;
    const fecha2 = document.getElementById("endDate").value;

    const contentDiv = document.getElementById("content");
    const selectedUserId = document.getElementById("historial-search").value;
    
    let historialList = document.getElementById("historialList");
    if(historialList !=null){
        historialList.remove();
    }
    historialList = document.createElement('historial-list');
    historialList.id = "historialList";
    historialList.setAttribute('user-id', selectedUserId);
    historialList.setAttribute('fecha1', fecha1);
    historialList.setAttribute('fecha2', fecha2);
    contentDiv.appendChild(historialList);
}


function handleEstadisticas(){
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    const estadisticas = document.createElement('estadisticas-card');
    estadisticas.id = "estadisticas";
    contentDiv.appendChild(estadisticas);
}