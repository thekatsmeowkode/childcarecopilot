import { Table } from "react-bootstrap";
import { PROGRAM_NAMES } from "../../constants";

const RevenueSquare = ({ revenueData }) => {
  const { revenue } = revenueData;

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th colSpan={2}>{revenue.title}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{revenue.schoolTotal.message}</td>
            <td>{revenue.schoolTotal.value}</td>
          </tr>
          {PROGRAM_NAMES.map((program) => (
            <tr>
              <td>{revenue[program]["message"]}</td>
              <td>{revenue[program]["value"]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default RevenueSquare;
