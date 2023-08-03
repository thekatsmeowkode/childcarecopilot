import {Table} from "react-bootstrap"

const RevenueSquare = ({revenueData}) => {
    const {revenue: {title, earlyMorning, extendedDay, lateDay, schoolTotal}} = revenueData
    return (
          <>
            <Table>
              <thead>
                <th colSpan={2}>{title}</th>
              </thead>
              <tr>
                <td>{schoolTotal.message}</td>
                <td>{schoolTotal.value}</td>
              </tr>
              <tr>
                <td>{earlyMorning.message}</td>
                <td>{earlyMorning.value}</td>
              </tr>
              <tr>
                <td>{extendedDay.message}</td>
                <td>{extendedDay.value}</td>
              </tr>
              <tr>
                <td>{lateDay.message}</td>
                <td>{lateDay.value}</td>
              </tr>
            </Table>
          </>
        )
}

export default RevenueSquare