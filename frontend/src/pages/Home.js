import { useState, useEffect } from "react";
import { useClassroomContext } from "../hooks/useClassroomContext";

//components
import ClassroomDetails from "../components/ClassroomDetails";
import ClassForm from "../components/ClassForm";
import StudentForm from "../components/StudentForm";
import StudentDetails from "../components/StudentDetails";
import AddStudentModal from "../components/AddStudentModal";
import UniversalModal from "../components/UniversalModal";

const Home = () => {
  const { classrooms, dispatch } = useClassroomContext();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUniversalModalOpen, setIsUniversalModalOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [currentStudent, setCurrentStudent] = useState(null)

  const triggerAddModal = async () => {
    setCurrentStudent(null)
    setIsUniversalModalOpen(true);
  };

  const openEditModal = (student) => {
    setCurrentStudent(student)
    setIsUniversalModalOpen(true)
  }

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
        <div className="button add">
          {/* <button onClick={() => setIsAddModalOpen(true)}>add student</button> */}
          <button
            onClick={() => {
              triggerAddModal();
            }}
          />
          {/* {isAddModalOpen && (
            <AddStudentModal
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
              setSelectedStudents={setSelectedStudents}
            />
          )} */}
          {isUniversalModalOpen && (
            <UniversalModal
              mode={mode}
              isOpen={isUniversalModalOpen}
              onClose={() => setIsUniversalModalOpen(false)}
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
      {isUniversalModalOpen && currentStudent && (
        <UniversalModal
          mode="edit" // Set the mode to "edit" for the edit modal
          student={currentStudent}
          isOpen={isUniversalModalOpen}
          onClose={() => setIsUniversalModalOpen(false)}
          setSelectedStudents={setSelectedStudents}
          setCurrentStudent={setCurrentStudent} // Pass a function to clear the current student when the modal is closed
        />
      )}
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
                  mode={mode}
                  key={student.id}
                  isUniversalModalOpen={isUniversalModalOpen}
                  setIsUniversalModalOpen={setIsUniversalModalOpen}
                  setSelectedStudents={setSelectedStudents}
                  setMode={setMode}
                  student={student}
                  openEditModal={() => openEditModal(student)}
                ></StudentDetails>
              ))}
          </tbody>
        </table>
      </div>
      <ClassForm></ClassForm>
      {/* <StudentForm setSelectedStudents={setSelectedStudents}></StudentForm> */}
    </div>
  );
};

export default Home;
