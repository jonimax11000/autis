import './TimeEntrie.js';

class TimeEntries extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.horasTotal = 0.0;
    }

    connectedCallback() {
        this.userId = this.getAttribute('usuario-id') || 'Empleat desconegut';
        const fecha = this.getAttribute('fecha') || 'Fecha desconeguda';
        // Formatea la fecha de aaaa-mm-dd a dd-mm-aaaa
        if (fecha && /^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
            const [anio, mes, dia] = fecha.split('-');
            this.fecha = `${dia}-${mes}-${anio}`;
        } else {
            this.fecha = fecha;
        }
        this.fetchTimeEntrie(fecha);
        this.render();
        
    }

    async fetchTimeEntrie(fecha) {
        try {
            const apiToken = localStorage.getItem('apiToken');
            const response = await fetch('/timeEntries/dia', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: this.userId, fecha: fecha}),
            });
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
            this.renderTimeEntrie(data);
        } catch (error) {
            console.error("Error fetching dashboard:", error);
        }
    }

    renderTimeEntrie(data) {
        const container = this.shadowRoot.getElementById("contenedor");
        // Remove all child nodes except 'estatico'
        container.innerHTML ="";
        if (data.length === 0) {
            const noTimeEntries = `
                <p style="
                    font-size: 1em; 
                    text-align: center; 
                    margin-top: 20px;
                    width: 100%;
                ">
                    No se han realizado tareas este día.
                </p>
            `;
            const noEntriesElement = document.createElement('div');
            noEntriesElement.innerHTML = noTimeEntries;
            container.appendChild(noEntriesElement);
            return;
        }
        data.forEach(item => {
            const card = document.createElement('timeentrie-card');
            card.setAttribute('proyecto', item.proyecto);
            card.setAttribute('tarea', item.tarea);
            card.setAttribute('horas', item.horas);
            card.setAttribute('estado', item.estado);
            (item.horas == null) ? item.horas = 0 : item.horas = item.horas;
            this.horasTotal += parseFloat(item.horas);

            container.appendChild(card);
        });
        this.shadowRoot.getElementById("horasTotal").textContent = `${this.horasTotal.toFixed(2)}h`;
    }

    render() {
        
        this.shadowRoot.innerHTML = `
            <style>
            .div {
                width: auto;  /* Cambiado de 100% a auto */
                max-width: 100%;  /* Asegura que no desborde al padre */
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            #estatico {
                width: 150px;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
            }
            #horasTotal {
                border: 1px solid black;
                padding: 0px 5px 1px 5px;
                border-radius: 5px;
            }
            #contenedor {
                flex-grow: 1;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                gap: 20px;
            }
            </style>
            <div class="div">
                <div id="contenedor"></div>
                <div id="estatico">
                    <span>${this.fecha}</span>
                    <span id="horasTotal">${this.horasTotal}h</span>
                </div>
            </div>
        `;
    }
}

customElements.define('time-entries', TimeEntries);
