import '../listas/TimeEntriesList.js';  // Tu importación existente

class MiembroCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
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
                    <div class="chart-text">10h</div> <!-- Texto en el centro -->
                </div>
                <div class="user-text">USUARIOS</div>
            </div>`;

        // Verifica si Chart.js está disponible (cargado desde CDN)
        if (window.Chart) {
            const ctx = this.shadowRoot.getElementById('hoursChart').getContext('2d');
            new window.Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Horas hechas', 'Horas por hacer'],
                    datasets: [{
                        data: [10, 38],  // Valores de ejemplo
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