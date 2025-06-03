class TimeEntries extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.userId = this.getAttribute('usuario-id') || 'Empleat desconegut';
        this.fecha = this.getAttribute('fecha') || 'Fecha desconeguda';

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
                }
            </style>
            <div>
                ${this.fecha}
            </div>
        `;
    }
}

customElements.define('time-entries', TimeEntries);
