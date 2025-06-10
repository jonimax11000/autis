import '../components/miembroCard.js';

class MiembrosList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.idGrupo = this.getAttribute('idGrupo') || null;
        this.usuarios = JSON.parse(this.getAttribute('usuarios') || '[]');
        this.horasCumplir = parseInt(this.getAttribute('horasCumplir')) || 8; // Horas a cumplir por día

        this.render();
        this.renderEntries();
    }

    renderEntries() {
        const contenedor = this.shadowRoot.getElementById('contenedor');
        contenedor.innerHTML = '';
        this.usuarios.forEach(usuario => {
            const card = document.createElement('miembro-card');
            card.setAttribute('idUsuario', usuario.id);
            card.setAttribute('idGrupo', this.idGrupo);
            card.setAttribute('nombre', usuario.nombre);
            card.setAttribute('horas', this.horasCumplir || 0);
            contenedor.appendChild(card);
        
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                #contenedor {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: flex-start;
                    justify-content: space-evenly;
                    width: 100%;
                    height: 100%;
                    padding: 0 20px 20px 20px;
                    box-sizing: border-box;
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