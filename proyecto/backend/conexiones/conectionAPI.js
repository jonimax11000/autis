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

    async deleteProyecto(id) {
        console.log(`http://localhost:8080/api/v3/projects/${id}`);
        console.log('tocken',this.tocken);
        try {
            const response = await fetch(`http://localhost:8080/api/v3/projects/${id}`, {
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
    
    async deleteTarea(id) {
        console.log(`http://localhost:8080/api/v3/work_packages/${id}`);
        console.log('tocken',this.tocken);
        try {
            const response = await fetch(`http://localhost:8080/api/v3/work_packages/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Basic ' + btoa('apikey:' + this.tocken),
                }
            });
            
            return await response;
        } catch (error) {
            console.error('Error fetching work_packages:', error);
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

    async crearUsuario(json) {
        try {
            console.log(json);
            const response = await fetch(`http://localhost:8080/api/v3/users/`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa('apikey:' + this.tocken),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            });

            const data = await response.json();
            console.log('Respuesta crear usuario:', data);
            console.log(response);
            console.log(response.json);
            
            return await response.ok;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    }

    async crearProyecto(json) {
        try {
            console.log(json);
            const response = await fetch(`http://localhost:8080/api/v3/projects/`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa('apikey:' + this.tocken),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            });

            const data = await response.json();
            console.log('Respuesta crear proyecto:', data);
            console.log(response);
            console.log(response.json);
            
            return await response.ok;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    }

    async crearTarea(json) {
        try {
            console.log(json);
            const response = await fetch(`http://localhost:8080/api/v3/work_packages/`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa('apikey:' + this.tocken),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            });

            const data = await response.json();
            console.log('Respuesta crear proyecto:', data);
            console.log(response);
            console.log(response.json);
            
            return await response.ok;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    }

    async modificarUsuario(json) {
        const body = {
            login: json.login,
            firstName: json.firstname,
            lastName: json.lastname,
            email: json.email,
        }
        try {
            const response = await fetch(`http://localhost:8080/api/v3/users/${json.id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Basic ' + btoa('apikey:' + this.tocken),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            });
            
            return await response.ok;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    }

    async modificarProyecto(json) {
        const body = {
            name: json.name,            
        }
        try {
            const response = await fetch(`http://localhost:8080/api/v3/projects/${json.id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Basic ' + btoa('apikey:' + this.tocken),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            });
            
            return await response.ok;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    }

    async modificarTarea(json) {
        const body = {
            subject: json.subject,
            lockVersion: json.lockVersion //<<< IMPORANTE INT
        }
        try {
            const response = await fetch(`http://localhost:8080/api/v3/work_packages/${json.id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Basic ' + btoa('apikey:' + this.tocken),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            });
            
            return await response.ok;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    }
    
}
