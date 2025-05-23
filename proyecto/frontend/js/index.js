/* TODO
* Comprobar que existe el tocken en el localStorage solo condición true (si está, esta dirigie a la web >> google)
* Coger la accion del boton, enviar los datos del tocken al endpoint /token guardado en json {tocken:claveTocken}
* guardar el tocken en el localStorage en caso de que no es valida, esta mandaarañ un error
*/

document.addEventListener('DOMContentLoaded', function () {
    // 1. Comprobar si el token ya está en localStorage
    const savedToken = localStorage.getItem('apiToken');
    if (savedToken) {
        location.href = "index.html"; // Redirige si ya existe token
        return;
    }

    const form = document.getElementById('apikeyForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const token = form.elements['apike'].value;

            // 2. Enviar el token al endpoint en formato JSON
            fetch('/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            })
            .then(response => response.json())
            .then(data => {
                if (data.valido) { // Ajusta según la respuesta de tu backend
                    // 3. Guardar el token en localStorage si es válido
                    localStorage.setItem('apiToken', token);
                    location.href = "index.html"; // Redirige si ya existe token
                } else {
                    // 4. Mostrar error si el token no es válido
                    alert('Token inválido. Intenta de nuevo.');
                }
            })
            .catch(() => {
                alert('Error de conexión con el servidor.');
            });
        });
    }
});