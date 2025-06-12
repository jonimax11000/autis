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

    async fetchDashboards(nombre = null) {
        try {
            const apiToken = localStorage.getItem('apiToken');
            const response = await fetch('/dashboard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre })
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
                #buscador-proyecto{
                    width:74%;
                    margin-left: 11%;
                    padding:20px;
                    border:2px solid #000000;
                    border-radius:5px;
                    font-size:16px;
                    background-color: #ffffff;
                    align-items: center;
                }
            </style>
            <div class="formDiv">
                <input class="searchInput" id="buscador-proyecto" type="text" placeholder="Buscar...">
            </div>
            <div id="dashboards"></div>
        `;

        const searchInput = this.shadowRoot.getElementById('buscador-proyecto');
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const value = searchInput.value.trim();
                this.fetchDashboards(value === '' ? null : value);
            }
        });
    }
}

customElements.define('dashboard-list', DashboardList);