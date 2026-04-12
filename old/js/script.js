// Iniciar Iconos
lucide.createIcons();

// Inicialización de Gráfico con ajustes para móvil
const ctx = document.getElementById('mainProgressChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Plan', 'FDD', 'ATP', 'UAT', 'Prod'],
        datasets: [{
            label: 'Progreso (%)',
            data: [100, 95, 0, 0, 0],
            backgroundColor: [
                'rgba(34, 197, 94, 0.7)',
                'rgba(59, 130, 246, 0.7)',
                'rgba(241, 245, 249, 1)',
                'rgba(241, 245, 249, 1)',
                'rgba(241, 245, 249, 1)'
            ],
            borderColor: ['#22c55e', '#3b82f6', '#e2e8f0', '#e2e8f0', '#e2e8f0'],
            borderWidth: 1,
            borderRadius: 5,
            barThickness: window.innerWidth < 768 ? 12 : 24
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { max: 100, beginAtZero: true, grid: { display: false }, ticks: { font: { size: 9 } } },
            y: { grid: { display: false }, ticks: { font: { size: 10, weight: 'bold' } } }
        },
        plugins: {
            legend: { display: false }
        }
    }
});