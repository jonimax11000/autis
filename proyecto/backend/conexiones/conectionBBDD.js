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
            const result = await this.client.query('SELECT id, name FROM projects;');
            console.log("proyectos en BBDD: "+result.rows);

            await this.client.end();

            return result.rows;
        } catch (error) {
            
        }
    }
    
    async getTareas() {
        try {
            await this.client.connect();

            // Exemple de consulta: obtenir els primers 5 usuaris
            const result = await this.client.query('SELECT id, subject FROM work_packages ORDER BY id;');
            console.log("tareas en BBDD: "+result.rows);

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

    async getUsuarioModificar(id) {
        try {
            await this.client.connect();

            const result = await this.client.query(`SELECT login,firstname,lastname,mail FROM users where id=${id} Limit 1;`);

            const json = {
                login: result.rows[0].login,
                firstName: result.rows[0].firstname,
                lastName: result.rows[0].lastname,
                email: result.rows[0].mail
            };

            await this.client.end();

            return json;
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

    async usuarioActivo(id) {
        try {
            await this.client.connect();

            const result = await this.client.query(`select count(*) from time_entries where user_id=${id} and ongoing='true';`);

            const json = {
                activo: false
            };

            

            await this.client.end();
            if (result.rows[0].count > 0) {
                return true;
            }
            else{
                return false;
            }
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

    async getUsuarios2() {
        try {
            await this.client.connect();

            const result = await this.client.query(`SELECT id, (firstname || ' ' || lastname) AS nombre FROM users WHERE id > 3 ORDER BY id;`);
    
            await this.client.end();

            return result.rows;
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

    async getTareasHoyUsuario(id) {
        try {
            await this.client.connect();

            const result = await this.client.query(`select * from work_packages where assigned_to_id=${id} and status_id IN (select id from statuses where is_closed=false);`);
    
            await this.client.end();

            return result.rows;
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }
}
