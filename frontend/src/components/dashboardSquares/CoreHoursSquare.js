import { Table } from "react-bootstrap";
import { CLASS_NAMES } from "../../constants";

const CoreHoursSquare = ({ coreData }) => {
  const { staffCoreHours } = coreData;

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>{staffCoreHours.title}</th>
            <th>☕</th>
            <th>🍼</th>
          </tr>
        </thead>
        <tbody>
          {CLASS_NAMES.map((classroom) => (
            <tr>
              <td>{staffCoreHours[classroom]["message"]}</td>
              <td>{staffCoreHours[classroom]["numTeachers"]}</td>
              <td>{staffCoreHours[classroom]["numStudents"]}</td>
            </tr>
          ))}
          <tr>
            <td>{staffCoreHours.schoolTotal.message}</td>
            <td colSpan={2}>{staffCoreHours.schoolTotal.numTeachers}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default CoreHoursSquare;
