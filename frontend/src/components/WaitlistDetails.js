import { formatDate } from "../utils/formatDates";
import { useState } from "react";
import { formatProgramName } from "../utils/formatText";
import EditStudentWaitlist from "./studentForms/EditStudentWaitlist";
import { CHECKBOX_FIELDS, PROGRAM_NAMES } from "../constants";
import {
  TableRow,
  TableCell,
  Table,
  TableContainer,
  TableHead,
  TableBody,
} from "@mui/material";
import UniversalModal from "./UniversalModal";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import SortButton from "./SortButton";
import { fetchData } from "../hooks/useApi";

const TABLE_HEADINGS = [
  "Child's Name",
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

  const headingColors = {
    backgroundColor: "var(--soft-peach)",
    fontSize: ".8rem",
    borderTop: "1px dotted lightgray",
  };

  const handleRowClick = (student) => {
    setIsEditModalOpen(true);
    setSelectedStudent(student);
  };

  return (
    <>
      {/* controls edit student modal */}
      {isEditModalOpen && (
        <UniversalModal
          modalTitle="Edit Student"
          formComponent={<EditStudentWaitlist />}
          student={selectedStudent}
          setWaitlistStudents={setWaitlistStudents}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      <TableContainer sx={{ fontSize: ".8rem" }} className="table-container">
        <Table size="small" sx={{ cursor: "pointer" }} stickyHeader={true}>
          <TableHead>
            <TableRow>
              <TableCell sx={headingColors} className="waitlist-cell">
                <SortButton
                  toSort="birthdate"
                  buttonText="Birthdate"
                  setWaitlistStudents={setWaitlistStudents}
                  origin="waitlist"
                />
              </TableCell>
              <TableCell sx={headingColors} className="waitlist-cell">
                <SortButton
                  toSort="startDate"
                  buttonText="Start Date"
                  setWaitlistStudents={setWaitlistStudents}
                  origin="waitlist"
                />
              </TableCell>
              {TABLE_HEADINGS.map((heading) => (
                <TableCell
                  className="waitlist-cell"
                  sx={headingColors}
                  size="small"
                >
                  <strong>{heading}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {waitlistStudents.map((student) => (
              <TableRow
                className="waitlist-cells"
                hover
                key={student._id}
                onClick={() => handleRowClick(student)}
              >
                <TableCell className="waitlist-cell">
                  {formatDate(student.birthdate)}
                </TableCell>
                <TableCell className="waitlist-cell">
                  {formatDate(student.startDate)}
                </TableCell>
                <TableCell className="waitlist-cell">
                  {student.childName}
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
                  <ol>
                    {PROGRAM_NAMES.map((program) =>
                      student.programs.includes(program) ? (
                        <li key={program}>{formatProgramName(program)}</li>
                      ) : null
                    )}
                  </ol>
                </TableCell>
                {CHECKBOX_FIELDS.map((field) => (
                  <TableCell className="waitlist-cell" size="small" key={field}>
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
