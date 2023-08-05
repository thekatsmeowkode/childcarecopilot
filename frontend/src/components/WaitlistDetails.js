import { formatAge, formatDate } from "../utils/formatDates";
import formatProgramName from "../utils/formatText";
import { Table } from "react-bootstrap";

const WaitlistDetails = ({ waitlistStudents }) => {
  return (
    <>
      <Table variant="dark">
        <thead>
          <tr>
            <th>Child's Name</th>
            <th>Birthdate</th>
            <th>Allergies</th>
            <th>Parent's Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Programs</th>
            <th>Sibling?</th>
            <th>Emailed</th>
            <th>Toured</th>
            <th>Registered</th>
            <th>Enrolled</th>
            <th>Declined</th>
          </tr>
        </thead>
        <tbody>
          {waitlistStudents.map((student) => (
            <tr>
              <td>{student.childName}</td>
              <td>{formatDate(student.birthdate)}</td>
              <td>{student.allergies}</td>
              <td>{student.parentName}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>
                <ul>
                  {student.programs.map((program) => (
                    <li>{formatProgramName(program)}</li>
                  ))}
                </ul>
              </td>
              <td>
                {student.sibling ? (
                  <span role="img" aria-label="check mark" class="react-emojis">
                    ✔️
                  </span>
                ) : (
                  <span role="img" aria-label="cross mark" class="react-emojis">
                    ❌
                  </span>
                )}
              </td>
              <td>
                {student.emailed ? (
                  <span role="img" aria-label="check mark" class="react-emojis">
                    ✔️
                  </span>
                ) : (
                  <span role="img" aria-label="cross mark" class="react-emojis">
                    ❌
                  </span>
                )}
              </td>
              <td>
                {student.toured ? (
                  <span role="img" aria-label="check mark" class="react-emojis">
                    ✔️
                  </span>
                ) : (
                  <span role="img" aria-label="cross mark" class="react-emojis">
                    ❌
                  </span>
                )}
              </td>
              <td>
                {student.registered ? (
                  <span role="img" aria-label="check mark" class="react-emojis">
                    ✔️
                  </span>
                ) : (
                  <span role="img" aria-label="cross mark" class="react-emojis">
                    ❌
                  </span>
                )}
              </td>
              <td>
                {student.enrolled ? (
                  <span role="img" aria-label="check mark" class="react-emojis">
                    ✔️
                  </span>
                ) : (
                  <span role="img" aria-label="cross mark" class="react-emojis">
                    ❌
                  </span>
                )}
              </td>
              <td>
                {student.declined ? (
                  <span role="img" aria-label="check mark" class="react-emojis">
                    ✔️
                  </span>
                ) : (
                  <span role="img" aria-label="cross mark" class="react-emojis">
                    ❌
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* 
      {selectedStudent && (
        <EditStudentModal
          student={selectedStudent}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          setSelectedStudent={setSelectedStudent}
          setSelectedStudents={setSelectedStudents}
        />
      )} */}
    </>
  );
};

export default WaitlistDetails;
