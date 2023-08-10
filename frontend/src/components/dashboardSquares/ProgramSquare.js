import { Table } from "react-bootstrap";

const ProgramSquare = ({ programData }) => {
  const {
    staffPerProgram: { infants, crawlers, toddlers, twos, schoolTotal, title },
  } = programData;
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>{title}</th>
            <th>☕</th>
            <th>🍼</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{infants.message}</td>
            <td>{infants.numTeachers}</td>
            <td>{infants.numStudents}</td>
          </tr>
          <tr>
            <td>{crawlers.message}</td>
            <td>{crawlers.numTeachers}</td>
            <td>{crawlers.numStudents}</td>
          </tr>
          <tr>
            <td>{toddlers.message}</td>
            <td>{toddlers.numTeachers}</td>
            <td>{toddlers.numStudents}</td>
          </tr>
          <tr>
            <td>{twos.message}</td>
            <td>{twos.numTeachers}</td>
            <td>{twos.numStudents}</td>
          </tr>
          <tr>
            <td>{schoolTotal.message}</td>
            <td colSpan={2}>{schoolTotal.numTeachers}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default ProgramSquare;
