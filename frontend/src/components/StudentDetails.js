import { useContext, useState } from "react";
import { ClassroomContext } from "../context/ClassroomContext";
import EditStudentModal from "./EditStudentModal";

const StudentDetails = ({ student, setSelectedStudents }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { dispatch } = useContext(ClassroomContext);

  const handleEditClick = () => {
    //formats a date object into a string representation to pre-populate edit form
    function formatDate(date) {
      date = new Date(student.birthdate);
      return date.toISOString().substring(0, 10);
    }

    student.birthdate = formatDate(student.birthdate);
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (studentId, classroomName) => {
    const allClassroomsResponse = await fetch("/api/classes/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const classroomJson = await allClassroomsResponse.json();

    const targetClassroom = classroomJson.find(
      (classroom) => classroom.roomName === classroomName
    );

    const classroomId = targetClassroom._id.toString();

    if (!classroomId) {
      console.log("Classroom not found");
      return;
    }

    const response = await fetch(
      "/api/classes/" + classroomId + "/students/" + studentId.toString(),
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      console.log("bad response in Delete route");
    }

    setSelectedStudents(json.students);

    const updatedAllClassroomsResponse = await fetch("/api/classes/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const updatedJson = await updatedAllClassroomsResponse.json();

    if (updatedAllClassroomsResponse.ok) {
      dispatch({ type: "DELETE_STUDENT", payload: updatedJson }); // await dispatch({type:"UPDATE_STUDENT", payload:classroomWithUpdatedStudentInside})
    }
  };

  const formatProgramName = (program) => {
    switch (program) {
      case "earlyMorning":
        return "Early Morning";
      case "extendedDay":
        return "Extended Day";
      case "lateDay":
        return "Late Day";
      default:
        return;
    }
  };

  //     const allClassroomsResponse = await fetch("/api/classes/", {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     const classroomJson = await allClassroomsResponse.json();
  //     const classroom = classroomJson.find(
  //       (classroom) => classroom.roomName === classroomName
  //     );
  //     const classroomId = classroom._id.toString();

  //     if (!classroomId) {
  //       console.log("Classroom not found");
  //       return;
  //     }

  //     const getOneClassroomResponse = await fetch("/api/classes/" + classroomId, {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     const oneClassJson = await getOneClassroomResponse.json();

  //     if (!oneClassJson) {
  //       console.log("One class not found");
  //       return;
  //     }

  //     const targetStudent = oneClassJson.students.find(
  //       (allStudents) => allStudents.id === studentId
  //     );
  //     setSelectedStudent(targetStudent);
  //     return targetStudent;
  //   };

  return (
    <>
      <tr>
        <td>{student.name}</td>
        <td>{student.birthdate}</td>
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
            onClick={() => handleDeleteClick(student.id, student.classroomName)}
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
