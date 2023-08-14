import { formatDate } from "../utils/formatDates";
import { Fragment, useState } from "react";
import { formatProgramName } from "../utils/formatText";
import EditStudentWaitlist from "./studentForms/EditStudentWaitlist";
import { CHECKBOX_FIELDS } from "../constants";
import {
  TableRow,
  TableCell,
  Table,
  TableContainer,
  TableHead,
  TableBody,
} from "@mui/material";

const TABLE_HEADINGS = [
  "Requested Start Date",
  "Child's Name",
  "Birthdate",
  "Allergies",
  "Parent's Name",
  "Email",
  "Phone",
  "Programs",
  "Sibling",
  "Emailed",
  "Toured",
  "Registered",
  "Enrolled",
  "Declined",
];

const WaitlistDetails = ({ setWaitlistStudents, waitlistStudents }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleRowClick = (student) => {
    setIsEditModalOpen(true);
    setSelectedStudent(student);
  };

  return (
    <>
      {isEditModalOpen && (
        <EditStudentWaitlist
          student={selectedStudent}
          setWaitlistStudents={setWaitlistStudents}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      <TableContainer>
        <Table hover>
          <TableHead>
            <TableRow>
              {TABLE_HEADINGS.map((heading) => 
                <TableCell >{heading}</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {waitlistStudents.map((student) => (
                <TableRow key={student._id} onClick={() => handleRowClick(student)}>
                  <TableCell>{formatDate(student.startDate)}</TableCell>
                  <TableCell>{student.childName}</TableCell>
                  <TableCell>{formatDate(student.birthdate)}</TableCell>
                  <TableCell>{student.allergies}</TableCell>
                  <TableCell>{student.parentName}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>
                    <ul>
                      {student.programs.map((program) => (
                        <li key={program}>{formatProgramName(program)}</li>
                      ))}
                    </ul>
                  </TableCell>
                  {CHECKBOX_FIELDS.map((field) => (
                    <TableCell key={field}>
                      {student[field] ? (
                        <span
                          role="img"
                          aria-label="check mark"
                          className="react-emojis"
                        >
                          ✔️
                        </span>
                      ) : (
                        <span
                          role="img"
                          aria-label="cross mark"
                          className="react-emojis"
                        >
                          ❌
                        </span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default WaitlistDetails;
