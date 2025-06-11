import '../components/historialCard.js';

class ProjectsList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const userId = this.getAttribute('user-id');
        this.fecha1 = this.getAttribute('fecha1') || new Date().toISOString().slice(0, 10); // Fecha de inicio
        this.fecha2 = this.getAttribute('fecha2') || new Date().toISOString().slice(0, 10); // Fecha de fin
        if (userId) {
            this.fetchTimeEntries(userId);
        }
        this.render();
    }

    async fetchTimeEntries(idUsuario) {
        try {
            const response = await fetch('/historial', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: idUsuario ,
                    fecha1: this.fecha1,
                    fecha2: this.fecha2 }
                )
            });
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
            this.renderEntries(data);
        } catch (error) {
            console.error("Error fetching time Entries:", error);
        }
    }

    renderEntries(data) {
        const container = this.shadowRoot.getElementById('historial');
        container.innerHTML = '';
        if (data.timeEntries.length === 0) {
            container.innerHTML = `
                <p style="
                    font-size: 1.5em; 
                    text-align: center; 
                    margin-top: 20px; 
                ">
                    No hay tareas para este usuario.
                </p>
            `;
            return;
        }
        data.timeEntries.forEach(item => {
            const card = document.createElement('historial-card');
            card.setAttribute('proyecto', item.proyecto);
            card.setAttribute('tarea', item.tarea);
            card.setAttribute('horas', item.horas);
            card.setAttribute('fecha', item.fecha);
            card.setAttribute('estado', item.estado);
            container.appendChild(card);
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
            #historial {
                margin-left: 40px;
                width: auto;
                display: flex;
                gap: 10px;
                margin-top: 20px;
                flex-wrap: wrap;
            }
            </style>
            <div id="historial"></div>
        `;
    }
    

}

customElements.define('historial-list', ProjectsList);