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
                #container{
                    border: 1px solid #ccc;
                    width: 100%;
                    height: 100%;     
                }
            </style>

            <div id="container">Contenido derecho</div>
        `;
        this.shadowRoot.innerHTML = HTML;
    }
}

customElements.define('derecha-card', Derecha);