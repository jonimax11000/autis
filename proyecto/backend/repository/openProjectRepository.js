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

    async deleteProyecto(id) {
        return await this.conexion.deleteProyecto(id);
    }

    async getUsuarios() {
        return await this.conexion.getUsuarios();
    }

    async getTareas() {
        return await this.conexion.getTareas();
    }

    async deleteTarea(id) {
        return await this.conexion.deleteTarea(id);
    }

    async getUsuariosByID(id) {
        return await this.conexion.getUsuariosByID(id);
    }

    async getUsuariosByName(nombre) {
        return await this.conexion.getUsuariosByName(nombre);
    }

    async getUsuariosByProyecto(proyecto) {
        return await this.conexion.getUsuariosByProyecto(proyecto);
    }

    async deleteUsuario(id) {
        return await this.conexion.deleteUsuario(id);
    }
     
    async getUsuarioModificar(id) {
        return await this.conexion.getUsuarioModificar(id);
    }

    async crearUsuario(json) {
        return await this.conexion.crearUsuario(json);
    }

    async modificarUsuario(json) {
        return await this.conexion.modificarUsuario(json);
    }

    async usuarioActivo(id) {
        return await this.conexion.usuarioActivo(id);
    }

    async getUsuarios2() {
        return await this.conexion.getUsuarios2();
    }

    async getTareasHoyUsuario(id) {
        return await this.conexion.getTareasHoyUsuario(id);
    }

    async getTimeEntriesPorUsuario(id) {
        return await this.conexion.getTimeEntriesPorUsuario(id);
    }
}
