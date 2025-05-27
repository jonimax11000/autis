document.addEventListener('DOMContentLoaded', () => {
    // Intenta recuperar el token guardado en localStorage    
    const savedToken = localStorage.getItem('apiToken');
    console.log('Comprobando apiToken en localStorage:', savedToken);

    // Si ya hay un token guardado, muestramos un mensaje y no permite volver a loguearse
    if (savedToken) {
        console.log('Token encontrado en localStorage. Mostrando mensaje de acceso.');
        alert('¡Ya estás dentro!');
        // window.location.href = '/html/index.html';
        return;
    } else {
        console.log('No se encontró token en localStorage.');
    }

    // Busca el formulario de la API key en el DOM
    const form = document.getElementById('apikeyForm');
    if (form) {
        console.log('Formulario encontrado en el DOM.');
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita el envío tradicional del formulario
            const tocken = form.elements['apikey'].value.trim();

            // Valida que el campo no esté vacío
            if (!tocken) {
                alert('Campo requerido');
                return;
            }

            try {
                // Envía el token al backend para validarlo
                const response = await fetch('/tocken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ tocken: tocken })
                });

                const data = await response.json();

                // Si el backend indica que el token es válido, lo guarda y muestra mensaje
                if (data.valido) {
                    localStorage.setItem('apiToken', tocken);
                    alert('¡Ya estás dentro!');
                    // window.location.href = '/html/index.html';
                } else {
                    alert('No entras...');
                }
            } catch (err) {
                console.error('Error de conexión con el servidor:', err);
                alert('Error de conexión con el servidor.');
            }
        });
    } else {
        // Si no hay formulario, mostrar mensaje por consola
        console.warn('No se encontró el formulario apikeyForm en el DOM.');
    }
});  