import { Conection } from '../conexiones/conection.js'; // Ajusta la ruta según corresponda

export class OpenProjectRepository {
    constructor(conexion) {
        if (!this.instance) {
            this.instance = this;
            this.conexion = conexion instanceof Conection ? conexion : new Conection(conexion);
        }
        return this.instance;
    }

    cambiar(conexion) {
        this.conexion = conexion instanceof Conection ? conexion : new Conection(conexion);
    }

    async getProjects() {
        return await this.conexion.getProjects();
    }

    async getUsuarios() {
        return await this.conexion.getUsuarios();
    }
}
