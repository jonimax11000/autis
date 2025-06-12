import { CardComponent } from './CardComponent.js';
import '../listas/miembrosList.js';

class Derechaindividual extends CardComponent {
    constructor() {
        super();
        this.horasCumplir = 8; // Horas a cumplir por día
        this.tareas = [];
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
    }

    connectedCallback() {
        this.idUsuario = this.getAttribute('idGrupo') || null;

        this.fecha1 = this.getAttribute('fecha1') || new Date().toISOString().slice(0, 10); // Fecha de inicio
        this.fecha2 = this.getAttribute('fecha2') || new Date().toISOString().slice(0, 10); // Fecha de inicio
        // Días a mostrar
        // Calcular días hábiles (sin fines de semana)
        const start = new Date(this.fecha1);
        const end = new Date(this.fecha2);
        let diasHabiles = 0;
        let current = new Date(start);
        while (current <= end) {
            const day = current.getDay();
            if (day !== 0 && day !== 6) {
            diasHabiles++;
            }
            current.setDate(current.getDate() + 1);
        }
        this.dias = Math.max(1, diasHabiles);

        this.horasCumplir*= this.dias; // Calcular horas a cumplir según los días
        this.render();
        this.fetchHorasImputadas();
        this.fetchProyectosActivos();
        this.fetchTareasAsignadas();
        this.fetchTareasTrabajadas();
    }

    async fetchTareasAsignadas(){
        try {
            const response = await fetch('/tareas/usuario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id:this.idUsuario},

                )
            });
            if (!response.ok) throw new Error(response.statusText);
            this.renderTareas(await response.json());
        }
        catch (error) {
            console.error("Error fetching groups:", error);
            this.tareas = [];
        }
    }

    renderTareas(data){
        const spanUsuarios = this.shadowRoot.getElementById("miembrosActivos");
        spanUsuarios.innerHTML = `${data.length}`;
        this.tareas = data;
        const inferior = this.shadowRoot.getElementById('lista-miembros');
        const listaMiembros = document.createElement('miembros-list');
        listaMiembros.setAttribute('tipo', 'individual');
        listaMiembros.setAttribute('idUsuario', this.idUsuario);
        listaMiembros.setAttribute('usuarios', JSON.stringify(this.tareas));
        listaMiembros.setAttribute('horasCumplir', this.horasCumplir);
        listaMiembros.setAttribute('fecha1', this.fecha1);
        listaMiembros.setAttribute('fecha2', this.fecha2);
        inferior.appendChild(listaMiembros);
    }

    async fetchProyectosActivos(){
        try {
            const response = await fetch('/group/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id:this.idUsuario})
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
            const response = await fetch('/horas/usuario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id:this.idUsuario,
                    fecha1:this.fecha1,
                    fecha2:this.fecha2,
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
        spanProyectos.innerHTML = `${parseFloat(data.horas).toFixed(2)}`;
        
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
                    <h3>  Tareas</h3>
                    <p> <span id="miembrosActivos">0</span> tareas asignadas</p>
                </div>
                <div class="sup">
                    <h3>  Proyectos Activos</h3>
                    <p> <span id="proyectosActivos">0</span> proyectos</p>
                </div>
            </div>
            <div id="inferior">
                <div class="tituloMiembros-container">
                    <span class="carga">Carga de trabajo en tareas activas</span>
                    <span class="textoHoras">Horas a cumplir  &emsp; <span class="horas">${this.horasCumplir}h</span></span>
                </div>
                <div id="lista-miembros"></div>
            </div>
        `;
        this.shadowRoot.innerHTML = HTML;
    }
}

customElements.define('derecha-card-individual', Derechaindividual);