import './components/empleatsCard.js';
import './components/projectsList.js';
import './components/tareasList.js';
import './components/dashboardCards.js';
import './components/historialCard.js';

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
    formDiv.style.display = 'flex';
    formDiv.style.gap = '10px';

    const searchInput = document.createElement('input');
    searchInput.id = "bucador-usuario"
    searchInput.type = 'text';
    searchInput.style.marginLeft = '40px';
    searchInput.placeholder = 'Buscar...';
    searchInput.style.width = '50%';
    searchInput.style.padding = '10px';
    searchInput.style.border = '1px solid #ccc';
    searchInput.style.borderRadius = '5px';
    searchInput.style.fontSize = '16px';
    searchInput.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';

    const selectFilter = document.createElement('select');
    selectFilter.id = "filtros"
    const options = ['proyecto', 'usuario', 'id'];
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        selectFilter.appendChild(opt);
    });
    selectFilter.style.marginLeft = '10px';
    selectFilter.style.padding = '8px';
    selectFilter.style.border = '1px solid #ccc';
    selectFilter.style.borderRadius = '5px';
    selectFilter.style.fontSize = '16px';
    selectFilter.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    selectFilter.style.width = '200px';

    const createButton = document.createElement('button');
    createButton.textContent = 'Crear';
    createButton.addEventListener('click', () => {
        botonCrear(null); // Llama a la función para crear, pasando null como id
    });
    const plusIcon = document.createElement('span');
    plusIcon.textContent = '+ ';
    plusIcon.style.fontSize = '32px';
    plusIcon.style.color = 'black';
    plusIcon.style.marginRight = '5px';
    createButton.prepend(plusIcon);
    createButton.style.backgroundColor = '#006400';
    createButton.style.border = 'none';
    createButton.style.padding = '10px 20px';
    createButton.style.borderRadius = '5px';
    createButton.style.cursor = 'pointer';
    createButton.style.fontSize = '20px';
    createButton.style.color = 'white';
    createButton.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    createButton.style.marginLeft = 'auto';
    createButton.style.marginRight = '30px';
    createButton.style.display = 'flex';
    createButton.style.alignItems = 'center';
    createButton.style.justifyContent = 'center';

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
            console.log(url);
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
    userDetailsDiv.style.display = 'grid';
    userDetailsDiv.style.gridTemplateColumns = '1fr 2fr';
    userDetailsDiv.style.gap = '20px';
    userDetailsDiv.style.padding = '40px';
    userDetailsDiv.style.border = '1px solid #ddd';
    userDetailsDiv.style.borderRadius = '12px';
    userDetailsDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    userDetailsDiv.style.maxWidth = '800px';
    userDetailsDiv.style.margin = '40px auto';
    userDetailsDiv.style.backgroundColor = '#f9f9f9';

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

    if (idSeleccionado === null) {
        fields.push({ label: 'Contraseña:', id: 'password' });
    }

    fields.forEach(field => {
        const label = document.createElement('label');
        label.textContent = field.label;
        label.style.fontWeight = 'bold';
        label.style.fontSize = '18px';
        label.style.color = 'black';
        label.style.alignSelf = 'center';

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
        input.style.padding = '10px';
        input.style.border = '1px solid #ddd';
        input.style.borderRadius = '8px';
        input.style.fontSize = '16px';
        input.style.width = '100%';
        input.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        input.style.backgroundColor = '#fff';
        input.required = true;

        userDetailsDiv.appendChild(label);
        userDetailsDiv.appendChild(input);
    });

    contentDiv.appendChild(userDetailsDiv);
    return userDetailsDiv;
}

