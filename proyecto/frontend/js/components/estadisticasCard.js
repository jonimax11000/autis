// Importem el component de base
import { CardComponent } from './CardComponent.js';
import './horasProjectosMiembroCard.js';

class EstadisticasCard extends CardComponent {
    constructor() {
        super();
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
    }

    connectedCallback() {
        
        this.render();
        this.renderDiv();
    }

    render() {
        let HTML = `
            <style>
                #menu{
                    border: 1px solid #ccc; /* Corregido: #cccc no es válido, debe ser #ccc (3 dígitos) o #cccccc (6 dígitos) */
                    padding:30px;
                    display: flex;          /* Activa Flexbox */
                    align-items: center;   /* Centra verticalmente */
                }

                #container{
                    height: 100%;
                    width: 100%;
                    border: 1px solid #ccc;
                    display: flex;
                }
                
                #horasMiembro {
                    height: 100%;
                    border: 1px solid #ccc;
                    width: 50%;
                    padding: 15px;
                    box-sizing: border-box; /* Includes padding in width calculation */
                    overflow: auto; /* Scroll if content overflows */
                }

                #derecha {
                    height: 100%;
                    border: 1px solid #ccc;
                    width: 50%;
                    padding: 15px;
                    box-sizing: border-box;
                    overflow: auto;
                }
            </style>
            <div id="menu">Menú de navegación</div>
            <div id="container">
                <div id="horasMiembro"></div>
                <div id="derecha"></div>
            </div>
        `;
        this.shadowRoot.innerHTML = HTML;
    }


    renderDiv(){
        const izquierdaDiv = this.shadowRoot.getElementById("horasMiembro");
        const derechaDiv = this.shadowRoot.getElementById("derecha");

        const izquierda = document.createElement("horprojmiem-card");
        izquierdaDiv.appendChild(izquierda);
        const derecha = document.createElement("horprojmiem-card");
        derechaDiv.appendChild(derecha);
    }
}

customElements.define('estadisticas-card', EstadisticasCard);