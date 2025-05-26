// Creem un element "base" que aplique estils comuns per a tots els components

// La resta de components derivaran d'aquest, de manera que seran també HTMLElements, però 
// amb les propietats que definim aci.

export class BaseComponent extends HTMLElement { // Exportem la classe per usar-la des de fora
    constructor() { // Mètode constructor
        super();    // Invoquem al constructor de HTMLElement
        this.attachShadow({ mode: 'open' });    // Afegim un shadow DOM
        this.render();  // I dibuixem el contingut
    }

    static get styles() {
        // Definim els estils principals: Tipus de lletra, colors, etc.
        // A més, definim box-sizing per ajustar millor uns compoenents
        // dins d'altres, sense que se n'isquen.

        return `
            :host {
                font-family: 'Arial', sans-serif;
                --primary-color: #6200ea;
                --secondary-color: #03dac6;
                --on-primary-color: #4500b5;
                --text-color: #333;
                --background-color: #fff;
            }

            * {
                box-sizing: border-box;
            }
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${BaseComponent.styles}</style>
            <slot></slot>
        `;
    }
}

customElements.define('base-component', BaseComponent);