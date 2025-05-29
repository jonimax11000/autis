import './components/empleatsCard.js';

document.addEventListener('DOMContentLoaded', async () => {
    const userMenu = document.getElementById('menu-empleados');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuLinks = document.querySelectorAll('.nav-menu a');
    const contentDiv = document.getElementById('content');

    // Cambiar el texto del topbar por el enlace pulsado y cargar contenido
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Limpia el contenido del contenedor principal
            contentDiv.innerHTML = '';

            // Cambia el texto de la barra central por el texto del enlace pulsado
            const txtCentral = document.querySelector('.txtcentral');
            if (txtCentral) {
                txtCentral.textContent = this.textContent;
            }

            // Lógica para cargar contenido específico según el enlace pulsado
            if (this.id === 'menu-empleados') {
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
    console.log("handleUsers called");
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
                url+='proyecto';
                body = { proyecto: document.getElementById('bucador-usuario').value };
            } else if (filterOption === 'id') {
                body = { id: document.getElementById('bucador-usuario').value };
                url+='id';
            } else if (filterOption === 'usuario') {
                body = { nombre: document.getElementById('bucador-usuario').value };
                url+='nombre';
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
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    const userDetailsDiv = document.createElement('div');
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
        { label: 'Estado:', id: 'estado' },
        { label: 'Nombre de usuario:', id: 'username' },
        { label: 'Primer nombre:', id: 'firstName' },
        { label: 'Apellido:', id: 'lastName' },
        { label: 'Correo electrónico:', id: 'email' },
        { label: 'Idioma:', id: 'idioma' }
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.textContent = field.label;
        label.style.fontWeight = 'bold';
        label.style.fontSize = '18px';
        label.style.color = 'black'; // Cambiar el color del texto a negro
        label.style.alignSelf = 'center';

        const input = document.createElement(field.id === 'idioma' ? 'select' : 'input');
        input.id = field.id;
        input.style.padding = '10px';
        input.style.border = '1px solid #ddd';
        input.style.borderRadius = '8px';
        input.style.fontSize = '16px';
        input.style.width = '100%';
        input.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        input.style.backgroundColor = '#fff';

        if (field.id === 'idioma') {
            ['Español', 'Inglés', 'Francés', 'Alemán'].forEach(lang => {
                const option = document.createElement('option');
                option.value = lang.toLowerCase();
                option.textContent = lang;
                input.appendChild(option);
            });
        }

        userDetailsDiv.appendChild(label);
        userDetailsDiv.appendChild(input);
    });

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Salvar';
    saveButton.style.backgroundColor = '#028a34'; // Cambiar el verde a un tono más oscuro
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
    contentDiv.appendChild(userDetailsDiv);
}

export async function botonEliminar(id) {
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
    message.textContent = '¿Seguro deseas eliminar este usuario?';
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
        const eliminado = await confirmar_eliminado(id);
        if (eliminado) {
            document.body.removeChild(popup);
            await handleUsers(); // espera correctamente la recarga
        } else {
            alert("No se pudo eliminar el usuario.");
        }
    } catch (error) {
        console.error("Error eliminando usuario:", error);
    }
});

}

// Función que JONATHAN completará
async function confirmar_eliminado(id) {
    try {
        const response = await fetch('/usuario/borrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return true;
    } catch (error) {
        console.error("Error deleting user:", error);
        return false;
    }
}

