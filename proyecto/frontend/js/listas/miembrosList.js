import '../components/miembroCard.js';

class MiembrosList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.fetchMiembros();
    }

    async fetchMiembros() {
        /*try {
            const response = await fetch('/historial', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: idUsuario })
            });
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
            this.renderEntries(data);
        } catch (error) {
            console.error("Error fetching time Entries:", error);
        }*/
       this.renderEntries(); // Simulación de datos
    }

    renderEntries(data) {
        const contenedor = this.shadowRoot.getElementById('contenedor');
        contenedor.innerHTML = '';
        for (let i = 0; i < 8; i++) {

            const card = document.createElement('miembro-card');
            contenedor.appendChild(card);
        
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                #contenedor {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: flex-start;
                    justify-content: flex-start;
                    width: 100%;
                    height: 100%;
                    padding: 20px;
                    box-sizing: border-box;
                    border: 1px solid #ccc;
                    scrollbar-width: thin;
                    overflow-y: auto;
                    gap: 16px;
                }
            </style>
            <div id="contenedor"></div>
        `;

        const contenedor = this.shadowRoot.getElementById('contenedor');

    }
    

}

customElements.define('miembros-list', MiembrosList);