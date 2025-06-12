import '../components/miembroCard.js';
import '../components/EstadisticaProjectCard.js';

class MiembrosList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.idGrupo = this.getAttribute('idGrupo') || null;
        this.tipo = this.getAttribute('tipo') || 'grupo'; // Tipo de miembros
        this.usuarios = JSON.parse(this.getAttribute('usuarios') || '[]');
        this.horasCumplir = parseInt(this.getAttribute('horasCumplir')) || 8; // Horas a cumplir por día
        this.fecha1 = this.getAttribute('fecha1') || new Date().toISOString().slice(0, 10); // Fecha de inicio
        this.fecha2 = this.getAttribute('fecha2') || new Date().toISOString().slice(0, 10); // Fecha de fin

        this.render();
        this.renderEntries();
    }

    renderEntries() {
        const contenedor = this.shadowRoot.getElementById('contenedor');
        contenedor.innerHTML = '';
        this.usuarios.forEach(usuario => {
            let card = null;
            if(this.tipo === 'grupo'){
                card = document.createElement('miembro-card');
                card.setAttribute('idUsuario', usuario.id);
                card.setAttribute('idGrupo', this.idGrupo);
                card.setAttribute('nombre', usuario.nombre);
                card.setAttribute('horas', this.horasCumplir || 0);
                card.setAttribute('fecha1', this.fecha1);
                card.setAttribute('fecha2', this.fecha2);
            }
            else{
                card = document.createElement('estadisticas-project-card');
                card.setAttribute('idUsuario', this.idGrupo);
                card.setAttribute('idTarea', usuario.id);
                card.setAttribute('nombre', usuario.nombre);
                card.setAttribute('horas', this.horasCumplir || 0);
                card.setAttribute('fecha1', this.fecha1);
                card.setAttribute('fecha2', this.fecha2);
            }
            
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