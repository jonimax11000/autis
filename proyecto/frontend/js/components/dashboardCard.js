import '../listas/TimeEntriesList.js';

class DashboardCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.expanded = false;
        this.miniCards = [];
        this.cantidad=0;
    }

    connectedCallback() {
        this.userId = this.getAttribute('usuario-id') || 'Empleat desconegut';
        this.userNom = this.getAttribute('usuario-nom') || 'Empleat desconegut';
        this.userEstat = this.getAttribute('usuario-estado') || 'Empleat desconegut';

        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 20px;
                    border: 3px solid #000; /* Bordes más gruesos */
                    border-radius: 5px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    background-color: #fff;
                    margin: 0 auto;
                    width: 80%;
                    max-width: 1200px;
                    height: ${this.expanded ? 'auto' : 'calc(100% - 10px)'}; /* Reducir altura antes de expansión */
                    transition: all 0.3s ease;
                    color: #000; /* Letras negras */
                }
                .header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    width: 100%;
                }
                .header img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
                .header div {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start; /* Alineación a la izquierda */
                }
                .mini-cards {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 5px;
                    margin-top: 10px;
                }
                .mini-card {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    padding: 5px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                }
                .botones{
                    display: flex;
                    width:100%;
                    justify-content: center;
                    align-items: center;
                }
                .button {
                    margin-top: 10px;
                    cursor: pointer;
                    align-self: center; /* Centrar el botón */
                    margin-right:2px;
                    margin-left:2px;
                }
            </style>
            <div class="card">
                <div class="header" id="dashboard${this.userId}">
                    <img src="/img/user.png" alt="Imatge de l'empleats" />
                    <div>
                        <h3>${this.userNom}</h3>
                        <p>Estado: ${this.userEstat}</p>
                    </div>
                </div>
                <div class="botones">
                    ${this.cantidad < 2 ? '<button class="button" id="expand-button">v</button>' : ''}
                    ${this.cantidad > 0 ? '<button class="button" id="shrink-button">ᴧ</button>' : ''}
                </div>
            </div>`;

        const listaTimeentries = document.createElement("timeentries-list");
        listaTimeentries.id = `timeentries-list-${this.userId}`;
        listaTimeentries.setAttribute("usuario-id",this.userId);
        listaTimeentries.setAttribute("cantidad",this.cantidad);
        this.shadowRoot.getElementById(`dashboard${this.userId}`).appendChild(listaTimeentries);

        const expandBtn = this.shadowRoot.querySelector('#expand-button');
        if (expandBtn) {
            expandBtn.addEventListener('click', () => {
            const dashboard = this.shadowRoot.getElementById(`dashboard${this.userId}`);
            const listaTimeentries = this.shadowRoot.getElementById(`timeentries-list-${this.userId}`);
            if (dashboard && listaTimeentries) {
                dashboard.removeChild(listaTimeentries);
            }
            this.cantidad++;
            this.render();
            });
        }

        const shrinkBtn = this.shadowRoot.querySelector('#shrink-button');
        if (shrinkBtn) {
            shrinkBtn.addEventListener('click', () => {
            const dashboard = this.shadowRoot.getElementById(`dashboard${this.userId}`);
            const listaTimeentries = this.shadowRoot.getElementById(`timeentries-list-${this.userId}`);
            if (dashboard && listaTimeentries) {
                dashboard.removeChild(listaTimeentries);
            }
            this.cantidad--;
            this.render();
            });
        }
    }
}

customElements.define('dashboard-card', DashboardCard);
