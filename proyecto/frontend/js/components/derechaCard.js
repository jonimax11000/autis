// Importem el component de base
import { CardComponent } from './CardComponent.js';
import '../listas/miembrosList.js';

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
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                    min-height: 0; /* ¡Nuevo! Crucial para anidamiento flex */
                }
                
                #superior {
                    width: 100%;
                    height: auto;
                    display: flex;
                    box-sizing: border-box;
                    justify-content: space-between;
                    flex-shrink: 0; /* Evita compresión */
                }
                
                #inferior {
                    flex-grow: 1;
                    min-height: 0; /* ¡Nuevo! Permite compresión */
                    display: flex; /* ¡Nuevo! */
                    flex-direction: column; /* ¡Nuevo! */
                }
                
                .tituloMiembros-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border: 1px solid #ccc;
                    padding: 10px 0 10px 0;
                    flex-shrink: 0; /* Evita compresión */
                }
                
                #lista-miembros {
                    border: 1px solid #ccc;
                    margin-top: 10px;
                    width: 100%;
                    flex-grow: 1; /* Ocupa espacio restante */
                    min-height: 0;
                    overflow: auto;
                    position: relative; /* ¡Nuevo! Para contenidos absolutos */
                }
                
                .sup {
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    width: 30%;
                    height: 80px;
                    min-width: 124px;
                }

                .sup h3 {
                    margin: 10px;
                    font-size: 17px;
                    color: #7f5af0;
                }

                .sup p {
                    margin: 10px;
                    font-size: 16px;
                    color: #d25600;
                }
                
                .tituloMiembros-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border: 1px solid #ccc;
                }

                .carga {
                    font-size: 17px;
                    color: #7f5af0;
                }

                .textoHoras {
                    font-size: 17px;
                    color: #7f5af0;
                    margin-left: 20px;
                }
                .horas {
                    font-size: 17px;
                    color: #d25600;
                }
            </style>

            <div id="superior">
                <div class="sup">
                    <h3>  Horas Imputadas</h3>
                    <p> 100 horas</p>
                </div>
                <div class="sup">
                    <h3>  Miembros Activos</h3>
                    <p> 100 miembros</p>
                </div>
                <div class="sup">
                    <h3>  Proyectos Activos</h3>
                    <p> 100 proyectos</p>
                </div>
            </div>
            <div id="inferior">
                <div class="tituloMiembros-container">
                    <span class="carga">Carga de trabajo</span>
                    <span class="textoHoras">Horas a cumplir  &emsp; <span class="horas">48h</span></span>
                </div>
                <div id="lista-miembros"></div>
            </div>
        `;
        this.shadowRoot.innerHTML = HTML;

        const inferior = this.shadowRoot.getElementById('lista-miembros');
        const listaMiembros = document.createElement('miembros-list');
        inferior.appendChild(listaMiembros);
    }
}

customElements.define('derecha-card', Derecha);