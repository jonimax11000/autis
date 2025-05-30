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

    addMiniCard() {
        this.miniCards.push({ text: '', color: 'red' });
        this.render(this.getAttribute('empleats-id'), this.getAttribute('empleats-nom'));
    }

    changeMiniCardColor(index) {
        this.miniCards[index].color = this.miniCards[index].color === 'red' ? 'green' : 'red';
        this.render(this.getAttribute('empleats-id'), this.getAttribute('empleats-nom'));
    }

    render(id, nom) {
        const miniCardsHTML = this.miniCards
            .map(
                (card, index) => `
                <div class="mini-card" style="background-color: ${card.color}">
                    <input type="text" value="${card.text}" placeholder="Escribe aquí" />
                    <button class="toggle-color" data-index="${index}">+</button>
                </div>
            `
            )
            .join('');

        const expandedContent = this.expanded
            ? `
            <div class="expanded-content">
                <div class="round-chart"></div>
                <div class="horizontal-chart"></div>
                <div class="sliders">
                    ${this.miniCards
                        .map(
                            (_, index) => `
                        <input type="range" min="0" max="1" step="1" data-index="${index}" />
                    `
                        )
                        .join('')}
                </div>
            </div>
        `
            : '';

        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                    width: ${this.expanded ? '400px' : '200px'};
                    height: ${this.expanded ? '400px' : '200px'};
                }
                .header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .header img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
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
                }
                .round-chart {
                    width: 100px;
                    height: 100px;
                    border: 2px solid #ccc;
                    border-radius: 50%;
                }
                .horizontal-chart {
                    width: 100%;
                    height: 20px;
                    background-color: #ccc;
                }
                .sliders input {
                    width: 100%;
                }
                .expand-button {
                    margin-top: 10px;
                    cursor: pointer;
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
                <button class="add-mini-card">Añadir mini tarjeta</button>
                <button class="expand-button">v</button>
                ${expandedContent}
            </div>
        `;

        this.shadowRoot.querySelector('.expand-button').addEventListener('click', () => this.toggleExpand());
        this.shadowRoot.querySelector('.add-mini-card').addEventListener('click', () => this.addMiniCard());
        this.shadowRoot.querySelectorAll('.toggle-color').forEach((button) =>
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                this.changeMiniCardColor(index);
            })
        );
        this.shadowRoot.querySelectorAll('.sliders input').forEach((slider) =>
            slider.addEventListener('input', (e) => {
                const index = e.target.dataset.index;
                this.changeMiniCardColor(index);
            })
        );
    }
}

customElements.define('dashboard-card', DashboardCard);