export async function botonCrear(id) {
    const userDetailsDiv =  await formularioUsuario(null);
    console.log(userDetailsDiv);

    const createButton = document.createElement('input');
    createButton.type="submit";
    createButton.value = 'Crear';

    createButton.style.backgroundColor = '#028a34';

    createButton.style.color = 'white';
    createButton.style.border = 'none';
    createButton.style.padding = '15px 30px';
    createButton.style.borderRadius = '8px';
    createButton.style.cursor = 'pointer';
    createButton.style.fontSize = '18px';
    createButton.style.marginTop = '20px';
    createButton.style.alignSelf = 'center';
    createButton.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';

    createButton.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
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
    saveButton.type = "submit";
    saveButton.value = 'Guardar';
    saveButton.style.backgroundColor = '#028a34';
    saveButton.style.color = 'white';
    saveButton.style.border = 'none';
    saveButton.style.padding = '15px 30px';
    saveButton.style.borderRadius = '8px';
    saveButton.style.cursor = 'pointer';
    saveButton.style.fontSize = '18px';
    saveButton.style.marginTop = '20px';
    saveButton.style.alignSelf = 'center';
    saveButton.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';

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
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100vw';
    popup.style.height = '100vh';
    popup.style.backgroundColor = 'rgba(0,0,0,0.5)';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.zIndex = '1000';

    // Contenido del popup
    const popupContent = document.createElement('div');
    popupContent.style.backgroundColor = 'white';
    popupContent.style.padding = '40px';
    popupContent.style.borderRadius = '16px';
    popupContent.style.textAlign = 'center';
    // Aquí está el tamaño del cuadrado del popup
    popupContent.style.minWidth = '400px';
    popupContent.style.minHeight = '200px';
    popupContent.style.display = 'flex';
    popupContent.style.flexDirection = 'column';
    popupContent.style.justifyContent = 'center';
    popupContent.style.alignItems = 'center';

    const message = document.createElement('p');
    message.textContent = mensajePopupEntidad[entidad] || '¿Seguro deseas elimiar esta entidad?';
    message.style.fontSize = '20px';
    message.style.color = 'black';
    message.style.marginBottom = '20px'; // Separación con los botones
    message.style.textAlign = 'center';

    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '10px';

    const btnCancelar = document.createElement('button');
    btnCancelar.id = 'btnCancelar';
    btnCancelar.textContent = 'Cancelar';
    btnCancelar.style.backgroundColor = 'grey';
    btnCancelar.style.color = 'white';
    btnCancelar.style.padding = '10px 20px';
    btnCancelar.style.border = 'none';
    btnCancelar.style.borderRadius = '5px';
    btnCancelar.style.fontSize = '16px';
    btnCancelar.style.cursor = 'pointer';

    const btnEliminar = document.createElement('button');
    btnEliminar.id = 'btnEliminar';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.style.backgroundColor = 'red';
    btnEliminar.style.color = 'white';
    btnEliminar.style.padding = '10px 20px';
    btnEliminar.style.border = 'none';
    btnEliminar.style.borderRadius = '5px';
    btnEliminar.style.fontSize = '16px';
    btnEliminar.style.cursor = 'pointer';

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
            confirmationPopup.style.position = 'fixed';
            confirmationPopup.style.top = '0';
            confirmationPopup.style.left = '0';
            confirmationPopup.style.width = '100vw';
            confirmationPopup.style.height = '100vh';
            confirmationPopup.style.backgroundColor = 'rgba(0,0,0,0.5)';
            confirmationPopup.style.display = 'flex';
            confirmationPopup.style.justifyContent = 'center';
            confirmationPopup.style.alignItems = 'center';
            confirmationPopup.style.zIndex = '1000';

            const confirmationContent = document.createElement('div');
            confirmationContent.style.backgroundColor = 'white';
            confirmationContent.style.padding = '40px';
            confirmationContent.style.borderRadius = '16px';
            confirmationContent.style.textAlign = 'center';
            confirmationContent.style.minWidth = '400px';
            confirmationContent.style.minHeight = '200px';
            confirmationContent.style.display = 'flex';
            confirmationContent.style.flexDirection = 'column';
            confirmationContent.style.justifyContent = 'center';
            confirmationContent.style.alignItems = 'center';

            const confirmationMessage = document.createElement('p');
            confirmationMessage.textContent = mensajePopupEliminadoEntidad[entidad] || 'Elemento eliminado';
            confirmationMessage.style.fontSize = '20px';
            confirmationMessage.style.color = 'black';
            confirmationMessage.style.marginBottom = '20px';
            confirmationMessage.style.textAlign = 'center';

            const btnAceptar = document.createElement('button');
            btnAceptar.textContent = 'Aceptar';
            btnAceptar.style.backgroundColor = '#003366';
            btnAceptar.style.color = 'white';
            btnAceptar.style.padding = '10px 20px';
            btnAceptar.style.border = 'none';
            btnAceptar.style.borderRadius = '5px';
            btnAceptar.style.fontSize = '16px';
            btnAceptar.style.cursor = 'pointer';

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
    dashboardContainer.style.display = 'grid';
    dashboardContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    dashboardContainer.style.gap = '20px';
    dashboardContainer.style.padding = '20px';

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
        console.log(data);
        /*data.forEach(item => {
            dashboardContainer.appendChild(dashboardCard);
        });
        const dashboard = document.createElement('dashboard-card');
        dashboardContainer.appendChild(dashboard);*/

        contentDiv.appendChild(dashboardContainer);
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Error loading data.';
        errorMessage.style.color = 'red';
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
async function handleHistorial() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    const formDiv = document.createElement('div');
    formDiv.style.display = 'flex';
    formDiv.style.gap = '10px';

    const searchInput = document.createElement('input');
    searchInput.id = "historial-search";
    searchInput.type = 'text';
    searchInput.style.marginLeft = '40px';
    searchInput.placeholder = 'Buscar por nombre...';
    searchInput.style.width = '50%';
    searchInput.style.padding = '10px';
    searchInput.style.border = '1px solid #ccc';
    searchInput.style.borderRadius = '5px';
    searchInput.style.fontSize = '16px';
    searchInput.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    formDiv.style.justifyContent = 'center';
    formDiv.style.marginTop = '20px';

    formDiv.appendChild(searchInput);
    contentDiv.appendChild(formDiv);

    // Create historialDiv once and append it to contentDiv
    const historialDiv = document.createElement("div");
    historialDiv.id = "historial";
    historialDiv.style.marginTop = '20px';
    contentDiv.appendChild(historialDiv);

    searchInput.addEventListener('keypress', async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            const query = searchInput.value.trim();
            if (!query) return;

            try {
                const response = await fetch('/historial/buscar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nombre: query })
                });

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const data = await response.json();
                historialDiv.innerHTML = ''; // Clear previous results
                data.forEach(item => {
                    const historialCard = document.createElement('historial-card');
                    historialCard.setAttribute('historial-id', item.id);
                    historialCard.setAttribute('historial-nombre', `${item.firstname} ${item.lastname}`);
                    historialDiv.appendChild(historialCard);
                });
            } catch (error) {
                console.error("Error fetching historial info:", error);
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'Error en las tarjetas.';
                errorMessage.style.color = 'red';
                historialDiv.appendChild(errorMessage);
            }
        }
    });
}
