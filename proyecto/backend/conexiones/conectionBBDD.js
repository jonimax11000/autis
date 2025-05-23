import { Conection } from './conection.js';
import { Client } from 'pg';

export class ConectionBBDD extends Conection {

    constructor() {
        super();

        this.client = new Client({
            host: 'localhost', // o el nom del servei docker, ex: 'db'
            port: 5555,
            user: 'postgres', // usuari per defecte OpenProject
            password: 'postgres', // contrasenya per defecte OpenProject
            database: 'openproject' // nom de la base de dades
        });
        // Tu código adicional aquí
    }

    async getProjects() {
        try {
            await this.client.connect();

            // Exemple de consulta: obtenir els primers 5 usuaris
            const result = await this.client.query('SELECT * FROM users LIMIT 5;');

            await this.client.end();

            res.json(result.rows);
        } catch (error) {
            
        }
    }
    
}
