export const getClassroomId = async (student) => {

const allClassroomsResponse = await fetch("/api/classes/", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const classroomJson = await allClassroomsResponse.json();

  const classroom = classroomJson.find(
    (classroom) => classroom.roomName === student.classroomName
  );
  const classroomId = classroom._id.toString();

  if (!classroomId) {
    console.log("Classroom not found");
    return;
  }

  return classroomId
}