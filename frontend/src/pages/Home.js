import { useState, useEffect } from "react";
import { useClassroomContext } from "../hooks/useClassroomContext";

//components
import ClassroomDetails from "../components/ClassroomDetails";
import ClassForm from "../components/ClassForm";
import StudentForm from "../components/StudentForm";
import StudentDetails from '../components/StudentDetails'

const Home = () => {
  const { classrooms, dispatch } = useClassroomContext();
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedStudents, setSelectedStudents] = useState([])

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

  const handleButtonClick = async (e) => {
    console.log(e.target.textContent)
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

    const getOneClassroomResponse = await fetch('/api/classes/' + classroomId, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })

    const oneClassJson = await getOneClassroomResponse.json()

    if (!oneClassJson) {
        console.log('One class not found')
        return
    }
    setSelectedStudents([...oneClassJson.students])
    console.log(selectedStudents)
  }

  return (
    <div className="home">
        
      <div className="classrooms">
      {/* <select name="selectClass" value={selectedClass} onChange={handleClassChange}>
        <option value=""></option>
        <option value="infants">Infants</option>
        <option value="crawlers">Crawlers</option>
        <option value="toddlers">Toddlers</option>
        <option value="twos">Twos</option>
      </select> */}
        {classrooms &&
          classrooms.map((classroom) => (
            <ClassroomDetails key={classroom._id} handleButtonClick={handleButtonClick} classroom={classroom} />
          ))}
      </div>
      <div className="students-grid">
            {selectedStudents && selectedStudents.map((student) => (<StudentDetails student={student}></StudentDetails>))}
      </div>
      <ClassForm></ClassForm>
      <StudentForm></StudentForm>
    </div>
  );
};

export default Home;
