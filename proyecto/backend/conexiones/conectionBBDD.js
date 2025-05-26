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
    

    async getUsuarios() {
        try {
            await this.client.connect();

            // Exemple de consulta: obtenir els primers 5 usuaris
            const result = await this.client.query('SELECT id, firstname,lastname FROM users where id>4;');

            await this.client.end();

            return JSON.stringify(result.rows);
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

    async getUsuariosByID(id) {
        try {
            await this.client.connect();

            // Exemple de consulta: obtenir els primers 5 usuaris
            const result = await this.client.query(`SELECT id, firstname, lastname FROM users where id=${id};`);

            await this.client.end();

            return JSON.stringify(result.rows);
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

    async getUsuariosByName(nombre) {
        try {
            await this.client.connect();

            // Exemple de consulta: obtenir els primers 5 usuaris
            const result = await this.client.query(`SELECT id, firstname, lastname FROM users  WHERE (firstname || ' ' || lastname) ILIKE '${nombre}%';`);

            await this.client.end();

            return JSON.stringify(result.rows);
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

    async getUsuariosByName(projecto) {
        try {
            await this.client.connect();

            // Exemple de consulta: obtenir els primers 5 usuaris
            const result = await this.client.query(`select id,firstname,lastname from users where id IN (Select user_id from members where project_id IN (Select id from projects where name ILIKE '${projecto}%'));`);

            await this.client.end();

            return JSON.stringify(result.rows);
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }
}
