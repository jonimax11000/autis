import '../listas/TimeEntriesList.js';

class MiembroCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

    }

    connectedCallback() {

        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: space-evenly;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    background-color: #fff;
                    width: 200px;
                    height: 200PX;
                }
            </style>
            <div class="card">
                USUARIO
            </div>`;

        
    }

}

customElements.define('miembro-card', MiembroCard);
