import { useState, useEffect } from "react";
import { useClassroomContext } from "../hooks/useClassroomContext";

//components
import ClassroomDetails from "../components/ClassroomDetails";
import StudentDetails from "../components/StudentDetails";
import AddStudentModal from "../components/AddStudentModal";
import { fetchData } from "../api/useApi";

const Home = () => {
  const { classrooms, dispatch } = useClassroomContext();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedClassName, setSelectedClassName] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
    const classroomName = e.target.textContent;

    const oneClassroomResponse = await fetchData(
      "/api/classes/" + classroomName,
      "GET"
    );

    setSelectedClassName(classroomName);
    setSelectedStudents([...oneClassroomResponse.students]);
  };

  return (
    <div className="home">
      <div className="classrooms">
        <div className="button add">
          <button onClick={() => setIsAddModalOpen(true)}>add student</button>
          {isAddModalOpen && (
            <AddStudentModal
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
              setSelectedStudents={setSelectedStudents}
            />
          )}
        </div>
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
        <h3>{selectedClassName}</h3>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Birthdate</th>
              <th>Programs</th>
              <th>Allergies</th>
              <th>Classroom</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {selectedStudents &&
              selectedStudents.map((student) => (
                <StudentDetails
                  key={student._id}
                  setSelectedStudents={setSelectedStudents}
                  student={student}
                ></StudentDetails>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
