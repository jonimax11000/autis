import { Conection } from './conection.js';

export class ConectionAPI extends Conection {

    constructor(tocken) {
        super();
        // Tu código adicional aquí
        this.tocken = tocken;
    }

    async getProjects() {
        try {
            fetch('http://localhost:8080/api/v3/projects', {
            headers: {
            'Authorization': 'Basic ' + btoa('apikey:'+this.tocken),
            }
            })
            .then(response => response.json())
            .then(data => {
            // procesar los datos de proyectos
        });
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    }
    
}
