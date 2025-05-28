import { Conection } from './conection.js';

export class ConectionAPI extends Conection {

    constructor(tocken) {
        super();
        // Tu código adicional aquí
        this.tocken = tocken;
    }

    async getProjects() {
        try {
            const response = await fetch('http://localhost:8080/api/v3/projects', {
                headers: {
                    'Authorization': 'Basic ' + btoa('apikey:' + this.tocken),
                }
            });
            
            return await response;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    }
    
}
