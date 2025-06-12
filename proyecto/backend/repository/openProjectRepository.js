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

    async getTipoTareas() {
        return await this.conexion.getTipoTareas();
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

    async getProyectosByID(id) {
        return await this.conexion.getProyectosByID(id);
    }

    async getProyectosByName(nombre) {
        return await this.conexion.getProyectosByName(nombre);
    }

    async getTareasByID(id) {
        return await this.conexion.getTareasByID(id);
    }

    async getTareasByName(nombre) {
        return await this.conexion.getTareasByName(nombre);
    }

    async deleteUsuario(id) {
        return await this.conexion.deleteUsuario(id);
    }
     
    async getUsuarioModificar(id) {
        return await this.conexion.getUsuarioModificar(id);
    }

    async getProyectoModificar(id) {
        return await this.conexion.getProyectoModificar(id);
    }

    async getTareaModificar(id) {
        return await this.conexion.getTareaModificar(id);
    }

    async crearUsuario(json) {
        return await this.conexion.crearUsuario(json);
    }

    async crearProyecto(json) {
        return await this.conexion.crearProyecto(json);
    }

    async crearTarea(json) {
        return await this.conexion.crearTarea(json);
    }

    async modificarUsuario(json) {
        return await this.conexion.modificarUsuario(json);
    }

    async modificarProyecto(json) {
        return await this.conexion.modificarProyecto(json);
    }

    async modificarTarea(json) {
        return await this.conexion.modificarTarea(json);
    }

    async usuarioActivo(id) {
        return await this.conexion.usuarioActivo(id);
    }

    async getUsuarios2() {
        return await this.conexion.getUsuarios2();
    }

    async getTimeEntriesPorUsuario(id,fecha1,fecha2) {
        return await this.conexion.getTimeEntriesPorUsuario(id,fecha1,fecha2);
    }

    async getTimeEntriesPorDia(fecha,id) { 
        return await this.conexion.getTimeEntriesPorDia(fecha,id);
    }

    async getGroups(){
        return await this.conexion.getGroups();
    }

    async getUsuariosPorGrupo(id) {
        return await this.conexion.getUsuariosPorGrupo(id);
    }

    async getProyectosPorUsuario(id) {
        return await this.conexion.getProyectosPorUsuario(id);
    }

    async getHorasPorUsuarioYFecha(idUser,idGrupo,fecha1,fecha2){
        return await this.conexion.getHorasPorUsuarioYFecha(idUser,idGrupo,fecha1,fecha2);
    }

    async getHorasPorUsuarioProyectoYFecha(idUser,idGrupo,idProyecto,fecha1,fecha2) {
        return await this.conexion.getHorasPorUsuarioProyectoYFecha(idUser,idGrupo,idProyecto,fecha1,fecha2);
    }

    async getHorasPorUsuario(idUser,fecha1,fecha2) {
        return await this.conexion.getHorasPorUsuario(idUser,fecha1,fecha2);
    }

    async getTareasPorUsuario(id) {
        return await this.conexion.getTareasPorUsuario(id);
    }
    
    async getHorasPorUsuarioTarea(idUser,idTarea,fecha1,fecha2) {
        return await this.conexion.getHorasPorUsuarioTarea(idUser,idTarea,fecha1,fecha2);
    }

    async getHorasPorUsuarioProyectoYFecha2(idUser,idProyecto,fecha1,fecha2){
        return await this.conexion.getHorasPorUsuarioProyectoYFecha2(idUser,idProyecto,fecha1,fecha2);
    }
}
