

document.addEventListener('DOMContentLoaded', async () => {
        await fetch('http://localhost:8080/api/v3/work_packages/37', {
            headers: {
            'Authorization': 'Basic ' + btoa('apikey:9b8992b395a58440d18778eb4a2d19d17d91dfef4ea0f0a7c6984806c1573554'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
            })
            .then(response => response.json())
            .then(data => {
            // procesar los datos de proyectos
            console.log(data);
            });
 
});