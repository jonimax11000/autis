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
            overflow-x: auto;
          }
      
          .card {
            display: flex;
            flex-direction: column;
            background-color: #fff;
            padding: 12px 16px;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            width: 150px;
            font-family: Arial, sans-serif;
          }
      
          .top-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1px;
          }
      
          .title {
            font-weight: bold;
            color: #7f5af0;
            font-size: 14px;
            margin-right: 5px;
          }
      
          .time {
            font-size: 13px;
            color: #555;
          }
      
          .project {
            font-size: 13px;
            color: #f27e00;
          }
        </style>
      
        <div class="container">
          <div class="card">
            <div class="top-row">
              <div class="title">${this.tarea}</div>
              <div class="time">${this.estado === 'Inactivo' ?  `${this.horas} horas` : `${this.estado}`}</div>
            </div>
            <div class="project">Proyecto: ${this.proyecto}</div>
          </div>
        </div>
      `;
       
    }
}

customElements.define('timeentrie-card', TimeEntrie);
