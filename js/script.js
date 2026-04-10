// Iniciar Lucide
lucide.createIcons();

// Chart.js - Configuración del Gráfico Principal
const ctx = document.getElementById('mainProgressChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Plan Proyecto', 'FDD Documento', 'ATP Casos Uso', 'Pruebas UAT', 'Implementación'],
        datasets: [{
            label: 'Progreso (%)',
            data: [100, 95, 0, 0, 0],
            backgroundColor: [
                'rgba(34, 197, 94, 0.8)',
                'rgba(59, 130, 246, 0.8)',
                'rgba(241, 245, 249, 1)',
                'rgba(241, 245, 249, 1)',
                'rgba(241, 245, 249, 1)'
            ],
            borderColor: [
                '#22c55e',
                '#3b82f6',
                '#e2e8f0',
                '#e2e8f0',
                '#e2e8f0'
            ],
            borderWidth: 2,
            borderRadius: 12,
            barThickness: 30
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                max: 100,
                beginAtZero: true,
                grid: { display: false },
                ticks: { font: { size: 10, weight: 'bold' } }
            },
            y: {
                grid: { display: false },
                ticks: { font: { size: 11, weight: '600' } }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 10,
                bodyFont: { size: 12, weight: 'bold' }
            }
        }
    }
});