import { useState, useEffect } from "react";
import { useClassroomContext } from "../hooks/useClassroomContext";
import UniversalButton from "../components/UniversalButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UniversalModal from "../components/UniversalModal";
import AddStudentForm from "../components/studentForms/AddStudentForm";

//components
import ClassroomDetails from "../components/ClassroomDetails";
import StudentDetails from "../components/StudentDetails";
import { fetchData } from "../hooks/useApi";

const Home = () => {
  const { classrooms, dispatch } = useClassroomContext();
  const [selectedClassName, setSelectedClassName] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchClass = async () => {
      //in production this needs to be changed to correct endpoint
      const response = await fetchData("api/classes", "GET");
      dispatch({ type: "SET_CLASSROOMS", payload: response });
    };

    fetchClass();
  }, [dispatch]);

  //displays selected class
  const handleButtonClick = async (e) => {
    const classroomName = e.target.textContent;
    setSelectedClassName(classroomName);
  };

  return (
    <div className="home">
      <div className="classrooms">
        <UniversalButton
          variant="contained"
          eventHandler={() => setIsAddModalOpen(true)}
          icon={<PersonAddIcon />}
          customStyles={{
            margin: ".7rem",
            backgroundColor: "var(--bright-peach)",
            "&:hover": { backgroundColor: "var(--darkest-peach)" },
          }}
          buttonText="Add student"
        />
        {isAddModalOpen && (
          <UniversalModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            formComponent={<AddStudentForm />}
            modalTitle="Add Student"
          />
        )}
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
        <h3>
          {selectedClassName
            ? selectedClassName
            : "Select a class name to see students"}
        </h3>
        {selectedClassName && (
          <StudentDetails selectedClassName={selectedClassName} />
        )}
      </div>
    </div>
  );
};

export default Home;
