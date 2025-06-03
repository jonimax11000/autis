import './components/empleatsCard.js';
import './components/projectsList.js';
import './components/tareasList.js';
import './components/dashboardCards.js';
import './components/historialList.js';

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
            const projectsList = document.createElement('projects-list');
            contentDiv.appendChild(projectsList);
            } else if (this.textContent.trim() === 'Departamentos') {
            const tareasList = document.createElement('tareas-list');
            contentDiv.appendChild(tareasList);
            } else if (this.textContent.trim() === 'Estadísticas') {
            const tareasList = document.createElement('estadistica-list');
            contentDiv.appendChild(tareasList);
            // Lógica para cargar contenido específico según el enlace pulsado
            } else if (this.id === 'menu-empleados') {
                handleUsers(e); // Llama a la función para cargar empleados
            } else {
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

async function handleUsers(e) {
    if (e) {
        e.preventDefault();
    }

    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    const formDiv = document.createElement('div');
    formDiv.className = "formDiv";

    const searchInput = document.createElement('input');
    searchInput.class = "searchInput";
    searchInput.id = "bucador-usuario"
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar...';

    const selectFilter = document.createElement('select');
    selectFilter.classList = "selectFilter";
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
    createButton.addEventListener('click', () => {
        botonCrear(null); // Llama a la función para crear, pasando null como id
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
                body = { proyecto: document.getElementById('bucador-usuario').value };
            } else if (filterOption === 'id') {
                body = { id: document.getElementById('bucador-usuario').value };
                url += 'id';
            } else if (filterOption === 'usuario') {
                body = { nombre: document.getElementById('bucador-usuario').value };
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
async function formularioUsuario(idSeleccionado) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    const userDetailsDiv = document.createElement('form');
    userDetailsDiv.className = "userDetailsDiv";

    const fields = [
        { label: 'Nombre de usuario:', id: 'login' },
        { label: 'Nombre:', id: 'firstName' },
        { label: 'Apellido:', id: 'lastName' },
        { label: 'Correo electrónico:', id: 'email' }
    ];
    let json = null;

    if (idSeleccionado == null) {
        fields.push({ label: 'Contraseña:', id: 'password' });
    }
    else{
        try {
            const response = await fetch('/usuario/mod/datos', {
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
        } catch (error) {
            console.error("Error obteniendo datos del usuario:", error);
        }
    }

    fields.forEach(field => {
        const label = document.createElement('label');
        label.textContent = field.label;
        label.className = "label";

        const input = document.createElement('input');
        input.id = field.id;
        input.required = true;
        if (idSeleccionado != null) {
            input.value = json[field.id];
        }
        if(field.id == 'password'){
            input.type = 'password';
            input.minLength = 10;
        }
        else if(field.id == 'email'){
            input.type = 'email';
            input.pattern = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]{1,}$";
            input.title = "Introduce un correo válido, como usuario@dominio.com";
        }
        input.className = "input";
        input.required = true;
        userDetailsDiv.appendChild(label);
        userDetailsDiv.appendChild(input);
    });

    contentDiv.appendChild(userDetailsDiv);
    return userDetailsDiv;
}

export async function botonCrear(id) {
    const userDetailsDiv =  await formularioUsuario(null);

    const createButton = document.createElement('input');
    createButton.type="submit";
    createButton.value = 'Crear';

    createButton.className="createButton";
    userDetailsDiv.appendChild(createButton);
    userDetailsDiv.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userData = {

        };
        const inputs = userDetailsDiv.querySelectorAll('input');
        inputs.forEach(input => {
            userData[input.id] = input.value;
        });

        try {
            const response = await fetch('/usuario/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            alert('Usuario creado exitosamente.');
            handleUsers(); // Recarga la lista de usuarios
        } catch (error) {
            console.error("Error creando usuario:", error);
            alert('Error al crear el usuario.');
        }
    });
}

export async function botonModificar(id) {
    const userDetailsDiv = await formularioUsuario(id);

    const saveButton = document.createElement('input');
    saveButton.className="saveButton";
    saveButton.type = "submit";
    saveButton.value = 'Guardar';

    userDetailsDiv.appendChild(saveButton);
    userDetailsDiv.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userData = { id }; // Incluye el ID
        const inputs = userDetailsDiv.querySelectorAll('input');
        inputs.forEach(input => {
            userData[input.id] = input.value;
        });

        try {
            const response = await fetch('/usuario/mod', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            alert('Usuario modificado exitosamente.');
            handleUsers(); // Recarga la lista de usuarios
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

const urlEndPoint = {
    usuario: '/usuario/borrar',
    proyecto: '/proyecto/borrar',
    tarea: '/tarea/borrar',
};

// Función que JONATHAN completará
async function confirmar_eliminado(id, entidad = "usuario") {
    let url = urlEndPoint[entidad];
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

    const dashboardContainer = document.createElement('div');

    try {
        const response = await fetch('/dashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();
        /*data.forEach(item => {
            dashboardContainer.appendChild(dashboardCard);
        });
        const dashboard = document.createElement('dashboard-card');
        dashboardContainer.appendChild(dashboard);*/

        contentDiv.appendChild(dashboardContainer);
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        const errorMessage = document.createElement('p');
        errorMessage.className = "errorMessage";
        errorMessage.textContent = 'Error loading data.';
        contentDiv.appendChild(errorMessage);
    }
}

// Add event listener for the dashboard menu item
document.addEventListener('DOMContentLoaded', () => {
    const dashboardMenuItem = document.getElementById('menu-dashboard');
    if (dashboardMenuItem) {
        dashboardMenuItem.addEventListener('click', (e) => {
            e.preventDefault();
            handleDashboard();
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const historialMenuItem = document.getElementById('menu-historial');
    if (historialMenuItem) {
        historialMenuItem.addEventListener('click', (e) => {
            e.preventDefault();
            handleHistorial();
        });
    }
});

//HISTORIAL
async function handleHistorial() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    const formDiv = document.createElement('div');
    formDiv.className="formDiv";

    const selectUsuarios = document.createElement('select');
    selectUsuarios.id = "historial-search";

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

    const contentDiv = document.getElementById("content");
    const selectedUserId = document.getElementById("historial-search").value;
    
    let historialList = document.getElementById("historialList");
    if(historialList !=null){
        historialList.remove();
    }
    historialList = document.createElement('historial-list');
    historialList.id = "historialList";
    historialList.setAttribute('user-id', selectedUserId);
    contentDiv.appendChild(historialList);
    
}
