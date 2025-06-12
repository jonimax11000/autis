// Importem el component de base
import { CardComponent } from './CardComponent.js';
import './derechaCard.js';
import './horasProjectosMiembroCard.js';
import './derechaCardindividual.js';
import './horasProjectosMiembroCardindividual.js';

class EstadisticasCard extends CardComponent {
    constructor() {
        super();
        this.tipo = "grupos";
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
        this.grupos = []; // Almacenar grupos aquí
        this.usuarios = [];
    }

    async connectedCallback() {
        this.render();
        await this.fetchGrupos();
        await this.fetchUsuarios();
        this.renderSelect(); // Renderizar select después de obtener los datos
        this.setupSelectListener();
        this.setupButtons();
    }

    async fetchGrupos() {
        try {
            const response = await fetch('/groups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) throw new Error(response.statusText);
            this.grupos = await response.json();
            return this.grupos;
        }
        catch (error) {
            console.error("Error fetching groups:", error);
            this.grupos = [];
            return [];
        }
    }

    async fetchUsuarios() {
        try {
            const response = await fetch('/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) throw new Error(response.statusText);
            this.usuarios = await response.json();
            return this.usurios;
        }
        catch (error) {
            console.error("Error fetching groups:", error);
            this.usuarios = [];
            return [];
        }
    }

    renderSelect() {
        const select = this.shadowRoot.getElementById("select");
        select.innerHTML = ''; // Limpiar el select
        
        if (this.tipo === "grupos") {
            if (this.grupos.length === 0) {
                const option = document.createElement("option");
                option.value = "";
                option.textContent = "No hay grupos disponibles";

                select.appendChild(option);
                return;
            }
        }
        else if (this.tipo === "trabajadores") {
            if (this.usuarios.length === 0) {   
                const option = document.createElement("option");
                option.value = "";

                option.textContent = "No hay usuarios disponibles";
                select.appendChild(option);
                return;
            }
        }
        
        // Agregar opción por defecto
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        if(this.tipo === "grupos"){
            defaultOption.textContent = "Seleccione un grupo";
        } else {
            defaultOption.textContent = "Seleccione un usuario";
        }
        defaultOption.disabled = true;
        defaultOption.selected = true;
        select.appendChild(defaultOption);
        
        // Agregar grupos
        if (this.tipo === "grupos") {
            this.grupos.forEach(grupo => {
                const option = document.createElement("option");
                option.value = grupo.id;
                option.textContent = grupo.nombre;
                select.appendChild(option);
            });
        }
        else if (this.tipo === "trabajadores") {
            this.usuarios.forEach(usuario => {
                const option = document.createElement("option");
                option.value = usuario.id;
                option.textContent = `${usuario.firstname} ${usuario.lastname}`;
                select.appendChild(option);
            });
        }
    }

    setupSelectListener() {
        const select = this.shadowRoot.getElementById("select");
        select.addEventListener("change", (event) => {
            const selectedValue = event.target.value;
            if (selectedValue) {
                this.renderDiv();
            }
        });
    }

    setupButtons() {
        this.shadowRoot.querySelector("button:nth-of-type(1)").addEventListener("click", () => {
            this.tipo="grupos";
            this.renderSelect(); // Renderizar select para grupos
            const select = this.shadowRoot.getElementById("select");
            if (select && select.selectedIndex > 0) {
                // Si hay una opción seleccionada (no la opción por defecto)
                this.fetchGrupos().then(() => {
                    this.renderDiv();
                });
            }
        });
    
        this.shadowRoot.querySelector("button:nth-of-type(2)").addEventListener("click", () => {
            this.tipo="trabajadores";
            this.renderSelect(); // Renderizar select para trabajadores
            const select = this.shadowRoot.getElementById("select");
            if (select && select.selectedIndex > 0) {
                // Si hay una opción seleccionada (no la opción por defecto)
                this.fetchGrupos().then(() => {
                    this.renderDiv();
                });
            }
        });
    }

    render() {
        // Obtener la fecha de hoy en formato YYYY-MM-DD
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayStr = `${yyyy}-${mm}-${dd}`;

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
                #select {
                    background-color: #c7c8c7;
                    border: 2px solid #000;
                    border-radius: 10px;
                    padding: 10px 16px;
                    font-size: 16px;
                    color: black;
                    cursor: pointer;
                    background-position: right 12px center;
                    background-size: 16px;
                    padding-right: 40px;
                    
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
            <label for="startDate">Fecha de inicio:</label>
            <input type="date" id="startDate" name="startDate" required value="${todayStr}" max="${todayStr}">
            
            <label for="endDate">Fecha de fin:</label>
            <input type="date" id="endDate" name="endDate" required value="${todayStr}" max="${todayStr}">
            </div>
            <div id="container">
            <div id="horasMiembro"></div>
            <div id="derecha"></div>
            </div>
        `;
        this.shadowRoot.innerHTML = HTML;

        // Obtener referencias a los elementos del shadow DOM
        const startDateInput = this.shadowRoot.getElementById('startDate');
        const endDateInput = this.shadowRoot.getElementById('endDate');

        this.funcionalidadFecha();
    }


    renderDiv() {
        const izquierdaDiv = this.shadowRoot.getElementById("horasMiembro");
        const derechaDiv = this.shadowRoot.getElementById("derecha");
    
        izquierdaDiv.innerHTML = "";
        derechaDiv.innerHTML = "";
    
        const izquierda = document.createElement(
            this.tipo === "trabajadores" ? "horprojmiem-card-individual" : "horprojmiem-card"
        );
        izquierda.id = "izquierdaCard";
        const select = this.shadowRoot.getElementById("select");
        const selectedOption = select.options[select.selectedIndex];
        if (selectedOption && selectedOption.value) {
            izquierda.setAttribute("idGrupo", selectedOption.value);
        }
        
        izquierda.setAttribute('fecha1',this.shadowRoot.getElementById("startDate").value);
        izquierda.setAttribute('fecha2',this.shadowRoot.getElementById("endDate").value);
        
        izquierdaDiv.appendChild(izquierda);
    
        const derecha = document.createElement(
            this.tipo === "trabajadores" ? "derecha-card-individual" : "derecha-card"
        );
        derecha.id = "derechaCard";
        derecha.setAttribute("idGrupo", selectedOption.value);
        derecha.setAttribute('fecha1',this.shadowRoot.getElementById("startDate").value);
        derecha.setAttribute('fecha2',this.shadowRoot.getElementById("endDate").value);
        derechaDiv.appendChild(derecha);
    }

    funcionalidadFecha() {
        const startDateInput = this.shadowRoot.getElementById('startDate');
        const endDateInput = this.shadowRoot.getElementById('endDate');

        startDateInput.addEventListener('change', () => {
            endDateInput.min =startDateInput.value;
            const startDate = new Date(startDateInput.value);
            const endDate = new Date(endDateInput.value);
            if (startDate > endDate) {
                endDateInput.value = startDateInput.value;
            }
            const select = this.shadowRoot.getElementById("select");
            const selectedOption = select.options[select.selectedIndex];
            if (selectedOption && selectedOption.value) {
                this.renderDiv();
            }
        });

        endDateInput.addEventListener('change', () => {
            startDateInput.max = endDateInput.value;
            const startDate = new Date(startDateInput.value);
            const endDate = new Date(endDateInput.value);
            if (endDate < startDate) {
                startDateInput.value = endDateInput.value;
            }
            const select = this.shadowRoot.getElementById("select");
            const selectedOption = select.options[select.selectedIndex];
            if (selectedOption && selectedOption.value) {
                this.renderDiv();
            }
        });
    }
    
}



customElements.define('estadisticas-card', EstadisticasCard);