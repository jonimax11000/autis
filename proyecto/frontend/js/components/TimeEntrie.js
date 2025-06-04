import {CardComponent} from "./CardComponent.js";

class TimeEntrie extends CardComponent {
    constructor() {
        super();
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
    }

    connectedCallback() {
        this.proyecto = this.getAttribute('proyecto') || 'proyecto desconocido';
        this.tarea = this.getAttribute('tarea') || 'tarea desconocida';
        this.horas = this.getAttribute('horas') || '0';
        this.estado = this.hasAttribute('estado') 
            ? (this.getAttribute('estado') === 'true' ? 'Activo' : 'Inactivo') 
            : 'inexistente';

        this.render();
    }

    render(){
        this.shadowRoot.innerHTML =  `
            <style>
            ${CardComponent.styles}
            .container {
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-start;
            gap: 20px;
            overflow-x: auto;
            }
            .card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            background-color: #fff;
            width: 300px;
            }
            .content {
            flex: 1;
            margin-right: 20px; 
            }
            </style>

            <div class="container">
                <div class="card">
                    <div class="content">
                    <h3>Proyecto: ${this.proyecto}</h3>
                    <p>Tarea: ${this.tarea}</p>
                    <p>${this.estado === 'Inactivo' ? `Horas hechas: ${this.horas}` : `Estado: ${this.estado}`}</p>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('timeentrie-card', TimeEntrie);
