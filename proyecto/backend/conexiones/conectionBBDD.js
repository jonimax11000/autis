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

            return result.rows;
        } catch (error) {
            
        }
    }
    

    async getUsuarios() {
        try {
            await this.client.connect();

            // Consulta: obtener usuarios con id mayor a 3
            const result = await this.client.query('SELECT id, firstname, lastname FROM users WHERE id > 3 ORDER BY id;');
            console.log("usuarios en BBDD: ", result.rows);

            await this.client.end();

            return result.rows;
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

            return result.rows;
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

    async getUsuariosByName(nombre) {
        console.log("entrando a BBDD");
        console.log("nombre: ", nombre);
        try {
            await this.client.connect();

            let query;
            query = `SELECT id, firstname, lastname FROM users WHERE id > 3 AND (firstname || ' ' || lastname) ILIKE '%${nombre}%' order by id;`;
           
            const result = await this.client.query(query);
            await this.client.end();
            return result.rows;
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

    async getUsuariosByProyecto(projecto) {
        try {
            await this.client.connect();

            // Exemple de consulta: obtenir els primers 5 usuaris
            const result = await this.client.query(`select id,firstname,lastname from users where id>3 and id IN (Select user_id from members where project_id IN (Select id from projects where name ILIKE '%${projecto}%')) order by id;`);

            await this.client.end();

            return result.rows;
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }
}
