const ctxBar = document.getElementById('barchart').getContext('2d');

// Gradient for 3D effect
const gradient = ctxBar.createLinearGradient(0, 0, 0, 600);
gradient.addColorStop(0, '#f492f4');
gradient.addColorStop(1, '#252525');

const barchart = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['A', 'B', 'C', 'D', 'E1', 'E2', 'F1' ,'F2', 'H1', 'H2'],
        datasets: [{
            label: 'Scores',
            data: [20, 19, 30, 25, 22, 30, 29, 56, 40 , 30],
            backgroundColor: gradient,
            borderColor: '#f492f4',
            borderWidth: 2,
            borderRadius: 10,
            hoverBorderWidth: 3,
            hoverBorderColor: '#fff',
        }]
    },
    options: {
        plugins: {
            datalabels: {
                color: '#ffffff',
                anchor: 'end',
                align: 'end',
                offset: -10,
                font: {
                    size: 14,
                    weight: 'bold'
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#f492f4'
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: '#444444'
                },
                ticks: {
                    color: '#f492f4'
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
    },
    plugins: [ChartDataLabels]
});
