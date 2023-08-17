import { useContext, useState } from "react";
import { ClassroomContext } from "../context/ClassroomContext";
import EditStudentForm from "./studentForms/EditStudentForm";
import { formatAge, formatDate } from "../utils/formatDates";
import { formatProgramName } from "../utils/formatText";
import { fetchData } from "../hooks/useApi";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { PROGRAM_NAMES } from "../constants";
import UniversalModal from "./UniversalModal";

const StudentDetails = ({ selectedClassName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { classrooms, dispatch } = useContext(ClassroomContext);

  const handleEditClick = (e, student) => {
    //formats a date object into a string representation to pre-populate edit form
    if (e.target.className.includes("delete")) {
      e.stopPropagation()
      return;
    }
    student.birthdate = formatDate(student.birthdate);
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (e, student) => {
    const { classroomName } = student;
    const classroomsDeletedStudent = await fetchData(
      "/api/classes/" + classroomName + "/students/" + student._id.toString(),
      "DELETE"
    );

    dispatch({ type: "DELETE_STUDENT", payload: classroomsDeletedStudent });
  };

  return (
    <>
      {/* controls edit modal */}
      {selectedStudent && (
        <UniversalModal
          modalTitle="Edit Student"
          onClose={() => setIsModalOpen(false)}
          setSelectedStudent={setSelectedStudent}
          formComponent={<EditStudentForm />}
          student={selectedStudent}
          isOpen={isModalOpen}
        />
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Birthdate ( YYYY-MM-DD )</TableCell>
              <TableCell>Programs</TableCell>
              <TableCell>Allergies</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classrooms.map((classroom) =>
              classroom.roomName === selectedClassName
                ? classroom.students.map((student) => (
                    <TableRow
                      hover
                      sx={{ cursor: "pointer" }}
                      size="small"
                      onClick={(e) => handleEditClick(e, student)}
                    >
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <ul>
                          <li>{formatDate(student.birthdate)}</li>
                          <li>{formatAge(student.birthdate)}</li>
                        </ul>
                      </TableCell>
                      <TableCell>
                        <ol>
                          {PROGRAM_NAMES.map((program) =>
                            student.programs.includes(program) ? (
                              <li key={program}>
                                {formatProgramName(program)}
                              </li>
                            ) : null
                          )}
                        </ol>
                      </TableCell>
                      <TableCell>{student.allergies}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell className='delete'>
                        <button
                          onClick={(e) => handleDeleteClick(e, student)}
                          className="material-symbols-outlined delete delete-button"
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                : null
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StudentDetails;
