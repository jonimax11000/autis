// Importem el component de base
import { CardComponent } from './CardComponent.js';
import { botonModificar, botonEliminar } from '../index.js';

class EmpleatCard extends CardComponent {
    constructor() {
        super();
    }

    connectedCallback() {

        // Funció del cicle de vida que s'invoca quan el component s'afig al DOM
        // Aci agafem els atributs

        const id = this.getAttribute('empleats-id') || 'Entrant desconegut';
        const nom = this.getAttribute('empleats-nom') || 'Entrant desconegt';
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

        const counter = this.shadowRoot.querySelector("counter-component");
        // NOU: PER COMENTAR
        counter.setProducte(this.producte, this.carret);

        counter.setCallbacks(
            () => { this.carret.afegirProducte(this.producte);  },
            () => { this.carret.eliminarProducte(this.producte);  }
        );
        const mod = document.getElementById(`modificar${id}`);
        mod.addEventListener('click', botonModificar(id));
        if(id >4){
            const elim = document.getElementById(`eliminar${id}`);
            elim.addEventListener('click', botonEliminar(id));
        }
    }
    
    
}


customElements.define('empleat-card', EmpleatCard);
