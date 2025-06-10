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
        this.grupos = []; // Almacenar grupos aquí
    }

    connectedCallback() {
        this.render();
        this.fetchGrupos().then(() => {
            this.setupSelectListener();
            this.setupButtons();
        });
    }

    async fetchGrupos() {
        try {
            const response = await fetch('/groups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) throw new Error(response.statusText);
            this.grupos = await response.json();
            this.renderSelect(); // Mover renderSelect aquí después de tener los datos
            return this.grupos;
        }
        catch (error) {
            console.error("Error fetching groups:", error);
            this.grupos = [];
            this.renderSelect(); // Renderizar incluso si hay error
            return [];
        }
    }

    renderSelect() {
        const select = this.shadowRoot.getElementById("select");
        select.innerHTML = ''; // Limpiar el select
        
        if (this.grupos.length === 0) {
            const option = document.createElement("option");
            option.value = "";
            option.textContent = "No hay grupos disponibles";
            select.appendChild(option);
            return;
        }
        
        // Agregar opción por defecto
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Seleccione un grupo";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        select.appendChild(defaultOption);
        
        // Agregar grupos
        this.grupos.forEach(grupo => {
            const option = document.createElement("option");
            option.value = grupo.id;
            option.textContent = grupo.nombre;
            select.appendChild(option);
        });
    }

    setupSelectListener() {
        const select = this.shadowRoot.getElementById("select");
        select.addEventListener("change", (event) => {
            const selectedValue = event.target.value;
            if (selectedValue) {
                this.renderDiv("grupos");
            }
        });
    }

    setupButtons() {
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
                    margin-top: -10px;
                    padding: 0;
                }

                #menu{
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    padding:30px;
                    display: flex;
                    align-items: center;
                    background-Color: #FFF;
                    color: #000;
                    margin-right: 20px;
                    margin-left: 5px;
                }

                #container{
                    height: 100%;
                    width: 100%;
                    display: flex;
                    color: #000;
                }
                
                #horasMiembro {
                    display: flex;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    padding: 20px;
                    margin-left: 10px;
                    margin-right: auto;
                    box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
                    background-color: #fff;
                    gap: 20px;
                    width: 48%;
                    max-width: 1000px;
                    min-width: 420px;
                    margin-bottom: 20px;
                }

                #derecha {
                    display: flex;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    padding: 20px;
                    margin-right: 30px;
                    margin-left: auto;
                    box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
                    background-color: #fff;
                    gap: 20px;
                    width: 48%;
                    max-width: 1000px;
                    min-width: 420px;
                    margin-bottom: 20px;
                }
                #izquierdaCard, #derechaCard {
                    width: 100%;
                    height: 100%;
                }
            </style>
            <div id="botones">
                <button>Grupos</button>
                <button>Usuarios</button>
            </div>

            <div id="menu">
                <select id="select"></select>
            </div>
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
        izquierda.id = "izquierdaCard";
        const select = this.shadowRoot.getElementById("select");
        const selectedOption = select.options[select.selectedIndex];
        if (selectedOption && selectedOption.value) {
            izquierda.setAttribute("idGrupo", selectedOption.value);
        }
        izquierdaDiv.appendChild(izquierda);
    
        const derecha = document.createElement(
            tipo === "trabajadores" ? "derecha-card-individual" : "derecha-card"
        );
        derecha.id = "derechaCard";
        derecha.setAttribute("idGrupo", selectedOption.value);
        derechaDiv.appendChild(derecha);
    }
    
}



customElements.define('estadisticas-card', EstadisticasCard);