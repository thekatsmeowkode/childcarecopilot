import { formatAge, formatDate } from "../utils/formatDates";
import { Fragment, useState } from "react";
import formatProgramName from "../utils/formatText";
import { Table } from "react-bootstrap";
import EditStudentWaitlist from "./waitlistStudentForms/EditStudentWaitlist";

const WaitlistDetails = ({ setWaitlistStudents, waitlistStudents }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleRowClick = (student) => {
    setIsEditModalOpen(true);
    setSelectedStudent(student);
  };

  return (
    <>
      {isEditModalOpen && (
        <EditStudentWaitlist
          student={selectedStudent}
          setWaitlistStudents={setWaitlistStudents}
          isOpen={isEditModalOpen}
          onClose={()=> setIsEditModalOpen(false)}
        />
      )}
      <Table hover variant="dark">
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
            <Fragment key={student._id}>
              <tr onClick={() => handleRowClick(student)}>
                <td>{student.childName}</td>
                <td>{formatDate(student.birthdate)}</td>
                <td>{student.allergies}</td>
                <td>{student.parentName}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>
                  <ul>
                    {student.programs.map((program) => (
                      <li key={program}>{formatProgramName(program)}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  {student.sibling ? (
                    <span
                      role="img"
                      aria-label="check mark"
                      className="react-emojis"
                    >
                      ✔️
                    </span>
                  ) : (
                    <span
                      role="img"
                      aria-label="cross mark"
                      className="react-emojis"
                    >
                      ❌
                    </span>
                  )}
                </td>
                <td>
                  {student.emailed ? (
                    <span
                      role="img"
                      aria-label="check mark"
                      className="react-emojis"
                    >
                      ✔️
                    </span>
                  ) : (
                    <span
                      role="img"
                      aria-label="cross mark"
                      className="react-emojis"
                    >
                      ❌
                    </span>
                  )}
                </td>
                <td>
                  {student.toured ? (
                    <span
                      role="img"
                      aria-label="check mark"
                      className="react-emojis"
                    >
                      ✔️
                    </span>
                  ) : (
                    <span
                      role="img"
                      aria-label="cross mark"
                      className="react-emojis"
                    >
                      ❌
                    </span>
                  )}
                </td>
                <td>
                  {student.registered ? (
                    <span
                      role="img"
                      aria-label="check mark"
                      className="react-emojis"
                    >
                      ✔️
                    </span>
                  ) : (
                    <span
                      role="img"
                      aria-label="cross mark"
                      className="react-emojis"
                    >
                      ❌
                    </span>
                  )}
                </td>
                <td>
                  {student.enrolled ? (
                    <span
                      role="img"
                      aria-label="check mark"
                      className="react-emojis"
                    >
                      ✔️
                    </span>
                  ) : (
                    <span
                      role="img"
                      aria-label="cross mark"
                      className="react-emojis"
                    >
                      ❌
                    </span>
                  )}
                </td>
                <td>
                  {student.declined ? (
                    <span
                      role="img"
                      aria-label="check mark"
                      className="react-emojis"
                    >
                      ✔️
                    </span>
                  ) : (
                    <span
                      role="img"
                      aria-label="cross mark"
                      className="react-emojis"
                    >
                      ❌
                    </span>
                  )}
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </Table>

      {/* {selectedStudent && (
        <EditStudentWaitlist
          student={selectedStudent}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          setWaitlistStudents={setWaitlistStudents}
        />
      )} */}
    </>
  );
};

export default WaitlistDetails;
