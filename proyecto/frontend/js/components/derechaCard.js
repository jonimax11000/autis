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
                :host {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
                * {
                    border: 1px solid #ccc;
                }
                #superior{
                    width: 100%;
                    padding: 10px;     
                }
                .sup {
                    width: 30%;
                    height: 100%;
                    float: left;
                    box-sizing: border-box; /* Incluye padding y border en el ancho */
                    padding: 10px; /* Espacio interno */
                }
            </style>

            <div id="superior">
                <div class="sup">dato 1</div>
                <div class="sup">dato 2</div>
                <div class="sup">dato 3</div>
            </div>
        `;
        this.shadowRoot.innerHTML = HTML;
    }
}

customElements.define('derecha-card', Derecha);