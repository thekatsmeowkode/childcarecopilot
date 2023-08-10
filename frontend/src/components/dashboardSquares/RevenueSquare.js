import { Table } from "react-bootstrap";

const RevenueSquare = ({ revenueData }) => {
  const {
    revenue: { title, earlyMorning, extendedDay, lateDay, schoolTotal },
  } = revenueData;
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th colSpan={2}>{title}</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </Table>
    </>
  );
};

export default RevenueSquare;
