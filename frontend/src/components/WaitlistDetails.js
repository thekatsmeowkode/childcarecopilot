import { formatDateSlashes } from "../utils/formatDates";
import { useState } from "react";
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
      <TableContainer className="table-container">
        <Table sx={{ cursor: "pointer" }} stickyHeader="true">
          <TableHead>
            <TableRow>
              {TABLE_HEADINGS.map((heading) => (
                <TableCell>
                  <strong>{heading}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {waitlistStudents.map((student) => (
              <TableRow
                hover
                key={student._id}
                onClick={() => handleRowClick(student)}
              >
                <TableCell className="waitlist-cell">
                  {formatDateSlashes(student.startDate)}
                </TableCell>
                <TableCell className="waitlist-cell">
                  {student.childName}
                </TableCell>
                <TableCell className="waitlist-cell">
                  {formatDateSlashes(student.birthdate)}
                </TableCell>
                <TableCell className="waitlist-cell">
                  {student.allergies}
                </TableCell>
                <TableCell className="waitlist-cell">
                  {student.parentName}
                </TableCell>
                <TableCell className="waitlist-cell">{student.email}</TableCell>
                <TableCell className="waitlist-cell">{student.phone}</TableCell>
                <TableCell className="waitlist-cell program-cell">
                  <ul>
                    {student.programs.map((program) => (
                      <li key={program}>{formatProgramName(program)}</li>
                    ))}
                  </ul>
                </TableCell>
                {CHECKBOX_FIELDS.map((field) => (
                  <TableCell className="waitlist-cell" key={field}>
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
