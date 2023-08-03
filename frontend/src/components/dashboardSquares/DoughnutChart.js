import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Doughnut} from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({revenueData}) => {
    const {revenue: {earlyMorning, extendedDay, lateDay, schoolTotal}} = revenueData
    console.log(earlyMorning)

    const schoolTotalLessPrograms = schoolTotal.value - earlyMorning.value - lateDay.value - extendedDay.value
    const data = {
        labels: [earlyMorning.message, extendedDay.message, lateDay.message, schoolTotal.message],
        datasets: [
            {
                label: "School Revenue",
                data:[earlyMorning.value, extendedDay.value, lateDay.value, schoolTotalLessPrograms],
                backgroundColor: ["#ead4f5", "#bba9c4", "#8c7f93", "#eedcf7"],
                borderColor: ["#463f49", "#463f49", "#463f49", "#463f49"],
                borderWidth: 1
            }
        ]
    }

    return (
        <Doughnut responsive="false" className="doughnut" data={data}/>
    )
}

export default DoughnutChart