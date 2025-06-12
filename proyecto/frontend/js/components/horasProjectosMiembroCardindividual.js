// Importem el component de base
class HorasProjMiembroindividual extends HTMLElement {
    constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.colors = [
      '#2E5D9E',
      '#4A8F29',
      '#D45D00',
      '#5E3C99',
      '#A32B2B',
      '#2B7A8C',
      '#6D4C41',
      '#3A5169'
    ];

    this.proyectos = [];
    this.horas = [];
    this.usuario = null;
  }

  async connectedCallback() {
    this.usuario = this.getAttribute('idGrupo') || null;
    await this.fetchProyectos();
    await this.fetchHoras();
    this.render();
  }


  async fetchProyectos() {
    try {
      const response = await fetch('/group/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: this.usuario })
      });
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      this.proyectos = data.proyectos || [];
    } catch (error) {
      console.error("Error fetching projects:", error);
      this.proyectos = [];
    }
  }

  async fetchHoras() {
    this.datos = [];

    for (const proyecto of this.proyectos) {
      const proyectoData = {
        nombre: proyecto.nombre,
        horas: 0
      };

      try {
        const response = await fetch('/horas/usuario/proyecto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idUser: this.usuario,
            idProyecto: proyecto.id,
            fecha1: this.getAttribute('fecha1') || new Date().toISOString().slice(0, 10),
            fecha2: this.getAttribute('fecha2') || new Date().toISOString().slice(0, 10)
          })
        });

        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        proyectoData.horas = data.horas || 0;
      } catch (error) {
        console.error(`Error fetching hours for project ${proyecto.id}:`, error);
        proyectoData.horas = 0; // Set to 0 if there's an error
      }
      
      this.datos.push(proyectoData);
    }
  }

  render() {
    if (this.datos.length === 0) {
      this.shadowRoot.innerHTML = '<div style="padding:20px;text-align:center">No hay datos disponibles</div>';
      return;
    }

    // Calcular la altura máxima usando las horas
    const maxHoras = this.datos.length ? Math.max(...this.datos.map(proyecto => proyecto.horas)) : 1;

    const html = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
          --border-color: #000000;
          --text-primary: #333333;
          --text-secondary: #666666;
          --background: #ffffff;
          --accent-color: #2E5D9E;
        }
        
        .dashboard {
          width: 100%;
          height: 100%;
          padding: 24px;
          box-sizing: border-box;
          background: var(--background);
          display: flex;
          flex-direction: column;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 16px;
        }
        
        .title {
          font-size: 18px;
          font-weight: 500;
          color: var(--text-primary);
        }
        
        .chart-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        
        .chart-container {
          flex: 1;
          display: flex;
          gap: 32px;
          align-items: flex-end;
          padding-bottom: 40px;
          position: relative;
          min-height: 300px;
          border-bottom: 1px solid var(--border-color);
        }
        
        .project {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
        }
        
        .bar-container {
          width: 100%;
          height: 300px;
          display: flex;
          flex-direction: column-reverse;
          position: relative;
          border: 1px solid #000000;
          border-radius: 4px;
        }
        
        .segment {
          width: 100%;
          transition: height 0.3s ease;
          border-radius: 2px 2px 0 0;
          opacity: 0.95;
          border: 1px solid var(--border-color);
        }
        
        .segment:hover {
          opacity: 1;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .project-name {
          margin-top: 12px;
          font-weight: 400;
          color: var(--text-primary);
          text-align: center;
          font-size: 13px;
        }
        
        .legend-container {
          margin-top: 24px;
        }
        
        .legend-title {
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }
        
        .legend {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-primary);
        }
        
        .legend-color {
          width: 14px;
          height: 14px;
          border-radius: 2px;
        }
        
        .tooltip {
          position: absolute;
          background: var(--background);
          padding: 8px 12px;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s;
          z-index: 100;
          font-size: 13px;
          border: 1px solid var(--border-color);
          max-width: 200px;
        }
        
        .tooltip-title {
          font-weight: 500;
          margin-bottom: 4px;
          color: var(--accent-color);
        }
        
        .tooltip-content {
          color: var(--text-secondary);
          line-height: 1.4;
        }
      </style>
      
      <div class="dashboard">
        <div class="header">
          <div class="title">Distribución de Horas por Proyecto</div>
        </div>
        
        <div class="chart-area">
          <div class="chart-container">
            ${this.datos.map((proyecto, i) => `
              <div class="project">
                <div class="bar-container">
                  <div class="segment" 
                      style="height: ${(proyecto.horas / maxHoras) * 300}px; 
                              background: ${this.colors[i % this.colors.length]};"
                      data-tooltip="<div class='tooltip-title'>${proyecto.nombre}</div>
                                    <div class='tooltip-content'>
                                      ${proyecto.horas} horas
                                    </div>">
                  </div>
                </div>
                <div class="project-name">${proyecto.nombre}</div>
              </div>
            `).join('')}
          </div>
          
          <div class="legend-container">
            <div class="legend-title">Leyenda:</div>
            <div class="legend">
              ${this.datos.map((proyecto, i) => `
                <div class="legend-item">
                  <div class="legend-color" style="background: ${this.colors[i % this.colors.length]}"></div>
                  <span>${proyecto.nombre}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        
        <div class="tooltip" id="tooltip"></div>
      </div>
    `;

    this.shadowRoot.innerHTML = html;
    this.setupTooltips();
  }

  get personas() {
    const unique = [];
    const map = new Map();

    this.horas.forEach(proyecto => {
      proyecto.personas.forEach(persona => {
        if (!map.has(persona.nombre)) {
          map.set(persona.nombre, true);
          unique.push(persona);
        }
      });
    });

    return unique;
  }

  setupTooltips() {
    const tooltip = this.shadowRoot.getElementById('tooltip');
    const segments = this.shadowRoot.querySelectorAll('.segment');

    segments.forEach(segment => {
      segment.addEventListener('mouseenter', (e) => {
        tooltip.innerHTML = segment.dataset.tooltip;
        tooltip.style.opacity = '1';
        tooltip.style.left = `${e.pageX + 15}px`;
        tooltip.style.top = `${e.pageY + 15}px`;
      });

      segment.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
      });

      segment.addEventListener('mousemove', (e) => {
        tooltip.style.left = `${e.pageX + 15}px`;
        tooltip.style.top = `${e.pageY + 15}px`;
      });
    });
  }
}
customElements.define('horprojmiem-card-individual', HorasProjMiembroindividual);