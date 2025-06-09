// Importem el component de base
import { CardComponent } from './CardComponent.js';

class Derecha extends CardComponent {
    constructor() {
        super();
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
    }

    connectedCallback() {
        
        this.render();
    }

    render() {
        let HTML = `
            <style>
                #superior{
                border: 1px solid #000;
                    width: 100%;
                    padding: 20px; 
                    height: 100px;
                    display: flex;
                }
                .sup {
                    border: 1px solid #000;
                    width: 30%;
                    height: 30px;
                    float: left;
                }
            </style>

            <div id="superior">
                hola soy un card de la derecha
            </div>
        `;
        this.shadowRoot.innerHTML = HTML;
    }
}

customElements.define('derecha-card', Derecha);