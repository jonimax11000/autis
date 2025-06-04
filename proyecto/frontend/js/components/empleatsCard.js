// Importem el component de base
import { CardComponent } from './CardComponent.js';
import { botonModificar, botonEliminar, usuarioFields } from '../index.js';


class EmpleatCard extends CardComponent {
    constructor() {
        super();
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
    }

    connectedCallback() {

        // Funció del cicle de vida que s'invoca quan el component s'afig al DOM
        // Aci agafem els atributs

        const id = this.getAttribute('empleats-id') || 'Empleat desconegut';
        const nom = this.getAttribute('empleats-nom') || 'Empleat desconegt';
        let HTML = `
            <style>
                ${CardComponent.styles} /* Afegim estils del component base !! */
                .card {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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

                #
            </style>

            <div class="card">
                <img src="/img/user.png" alt="Imatge de l'empleats" />
                <div class="content">
                    <h3>${nom}</h3>
                    <p>ID: ${id-3}</p>
                </div>
                <div class="buttons">
                    <button id="modificar${id}">Modificar</button>`;
        if(id>4){
            HTML+=`                  <button id="eliminar${id}">Eliminar</button>`;
        }
        HTML += `
                </div>
                <counter-component></counter-component>
            </div>
        `;

        
        this.shadowRoot.innerHTML = HTML;


        const mod = this.shadowRoot.getElementById(`modificar${id}`);
        mod.addEventListener('click', () => botonModificar(id), "usuario", usuarioFields);
        if(id >4){
            const elim = this.shadowRoot.getElementById(`eliminar${id}`);
            elim.addEventListener('click', () => botonEliminar(id, "usuario"));
        }
    }
    

    
}


customElements.define('empleat-card', EmpleatCard);





