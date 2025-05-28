import './components/empleatsCard.js';
import './components/projectsList.js';

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


    e.preventDefault();

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
    const plusIcon = document.createElement('span');
    plusIcon.textContent = '+ ';
    plusIcon.style.fontSize = '32px';
    plusIcon.style.color = 'black';
    plusIcon.style.marginRight = '5px';
    createButton.prepend(plusIcon);
    createButton.style.backgroundColor = '#06fe45';
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
            console.log(empleat);
            empleat.setAttribute('empleats-id', item.id);
            empleat.setAttribute('empleats-nom', `${item.firstname} ${item.lastname}`); // Muestra nombre y apellido
            empleados.appendChild(empleat);
            contentDiv.appendChild(empleados);
        });
        console.log(contentDiv);

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


export async function botonModificar(id) {
    // Example usage of id to avoid unused variable error
    console.log(`Modificar usuario con id: ${id}`);
}

export async function botonEliminar(id) {
    // Example usage of id to avoid unused variable error
    console.log(`Eliminar usuario con id: ${id}`);
}

