import './TimeEntrie.js';

class TimeEntries extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.horasTotal = 0;
    }

    connectedCallback() {
        this.userId = this.getAttribute('usuario-id') || 'Empleat desconegut';
        this.fecha = this.getAttribute('fecha') || 'Fecha desconeguda';

        this.render();
        this.fetchTimeEntrie();
    }

    async fetchTimeEntrie() {
        try {
            const apiToken = localStorage.getItem('apiToken');
            const response = await fetch('/timeEntries/dia', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: this.userId, fecha: this.fecha }),
            });
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
            this.renderTimeEntrie(data);
        } catch (error) {
            console.error("Error fetching dashboard:", error);
        }
    }

    renderTimeEntrie(data) {
        const estatico = this.shadowRoot.getElementById("estatico");
        const container = estatico.parentNode;
        // Remove all child nodes except 'estatico'
        Array.from(container.childNodes).forEach(node => {
            if (node !== estatico) {
                container.removeChild(node);
            }
        });
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
            container.insertBefore(noEntriesElement, estatico);
            return;
        }
        data.forEach(item => {
            const card = document.createElement('timeentrie-card');
            card.setAttribute('proyecto', item.proyecto);
            card.setAttribute('tarea', item.tarea);
            card.setAttribute('horas', item.horas);
            card.setAttribute('estado', item.estado);
            this.horasTotal+=item.horas;
            container.insertBefore(card, estatico);
        });
    }

    render() {
        


        this.shadowRoot.innerHTML = `
            <style>
                .div {
                    display: flex;
                    gap: 10px;
                    margin-top: 20px;
                }
            </style>
            <div class="div">
                <div id="estatico" class"estatico">
                    <span>${this.fecha}</span>
                    <span>${this.horasTotal}</span>
                </div>
            </div>
        `;
    }
}

customElements.define('time-entries', TimeEntries);
