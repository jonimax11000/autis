
// Importem el component de base
import { CardComponent } from './CardComponent.js'

class EmpleatCard extends CardComponent {
    constructor() {
        super();
    }

    connectedCallback() {

        // Funció del cicle de vida que s'invoca quan el component s'afig al DOM
        // Aci agafem els atributs

        const id = this.getAttribute('empleats-id') || 'Entrant desconegut';
        const nom = this.getAttribute('empleats-nom') || 'Entrant desconegt';

        this.shadowRoot.innerHTML = `
            <style>
                ${CardComponent.styles} /* Afegim estils del component base !! */
            </style>

            <div class="card">
                <img src="/img/user.png" alt="Imatge de l'empleats" />
                <div class="content">
                    <h3>${nom}</h3>
                </div>
                <counter-component></counter-component>
            </div>
        `;

        // Una vegada afegit el component, establim els callbacks
        if (!this.carret || !this.producte) {
            // Comprovem primer si el carret i el producte s'han proporcionat
            console.error("Error: No s'ha passat el carret o producte correctament!");
            return;
        }

        const counter = this.shadowRoot.querySelector("counter-component");
        // NOU: PER COMENTAR
        counter.setProducte(this.producte, this.carret);

        counter.setCallbacks(
            () => { this.carret.afegirProducte(this.producte);  },
            () => { this.carret.eliminarProducte(this.producte);  }
        );

    }
}

customElements.define('empleat-card', EmpleatCard);
