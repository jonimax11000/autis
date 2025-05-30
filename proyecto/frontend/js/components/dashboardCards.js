class DashboardCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.expanded = false;
        this.miniCards = [];
    }

    connectedCallback() {
        const id = this.getAttribute('empleats-id') || 'Empleat desconegut';
        const nom = this.getAttribute('empleats-nom') || 'Empleat desconegut';

        this.render(id, nom);
    }

    toggleExpand() {
        this.expanded = !this.expanded;
        this.render(this.getAttribute('empleats-id'), this.getAttribute('empleats-nom'));
    }

    render(id, nom) {
        const miniCardsHTML = this.miniCards
            .map(
                (miniCard, index) => `
                <div class="mini-card">
                    <input type="text" value="${miniCard.text}" placeholder="Escribe aquí" />
                    <button class="toggle-color" data-index="${index}">+</button>
                </div>
            `
            )
            .join('');

        const expandedContent = this.expanded
            ? `
            <div class="expanded-content">
                <!-- aqui estructura de grafica -->
                <!-- aqui poner lo de las tareas -->
            </div>
        `
            : '';

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
                .expanded-content {
                    margin-top: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    width: 100%;
                }
                .expand-button {
                    margin-top: 10px;
                    cursor: pointer;
                    align-self: center; /* Centrar el botón */
                }
            </style>
            <div class="card">
                <div class="header">
                    <img src="/img/user.png" alt="Imatge de l'empleats" />
                    <div>
                        <h3>${nom}</h3>
                        <p>ID: ${id}</p>
                    </div>
                </div>
                <div class="mini-cards">
                    ${miniCardsHTML}
                </div>
                <button class="expand-button">v</button>
                ${expandedContent}
            </div>
        `;

        this.shadowRoot.querySelector('.expand-button').addEventListener('click', () => this.toggleExpand());
        this.shadowRoot.querySelectorAll('.toggle-color').forEach((button) =>
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                this.changeMiniCardColor(index);
            })
        );
    }
}

customElements.define('dashboard-card', DashboardCard);
