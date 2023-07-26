import { useContext, useState } from "react";
import { ClassroomContext } from '../context/ClassroomContext'
import EditStudentModal from './EditStudentModal'

const StudentDetails = ({ student }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const {dispatch} = useContext(ClassroomContext)

  const handleEditClick = async (studentId, classroomName) => {
    setSelectedStudent(student)
    setIsModalOpen(true);
  }

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
    <div className="student-details">
      <p>{student.name}</p>
      <p>{student.id}</p>
      <p>{student.classroomName}</p>
      <p>{student.allergies}</p>
      <button
        onClick={() => handleEditClick(student.id, student.classroomName)}
        className="material-symbols-outlined"
      >
        Edit
      </button>
      {selectedStudent && (
        <EditStudentModal
          student={selectedStudent}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          setSelectedStudent={setSelectedStudent}
        />
      )}
    </div>
  );
};

export default StudentDetails;
