// Importem el component de base
import { CardComponent } from './CardComponent.js';
import '../listas/miembrosList.js';

class Derecha extends CardComponent {
    constructor() {
        super();
        this.horasCumplir = 8; // Horas a cumplir por día
        this.usuarios = [];
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
    }

    connectedCallback() {
        this.idGrupo = this.getAttribute('idGrupo') || null;
        this.dias = parseInt(this.getAttribute('dias')) || 1; // Días a mostrar

        this.horasCumplir*= this.dias; // Calcular horas a cumplir según los días
        this.render();
        this.fetchusuarios();
        this.fetchHorasImputadas();
        this.fetchProyectosActivos();
    }

    async fetchusuarios(){
        try {
            const response = await fetch('/group/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id:this.idGrupo})
            });
            if (!response.ok) throw new Error(response.statusText);
            this.renderUsuarios(await response.json());
        }
        catch (error) {
            console.error("Error fetching groups:", error);
            this.usuarios = [];
        }
    }

    renderUsuarios(data){
        const spanUsuarios = this.shadowRoot.getElementById("miembrosActivos");
        spanUsuarios.innerHTML = `${data.cantidad}`;
        this.usuarios = data.empleados;

        const inferior = this.shadowRoot.getElementById('lista-miembros');
        const listaMiembros = document.createElement('miembros-list');
        listaMiembros.setAttribute('idGrupo', this.idGrupo);
        listaMiembros.setAttribute('usuarios', JSON.stringify(this.usuarios));
        listaMiembros.setAttribute('horasCumplir', this.horasCumplir);
        inferior.appendChild(listaMiembros);
    }

    async fetchProyectosActivos(){
        try {
            const response = await fetch('/group/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id:this.idGrupo})
            });
            if (!response.ok) throw new Error(response.statusText);
            this.renderProyectos(await response.json());
        }
        catch (error) {
            console.error("Error fetching groups:", error);
        }
    }

    renderProyectos(data){
        const spanProyectos = this.shadowRoot.getElementById("proyectosActivos");
        spanProyectos.innerHTML = `${data.cantidad}`;
    }

    async fetchHorasImputadas(){
        try {
            const response = await fetch('/horas/miembros', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({idGrupo:this.idGrupo,
                    fecha1:'2021-01-01',
                    fecha2:'2026-01-01',
                })
            });
            if (!response.ok) throw new Error(response.statusText);
            this.renderHorasImputadas(await response.json());
        }
        catch (error) {
            console.error("Error fetching groups:", error);
        }
    }

    renderHorasImputadas(data){
        const spanProyectos = this.shadowRoot.getElementById("horasImputadas");
        spanProyectos.innerHTML = `${data.horas}`;
    }

    render() {
        let HTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                    min-height: 0; /* ¡Nuevo! Crucial para anidamiento flex */
                }
                
                #superior {
                    width: 100%;
                    height: auto;
                    display: flex;
                    box-sizing: border-box;
                    justify-content: space-between;
                    flex-shrink: 0; /* Evita compresión */
                }
                
                #inferior {
                    flex-grow: 1;
                    min-height: 0; /* ¡Nuevo! Permite compresión */
                    display: flex; /* ¡Nuevo! */
                    flex-direction: column; /* ¡Nuevo! */
                }
                
                .tituloMiembros-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 0 0 0;
                    flex-shrink: 0; /* Evita compresión */
                }
                
                #lista-miembros {
                    margin-top: 10px;
                    width: 100%;
                    flex-grow: 1; /* Ocupa espacio restante */
                    min-height: 0;
                    overflow: auto;
                    position: relative; /* ¡Nuevo! Para contenidos absolutos */
                }
                
                .sup {
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    width: 30%;
                    height: 90px;
                    min-width: 124px;
                }

                .sup h3 {
                    margin: 10px;
                    font-size: 17px;
                    color: #7f5af0;
                }

                .sup p {
                    margin: 10px;
                    font-size: 16px;
                    color: #d25600;
                }
                
                .carga {
                    font-size: 17px;
                    color: #7f5af0;
                }

                .textoHoras {
                    font-size: 17px;
                    color: #7f5af0;
                    margin-left: 20px;
                }
                .horas {
                    font-size: 17px;
                    color: #d25600;
                }
            </style>

            <div id="superior">
                <div class="sup">
                    <h3>  Horas Imputadas</h3>
                    <p> <span id="horasImputadas">0</span> horas</p>
                </div>
                <div class="sup">
                    <h3>  Miembros Activos</h3>
                    <p> <span id="miembrosActivos">0</span> miembros</p>
                </div>
                <div class="sup">
                    <h3>  Proyectos Activos</h3>
                    <p> <span id="proyectosActivos">0</span> proyectos</p>
                </div>
            </div>
            <div id="inferior">
                <div class="tituloMiembros-container">
                    <span class="carga">Carga de trabajo</span>
                    <span class="textoHoras">Horas a cumplir  &emsp; <span class="horas">${this.horasCumplir}h</span></span>
                </div>
                <div id="lista-miembros"></div>
            </div>
        `;
        this.shadowRoot.innerHTML = HTML;
    }
}

customElements.define('derecha-card', Derecha);