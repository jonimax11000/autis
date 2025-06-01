// Importem el component de base
import { CardComponent } from './CardComponent.js';
import { botonModificar, botonEliminar } from '../index.js';

class ProjectCard extends CardComponent {
    constructor() {
        super();
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
    }

    connectedCallback() {

        // Funció del cicle de vida que s'invoca quan el component s'afig al DOM
        // Aci agafem els atributs

        const id = this.getAttribute('project-id') || 'Projecte desconegut';
        const name = this.getAttribute('project-nom') || 'Projecte desconegt';
        let HTML = `
            <style>
                ${CardComponent.styles} /* Afegim estils del component base !! */
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

                #
            </style>

            <div class="card">
                <img src="/img/user.png" alt="Imatge de l'empleats" />
                <div class="content">
                    <h3>${name}</h3>
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
        elim.addEventListener('click', () => botonEliminar(id, "proyecto"));
        
    }
}


customElements.define('project-card', ProjectCard);
