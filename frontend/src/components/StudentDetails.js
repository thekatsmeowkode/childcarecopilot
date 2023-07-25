import { useState } from "react";

const StudentDetails = ({ student }) => {
  const handleEditClick = async (studentId, classroomName) => {
    const allClassroomsResponse = await fetch("/api/classes/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const classroomJson = await allClassroomsResponse.json();
    const classroom = classroomJson.find(
      (classroom) => classroom.roomName === classroomName
    );
    const classroomId = classroom._id.toString();

    if (!classroomId) {
      console.log("Classroom not found");
      return;
    }

    const getOneClassroomResponse = await fetch("/api/classes/" + classroomId, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const oneClassJson = await getOneClassroomResponse.json();

    if (!oneClassJson) {
      console.log("One class not found");
      return;
    }

    const targetStudent = oneClassJson.students.find(
      (allStudents) => allStudents.id === studentId
    );
    return targetStudent;
  };

  return (
    <div className="student-details">
      <p>{student.name}</p>
      <p>{student.birthdate}</p>
      <p>{student.classRoomName}</p>
      <p>{student.allergies}</p>
      <button
        onClick={() => handleEditClick(student.id, student.classroomName)}
        class="material-symbols-outlined"
      >
        Edit
      </button>
    </div>
  );
};

export default StudentDetails;
