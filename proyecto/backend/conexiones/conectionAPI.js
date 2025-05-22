import { Conection } from './conection.js';

export class ConectionAPI extends Conection {

    constructor() {
        super();
        // Tu código adicional aquí
    }

    async getProjects() {
        console.log('Conexión a API');
        try {
            fetch('http://localhost:8080/api/v3/projects', {
            headers: {
            'Authorization': 'Basic ' + btoa('apikey:9b8992b395a58440d18778eb4a2d19d17d91dfef4ea0f0a7c6984806c1573554')
            }
            })
            .then(response => response.json())
            .then(data => {
            // procesar los datos de proyectos
            console.log(data);
        });
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    }
    
}
