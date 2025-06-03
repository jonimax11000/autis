import '../components/dashboardCard.js';

class DashboardList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.fetchDashboards();
    }

    async fetchDashboards() {
        try {
            const apiToken = localStorage.getItem('apiToken');
            const response = await fetch('/dashboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
            this.renderDashboards(data);
        } catch (error) {
            console.error("Error fetching dashboard:", error);
        }
    }

    renderDashboards(data) {
        const container = this.shadowRoot.getElementById('dashboards');
        container.innerHTML = '';
        data.usuarios.forEach(item => {
            const card = document.createElement('dashboard-card');
            card.setAttribute('usuario-id', item.id);
            card.setAttribute('usuario-nom', item.nombre);
            card.setAttribute('usuario-estado', item.activo);
            container.appendChild(card);
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                #dashboards {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-top: 20px;
                }
            </style>            
            <div id="dashboards"></div>
        `;
    }
}

customElements.define('dashboard-list', DashboardList);