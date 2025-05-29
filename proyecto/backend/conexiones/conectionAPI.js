import { Conection } from './conection.js';

export class ConectionAPI extends Conection {

    constructor(tocken) {
        super();
        // Tu código adicional aquí
        this.tocken = tocken;
        console.log('Tocken en ConectionAPI:', this.tocken);
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


    async deleteUsuario(id) {
        console.log(`http://localhost:8080/api/v3/users/${id}`);
        console.log('tocken',this.tocken);
        try {
            const response = await fetch(`http://localhost:8080/api/v3/users/${id}`, {
                method: 'DELETE',
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

    async deleteUsuario(json) {
        console.log(`http://localhost:8080/api/v3/users/`);
        console.log('tocken',this.tocken);
        try {
            const response = await fetch(`http://localhost:8080/api/v3/users/`, {
                method: 'POST',
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
