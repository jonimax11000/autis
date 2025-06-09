// Importem el component de base
import { CardComponent } from './CardComponent.js';
import './derechaCard.js';
import './horasProjectosMiembroCard.js';
import './derechaCardindividual.js';
import './horasProjectosMiembroCardindividual.js';

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
    
        this.shadowRoot.querySelector("button:nth-of-type(1)").addEventListener("click", () => {
            this.renderDiv("grupos");
        });
    
        this.shadowRoot.querySelector("button:nth-of-type(2)").addEventListener("click", () => {
            this.renderDiv("trabajadores");
        });
    }

    render() {
        let HTML = `
            <style>
                button {
                    background-color: #006400;
                    color: white;
                    border: 2px solid black;
                    padding: 10px 40px;
                    margin: 0;
                    cursor: pointer;
                    border-radius: 5px;
                    font-weight: bold;
                    font-size: 20px;
                }

                #botones {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    margin: 0;
                    padding: 0;
                }

                

                #menu{
                    border: 1px solid #000;
                    padding:30px;
                    display: flex;
                    align-items: center;
                    background-Color: #FFF;
                    color: #000;
                    margin-right: 20px;
                    margin-left: 5px;
                    border-radius: 5px;
                }

                #container{
                    height: 100%;
                    width: 100%;
                    display: flex;
                    color: #000;
                }
                
                #horasMiembro {
                    display: flex;
                    border: 1px solid #000;
                    border-radius: 10px;
                    padding: 20px;
                    margin-left: 10px;
                    margin-right: auto;
                    box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
                    background-color: #fff;
                    gap: 20px;
                    width: 45%;
                    max-width: 1000px;
                    min-width: 0;
                    margin-bottom: 20px;
                }

                #derecha {
                    display: flex;
                    border: 1px solid #000;
                    border-radius: 10px;
                    padding: 20px;
                    margin-right: 30px;
                    margin-left: auto;
                    box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
                    background-color: #fff;
                    gap: 20px;
                    width: 45%;
                    max-width: 1000px;
                    min-width: 0;
                    margin-bottom: 20px;

                }
            </style>
            <div id="botones">
                <button>Grupos</button>
                <button>Usuarios</button>
            </div>

            <div id="menu">Menú de navegación</div>
            <div id="container">
                <div id="horasMiembro"></div>
                <div id="derecha"></div>
            </div>
        `;
        this.shadowRoot.innerHTML = HTML;
    }


    renderDiv(tipo = "grupos") {
        const izquierdaDiv = this.shadowRoot.getElementById("horasMiembro");
        const derechaDiv = this.shadowRoot.getElementById("derecha");
    
        izquierdaDiv.innerHTML = "";
        derechaDiv.innerHTML = "";
    
        const izquierda = document.createElement(
            tipo === "trabajadores" ? "horprojmiem-card-individual" : "horprojmiem-card"
        );
        izquierdaDiv.appendChild(izquierda);
    
        const derecha = document.createElement(
            tipo === "trabajadores" ? "derecha-card-individual" : "derecha-card"
        );
        derechaDiv.appendChild(derecha);
    }
    
}



customElements.define('estadisticas-card', EstadisticasCard);