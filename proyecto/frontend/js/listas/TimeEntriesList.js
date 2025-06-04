import '../components/TimeEntries.js';

class TimeEntriesList extends HTMLElement {
    constructor() {
        super();
        this.cantidades = [1,7,30];
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.userId = this.getAttribute('usuario-id');
        this.tipo = this.getAttribute("cantidad");
        this.render();
    }

    render() {
        
        this.shadowRoot.innerHTML = `
            <style>
                #timeentries {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-top: 20px;
                    width: 100%;
                }
            </style>            
            <div id="timeentries"></div>
        `;

        const container = this.shadowRoot.getElementById('timeentries');
        container.innerHTML = '';
        for(let i = 0;i<this.cantidades[this.tipo];i++){
            const pastDate = new Date();
            pastDate.setDate(pastDate.getDate() - i);
            const formattedDate = pastDate.toISOString().split('T')[0];
            const timeEntries = document.createElement("time-entries");
            timeEntries.setAttribute("usuario-id",this.userId);
            timeEntries.setAttribute("fecha",formattedDate);
            container.appendChild(timeEntries);
        }
    }
}

customElements.define('timeentries-list', TimeEntriesList);