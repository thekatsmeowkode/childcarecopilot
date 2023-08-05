import {formatAge, formatDate} from '../utils/formatDates'
import formatProgramName from '../utils/formatText'

const WaitlistDetails = ({student}) => {
    <>
      <tr>
        <td>{student.name}</td>
        <td>
          <ul>
            <li>{formatDate(student.birthdate)}</li>
            <li>{formatAge(student.birthdate)}</li>
          </ul>
        </td>
        <td>
          <ol>
            {student.programs.map((program) => (
              <li>{formatProgramName(program)}</li>
            ))}
          </ol>
        </td>
        <td>{student.allergies}</td>
        <td>{student.classroomName}</td>
        <td>
          <button
            className="material-symbols-outlined"
          >
            Edit
          </button>
        </td>
        <td>
          <button
            className="material-symbols-outlined"
          >
            Delete
          </button>
        </td>
      </tr>
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
}