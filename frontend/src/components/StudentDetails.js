import { useContext, useState } from "react";
import { ClassroomContext } from "../context/ClassroomContext";
import EditStudentForm from "./studentForms/EditStudentForm";
import { formatAge, formatDate, formatDateSlashes } from "../utils/formatDates";
import { formatProgramName } from "../utils/formatText";
import { fetchData } from "../hooks/useApi";
import { TableRow, TableCell } from "@mui/material";
import { PROGRAM_NAMES } from "../constants";
import UniversalModal from "./UniversalModal";

const StudentDetails = ({ student }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { dispatch } = useContext(ClassroomContext);

  const handleEditClick = (e) => {
    //formats a date object into a string representation to pre-populate edit form
    if (e.target.className === "material-symbols-outlined") {
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
          onClose={() => setIsModalOpen(false)}
          setSelectedStudent={setSelectedStudent}
          formComponent={<EditStudentForm />}
          student={selectedStudent}
          isOpen={isModalOpen}
        />
      )}
      <TableRow
        hover
        sx={{ cursor: "pointer" }}
        size="small"
        onClick={handleEditClick}
      >
        <TableCell>{student.name}</TableCell>
        <TableCell>
          <ul>
            <li>{formatDateSlashes(student.birthdate)}</li>
            <li>{formatAge(student.birthdate)}</li>
          </ul>
        </TableCell>
        <TableCell>
          <ol>
            {PROGRAM_NAMES.map((program) =>
              student.programs.includes(program) ? (
                <li key={program}>{formatProgramName(program)}</li>
              ) : null
            )}
          </ol>
        </TableCell>
        <TableCell>{student.allergies}</TableCell>
        <TableCell>{student.phone}</TableCell>
        <TableCell>
          <button
            onClick={(e) => handleDeleteClick(e, student)}
            className="material-symbols-outlined delete-button"
          >
            Delete
          </button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default StudentDetails;
