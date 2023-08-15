import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Doughnut} from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({foodData}) => {

    const {milk, vegFruit, protein, grains} = foodData

    const chartOptions = {
        maintainAspectRatio: false, 
        responsive: true,
        width: 50, 
        height: 50, 
        plugins: {
            legend: {
              labels: {
                fontSize: 10, // Adjust the font size of legend labels
              },
              position: 'bottom', // You can adjust the legend position if needed
              boxWidth: 10, // Adjust the width of the legend color boxes
            },
          },
      };

    const data = {
        labels: [milk.label, vegFruit.label, protein.label, grains.label],
        datasets: [
            {
                label: "Ounces required",
                data:[milk.value, vegFruit.value, protein.value, grains.value, ],
                backgroundColor: ["#f7b09e", "#347e91", "#ea3f12", '#57d2f2'],
                borderColor: ["#793b2b"],
                borderWidth: 1
            }
        ]
    }

    return (
        <Doughnut options={chartOptions} data={data}/>
    )
}

export default DoughnutChart