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
            const result = await this.client.query(`SELECT id, name FROM projects ORDER BY id;`);

            await this.client.end();

            return result.rows;
        } catch (error) {
            
        }
    }
    
    /* Pa la lista >> Crear Tarea */
    async getTipoTareas() {
        try {
            await this.client.connect();

            // Exemple de consulta: obtenir els primers 5 usuaris
            const result = await this.client.query(`SELECT id, name FROM types ORDER BY id;`);

            await this.client.end();

            return result.rows;
        } catch (error) {
            
        }
    }
    
    async getTareas() {
        try {
            await this.client.connect();

            // Exemple de consulta: obtenir els primers 5 usuaris
            const result = await this.client.query(`SELECT id, subject FROM work_packages ORDER BY id;`);

            await this.client.end();

            return result.rows;
        } catch (error) {
            
        }
    }
    
    async getUsuarios() {
        try {
            await this.client.connect();

            // Consulta: obtener usuarios con id mayor a 3
            const result = await this.client.query("SELECT id, firstname, lastname FROM users WHERE type='User' ORDER BY id;");

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
            query = `SELECT id, firstname, lastname FROM users WHERE type='User' AND (firstname || ' ' || lastname) ILIKE '%${nombre}%' order by id;`;
           
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
            const result = await this.client.query(`select id,firstname,lastname from users where type='User' and id IN (Select user_id from members where project_id IN (Select id from projects where name ILIKE '%${projecto}%')) order by id;`);

            await this.client.end();

            return result.rows;
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

    async getProyectosByID(id) {
        try {
            await this.client.connect();
            
            const result = await this.client.query(`SELECT id, name FROM projects where id=${id};`);

            await this.client.end();

            return result.rows;
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

    async getProyectosByName(nombre) {
        try {
            await this.client.connect();

            let query;
            query = `SELECT id, name FROM projects WHERE name ILIKE '%${nombre}%' order by id;`;        

            const result = await this.client.query(query);
            await this.client.end();
            return result.rows;
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

    async getTareasByID(id) {
        try {
            await this.client.connect();
            
            const result = await this.client.query(`SELECT id, subject FROM work_packages where id=${id};`);

            await this.client.end();

            return result.rows;
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

    async getTareasByName(subject) {
        try {
            await this.client.connect();

            let query;
            query = `SELECT id, subject FROM work_packages WHERE subject ILIKE '%${subject}%' order by id;`;

            const result = await this.client.query(query);
            await this.client.end();
            return result.rows;
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

    /* Agarar datos del usuario de la BD */
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
    
    /* DATOS PARA MOD DE P Y T */
    async getProyectoModificar(id) {
        try {
            await this.client.connect();

            const result = await this.client.query(`SELECT name FROM projects where id=${id} Limit 1;`);

            const json = {
                name: result.rows[0].name
            };

            await this.client.end();

            return json;
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

    async getTareaModificar(id) {
        try {
            await this.client.connect();

            const result = await this.client.query(`SELECT subject, lock_version FROM work_packages where id=${id} Limit 1;`);

            const json = {
                subject: result.rows[0].subject,
                lockVersion: result.rows[0].lock_version
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

            const result = await this.client.query(`SELECT id, (firstname || ' ' || lastname) AS nombre FROM users WHERE type='User' ORDER BY id;`);
    
            await this.client.end();

            return result.rows;
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }


    async getTimeEntriesPorUsuario(id,fecha1,fecha2) {
        try {
            await this.client.connect();

            const query = `select p.name as proyecto,w.subject as tarea,t.hours as horas,t.spent_on as fecha,
                t.ongoing as estado from projects as p, work_packages as w, time_entries as t where t.work_package_id=w.id 
                and t.project_id=p.id and t.user_id=${id} AND t.spent_on BETWEEN '${fecha1}' AND '${fecha2}' order by 4 desc;`;
            const result = await this.client.query(query);
    
            await this.client.end();

            return result.rows;
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

    async getTimeEntriesPorDia(fecha,id) {
        try {
            await this.client.connect();

            const result = await this.client.query(`
    SELECT 
        p.name AS proyecto, 
        w.subject AS tarea,
        sum(t.hours) AS horas,
        t.ongoing AS estado 
    FROM 
        projects AS p, 
        work_packages AS w, 
        time_entries AS t 
    WHERE 
        t.work_package_id = w.id 
        AND t.project_id = p.id 
        AND t.user_id = ${id}
        AND t.spent_on = '${fecha}' group by 1,2,4;

`);
            await this.client.end();


            return result.rows;
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

    async getGroups(){
        try {
            await this.client.connect();

            const result = await this.client.query(`SELECT id, lastname as nombre FROM users where type='Group';`);

            await this.client.end();

            return result.rows;
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

    async getUsuariosPorGrupo(id) {
        try {
            await this.client.connect();
            const query = `SELECT id, (firstname || ' ' || lastname) as nombre 
                FROM users WHERE type='User' AND id IN (SELECT user_id FROM group_users WHERE group_id=${id}) ORDER BY id;`;
            const result = await this.client.query(query);
            await this.client.end();

            return result.rows;
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

    async getProyectosPorUsuario(id) {
        try {
            await this.client.connect();
            const query = `select id, name as nombre from projects where id IN (select project_id from members where user_id=${id}) order by 1;`;
            const result = await this.client.query(query);

            await this.client.end();

            return result.rows;
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

    async getHorasPorUsuarioYFecha(idUser,idGrupo,fecha1,fecha2) {
        try {
            await this.client.connect();
            const query = `
                SELECT SUM(hours) AS horas
                FROM time_entries
                WHERE project_id IN (
                    SELECT project_id FROM members WHERE user_id = ${idGrupo}
                )
                AND user_id = ${idUser}
                AND spent_on BETWEEN '${fecha1}' AND '${fecha2}'
                GROUP BY user_id;
            `;
            const result = await this.client.query(query);

            await this.client.end();

            if (result.rows.length > 0 && result.rows[0].horas !== null) {
                return { horas: result.rows[0].horas };
            } else {
                return { horas: 0 };
            }
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

    async getHorasPorUsuarioProyectoYFecha(idUser,idGrupo,idProyecto,fecha1,fecha2) {
        try {
            await this.client.connect();

            const query = `
                SELECT SUM(hours) AS horas
                FROM time_entries
                WHERE project_id IN (
                    SELECT project_id FROM members WHERE user_id = ${idGrupo}
                )
                AND user_id = ${idUser}
                AND project_id = ${idProyecto}
                AND spent_on BETWEEN '${fecha1}' AND '${fecha2}'
                GROUP BY user_id;
            `;

            const result = await this.client.query(query);

            await this.client.end();

            if (result.rows.length > 0 && result.rows[0].horas !== null) {
                return { horas: result.rows[0].horas };
            } else {
                return { horas: 0 };
            }
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }
}
