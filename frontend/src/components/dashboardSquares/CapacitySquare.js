import { Table } from "react-bootstrap";
const CapacitySquare = ({ capacityData }) => {
  return (
    <>
      <Table>
        <thead>
          <th>{capacityData.title}</th>
        </thead>
        <tr>
          <td>{capacityData.totalStudents}</td>
        </tr>
      </Table>
    </>
  );
};

export default CapacitySquare;
