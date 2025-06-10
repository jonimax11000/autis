import '../listas/TimeEntriesList.js';

class MiembroCard extends HTMLElement {
    constructor() {
        super();
        this.horas = 0; // Horas imputadas
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        this.idUsuario = this.getAttribute('idUsuario') || null;
        this.idGrupo = this.getAttribute('idGrupo') || null;
        this.nombre = this.getAttribute('nombre') || 'Usuario Desconocido';
        this.horasACumplir = parseInt(this.getAttribute('horas')) || 8; // Horas a cumplir por día
        await this.fetchHoras();
        this.render();
    }

    async fetchHoras() {
        try {
            const response = await fetch('/horas/miembro', {
            method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({idUser:this.idUsuario,
                        idGroup:this.idGrupo,
                        fecha1:'2021-01-01',
                        fecha2:'2026-01-01'})
            });
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
            this.horas = data.horas || 0; // Horas imputadas
            console.log("Horas imputadas:", this.horas);
        }
        catch (error) {
            console.error("Error fetching hours:", error);
        }
    }

    render() {
        const horasRestantes = (this.horas - this.horasACumplir).toFixed(2);
        this.shadowRoot.innerHTML = `
            <style>
            .card {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                background-color: #fff;
                width: 150px;
                height: 150px;
            }
            .chart-container {
                position: relative;
                width: 120px;
                height: 120px;
            }
            .chart-text {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 16px;
                font-weight: bold;
                color: #000;
            }
            .user-text {
                margin-top: 10px;
                text-align: center;
            }
            </style>
            <div class="card">
            <div class="chart-container">
                <canvas id="hoursChart"></canvas>
                <div class="chart-text">${horasRestantes}h</div> <!-- Texto en el centro -->
            </div>
            <div class="user-text">${this.nombre}</div>
            </div>`;

        // Verifica si Chart.js está disponible (cargado desde CDN)
        if (window.Chart) {
            const ctx = this.shadowRoot.getElementById('hoursChart').getContext('2d');
            new window.Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Horas hechas', 'Horas por hacer'],
                    datasets: [{
                        data: [this.horas, this.horasACumplir-this.horas],  // Valores de ejemplo
                        backgroundColor: ['#4CAF50', '#F44336'],  // Verde y rojo
                        borderColor: ['#000', '#000'],  // Borde negro
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',  // Grosor del gráfico
                    plugins: {
                        legend: {
                            display: false  // Oculta la leyenda
                        }
                    }
                }
            });
        } else {
            console.error("Chart.js no está cargado. Asegúrate de incluir el CDN.");
        }
    }
}

customElements.define('miembro-card', MiembroCard);