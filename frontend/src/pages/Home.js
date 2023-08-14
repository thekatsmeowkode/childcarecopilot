import { useState, useEffect } from "react";
import { useClassroomContext } from "../hooks/useClassroomContext";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import UniversalButton from "../components/UniversalButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

//components
import ClassroomDetails from "../components/ClassroomDetails";
import StudentDetails from "../components/StudentDetails";
import AddStudentModal from "../components/studentForms/AddStudentModal";
import { fetchData } from "../hooks/useApi";

const Home = () => {
  const { classrooms, dispatch } = useClassroomContext();
  const [selectedClassName, setSelectedClassName] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchClass = async () => {
      //in production this needs to be changed to correct endpoint
      const response = await fetchData("/api/classes", "GET");
      dispatch({ type: "SET_CLASSROOMS", payload: response });
    };

    fetchClass();
  }, [dispatch]);

  //displays selected class
  const handleButtonClick = async (e) => {
    const classroomName = e.target.textContent
    setSelectedClassName(classroomName);
  };

  return (
    <div className="home">
      <div className="classrooms">
        <div className="button add">
          <UniversalButton
            variant="contained"
            eventHandler={() => setIsAddModalOpen(true)}
            icon={<PersonAddIcon />}
            customStyles={{
              backgroundColor: "#bd5e45",
              "&:hover": { backgroundColor: "#f27757" },
            }}
            buttonText="Add student"
          ></UniversalButton>
          {isAddModalOpen && (
            <AddStudentModal
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
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
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Birthdate</TableCell>
                <TableCell>Programs</TableCell>
                <TableCell>Allergies</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedClassName &&
                classrooms.map((classroom) =>
                  classroom.roomName === selectedClassName
                    ? classroom.students.map((student) => (
                        <StudentDetails key={student._id} student={student} />
                      ))
                    : null
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Home;
