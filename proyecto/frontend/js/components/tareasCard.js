// Importem el component de base
import { CardComponent } from './CardComponent.js';
import { botonModificar, botonEliminar } from '../index.js';

class TareaCard extends CardComponent {
    constructor() {
        super();
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
    }

    connectedCallback() {
        const id = this.getAttribute('tarea-id') || 'Tarea desconegut';
        const subject = this.getAttribute('tarea-subject') || 'Tarea desconegut';
        let HTML = `
            <style>
                ${CardComponent.styles}
                .card {
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 16px;
                    margin-bottom: 8px;
                    background: #fff;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                }
                .content {
                    flex: 1;
                }
                .buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
                .buttons button {
                    padding: 5px 10px;
                    border: none;
                    border-radius: 3px;
                    background-color: #007BFF;
                    color: white;
                    cursor: pointer;
                }
                .buttons button:hover {
                    background-color: #0056b3;
                }
            </style>

            <div class="card">
                <img src="/img/user.png" alt="Imatge de la tarea" />
                <div class="content">
                    <h3>${subject}</h3>
                    <p>ID: ${id}</p>
                </div>
                <div class="buttons">
                    <button id="modificar${id}">Modificar</button>
                    <button id="eliminar${id}">Eliminar</button>
                </div>
                <counter-component></counter-component>
            </div>
        `;
        this.shadowRoot.innerHTML = HTML;

        const mod = this.shadowRoot.getElementById(`modificar${id}`);
        mod.addEventListener('click', () => botonModificar(id));
        
        const elim = this.shadowRoot.getElementById(`eliminar${id}`);
        elim.addEventListener('click', () => botonEliminar(id, "tarea"));
    }
}

customElements.define('tarea-card', TareaCard);