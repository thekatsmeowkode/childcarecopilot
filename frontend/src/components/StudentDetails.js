import { useContext, useState } from "react";
import { ClassroomContext } from "../context/ClassroomContext";
import EditStudentModal from "./EditStudentModal";
import { formatAge, formatDate } from "../utils/formatDates";
import formatProgramName from "../utils/formatText";
import { getClassroomId } from "../utils/getClassroomId";
import { fetchData } from "../api/useApi";

const StudentDetails = ({ student, setSelectedStudents }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { dispatch } = useContext(ClassroomContext);

  const handleEditClick = () => {
    //formats a date object into a string representation to pre-populate edit form
    student.birthdate = formatDate(student.birthdate);
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (student) => {

    const {classroomName} = student

    const response = await fetchData(
      "/api/classes/" + classroomName + "/students/" + 
      student._id.toString(),
      "DELETE"
    );

    setSelectedStudents(response.students);

    const updatedAllClassroomsResponse = await fetchData("/api/classes/", "GET");

    dispatch({ type: "DELETE_STUDENT", payload: updatedAllClassroomsResponse });
  };

  return (
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
            onClick={handleEditClick}
            className="material-symbols-outlined"
          >
            Edit
          </button>
        </td>
        <td>
          <button
            onClick={() => handleDeleteClick(student)}
            className="material-symbols-outlined"
          >
            Delete
          </button>
        </td>
      </tr>

      {selectedStudent && (
        <EditStudentModal
          student={selectedStudent}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          setSelectedStudent={setSelectedStudent}
          setSelectedStudents={setSelectedStudents}
        />
      )}
    </>
  );
};

export default StudentDetails;
