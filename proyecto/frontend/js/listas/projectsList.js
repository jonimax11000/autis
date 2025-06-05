import '../components/projectsCard.js';

class ProjectsList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.fetchProjects();
    }

    connectedCallback() {
        this.render();
    }

    async fetchProjects() {
        try {
            const response = await fetch('/proyectos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
            this.renderProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }

    renderProjects(data) {
        const container = this.shadowRoot.getElementById('projects');
        container.innerHTML = '';
        data.forEach(item => {
            const card = document.createElement('project-card');
            card.setAttribute('project-id', item.id);
            card.setAttribute('project-name', item.name);
            container.appendChild(card);
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                #projects {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-top: 20px;
                }
            </style>            
            <div id="projects"></div>
        `;
    }
}

customElements.define('projects-list', ProjectsList);