
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';


// Register Chart.js modules to make charts work
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Board = () => {

   
    // Pie chart data
    const pieData = {
        labels: ['Expired', 'Pending', 'Completed'],
        datasets: [
            {
                label: 'Enquiry Tracker by Status',
                data: [
                    44,54,33
            ], // Example data for expired, pending, completed
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
    }
        ]
    };

// Bar chart data
const barData = {
    labels: ['Budgetary Offer Submitted', 'PO Received', 'Order Lost'], // X-axis labels
    datasets: [
        {
            label: 'Enquiry Tracker by Stage',
            data: [40, 35, 25], // Example data for each stage
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }
    ]
};

// Chart options (optional)
const options = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

return (
    <div  style={{background:' #9cb0a5'}}>
        <h1>Admin Dashboard</h1>
        <div style={{display: 'flex', justifyContent: 'space-around' }}>

            <div><h2>Enquiry Tracker by Status (Pie Chart)</h2>
                <Pie data={pieData} /></div>

            <div> <h2>Enquiry Tracker by Stage (Bar Chart)</h2>
                <Bar data={barData} options={options} /></div>
        </div>
    </div>
);
};

export default Board;
