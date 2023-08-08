import { Table } from "react-bootstrap";
import {
  formatDate,
  formatAge,
  monthsToYearsAndMonths,
} from "../../utils/formatDates";

const StudentOlderTable = ({ students }) => {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Student Birthdate</th>
            <th>Current Age</th>
            <th>Student Name</th>
            <th>Current Classroom</th>
            <th>Age on Selected Date </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.name}>
              <td>{formatDate(student.birthdate)}</td>
              <td>{formatAge(student.birthdate)}</td>
              <td>{student.name}</td>
              <td>{student.classroomName}</td>
              <td>{monthsToYearsAndMonths(student.futureAgeInMonths)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default StudentOlderTable;
