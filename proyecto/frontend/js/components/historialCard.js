// Importem el component de base
import { CardComponent } from './CardComponent.js';

class historialCard extends CardComponent {
    constructor() {
        super();
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
    }

    connectedCallback() {
        // Funció del cicle de vida que s'invoca quan el component s'afig al DOM
        // Aci agafem els atributs


        const proyecto = this.getAttribute('proyecto') || 'proyecto desconocido';
        const tarea = this.getAttribute('tarea') || 'tarea desconocida';
        const horas = this.getAttribute('horas') || '0';
        const fechaAttr = this.getAttribute('fecha') || 'fecha desconocida';
        const fecha = fechaAttr !== 'fecha desconocida' 
            ? new Date(fechaAttr).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) 
            : 'fecha desconocida';
        const estado = this.hasAttribute('estado') 
            ? (this.getAttribute('estado') === 'true' ? 'Activo' : 'Inactivo') 
            : 'inexistente';
        let HTML = `
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
                <h3>Proyecto: ${proyecto}</h3>
                <p>Tarea: ${tarea}</p>
                <p>Horas hechas: ${horas}</p>
                <p>Fecha: ${fecha}</p>
                <p>Estado: ${estado}</p>
                </div>
            </div>
            </div>
        `;

        this.shadowRoot.innerHTML = HTML;
    }
}

customElements.define('historial-card', historialCard);
