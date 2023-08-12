import { Table } from "react-bootstrap";
import { CLASS_NAMES } from "../../constants";

const ProgramSquare = ({ programData }) => {
  const { staffPerProgram } = programData;

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>{staffPerProgram.title}</th>
            <th>☕</th>
            <th>🍼</th>
          </tr>
        </thead>
        <tbody>
          {CLASS_NAMES.map((classroom) => (
            <tr key={Math.random()}>
              <td>{staffPerProgram[classroom]["message"]}</td>
              <td>{staffPerProgram[classroom]["numTeachers"]}</td>
              <td>{staffPerProgram[classroom]["numStudents"]}</td>
            </tr>
          ))}
          <tr>
            <td>{staffPerProgram.schoolTotal.message}</td>
            <td colSpan={2}>{staffPerProgram.schoolTotal.numTeachers}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default ProgramSquare;
