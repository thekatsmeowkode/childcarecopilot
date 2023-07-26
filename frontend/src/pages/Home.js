import { useState, useEffect } from "react";
import { useClassroomContext } from "../hooks/useClassroomContext";

//components
import ClassroomDetails from "../components/ClassroomDetails";
import ClassForm from "../components/ClassForm";
import StudentForm from "../components/StudentForm";
import StudentDetails from "../components/StudentDetails";
import EditStudentForm from "../components/EditStudentModal";
import EditStudentModal from "../components/EditStudentModal";

const Home = () => {
  const { classrooms, dispatch } = useClassroomContext();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const fetchClass = async () => {
      //in production this needs to be changed to correct endpoint
      const response = await fetch("/api/classes");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CLASSROOMS", payload: json });
      }
    };

    fetchClass();
  }, [dispatch]);

  //displays selected class
  const handleButtonClick = async (e) => {
    const allClassroomsResponse = await fetch("/api/classes/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const classroomJson = await allClassroomsResponse.json();
    const classroom = classroomJson.find(
      (classroom) => classroom.roomName === e.target.textContent
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
    setSelectedStudents([...oneClassJson.students]);
    console.log(selectedStudents);
  };


  return (
    <div className="home">
      <div className="classrooms">
        {classrooms &&
          classrooms.map((classroom) => (
            <ClassroomDetails
              key={classroom._id}
              handleButtonClick={handleButtonClick}
              classroom={classroom}
            />
          ))}
      </div>
      <div className="students-grid">
        {selectedStudents &&
          selectedStudents.map((student) => (
            <StudentDetails student={student}></StudentDetails>
          ))}
      </div>
      <ClassForm></ClassForm>
      <StudentForm setSelectedStudents={setSelectedStudents}></StudentForm>
    </div>
  );
};

export default Home;
