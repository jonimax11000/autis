// Importem el component de base
import { CardComponent } from './CardComponent.js';
import { botonModificar, botonEliminar, tareaFields } from '../index.js';

class HorasProjMiembro extends CardComponent {
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

            <div id="container">Horas npor miembro y projecto</div>
        `;
        this.shadowRoot.innerHTML = HTML;
    }
}

customElements.define('horprojmiem-card', HorasProjMiembro);