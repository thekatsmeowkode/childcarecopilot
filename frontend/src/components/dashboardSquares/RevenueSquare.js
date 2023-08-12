import { Table } from "react-bootstrap";
import { PROGRAM_NAMES } from "../../constants";
import { formatAmountInDollars } from "../../utils/formatText";

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
            <td>{formatAmountInDollars(revenue.schoolTotal.value)}</td>
          </tr>
          {PROGRAM_NAMES.map((program) => (
            <tr key={program}>
              <td>{revenue[program]["message"]}</td>
              <td>{formatAmountInDollars(revenue[program]["value"])}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default RevenueSquare;
