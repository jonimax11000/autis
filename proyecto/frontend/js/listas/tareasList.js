import '../components/tareasCard.js';

class TareasList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.fetchtareas();
    }

    async fetchtareas() {
        try {
            const apiToken = localStorage.getItem('apiToken');
            const response = await fetch('/tareas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tocken: apiToken })
            });
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
            this.renderTareas(data);
        } catch (error) {
            console.error("Error fetching tareas:", error);
        }
    }

    renderTareas(data) {
        const container = this.shadowRoot.getElementById('tareas');
        container.innerHTML = '';
        data.forEach(item => {
            const card = document.createElement('tarea-card');
            card.setAttribute('tarea-id', item.id);
            card.setAttribute('tarea-subject', item.subject);
            container.appendChild(card);
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                #tareas {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-top: 20px;
                }
            </style>            
            <div id="tareas"></div>
        `;
    }
}

customElements.define('tareas-list', TareasList);