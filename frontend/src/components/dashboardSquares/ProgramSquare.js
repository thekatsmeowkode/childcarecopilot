// import { Table } from "react-bootstrap";
import { CLASS_NAMES } from "../../constants";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
const ProgramSquare = ({ programData }) => {
  const { staffPerProgram } = programData;

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{staffPerProgram.title}</TableCell>
              <TableCell>☕</TableCell>
              <TableCell>🍼</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {CLASS_NAMES.map((classroom) => (
              <TableRow key={Math.random()}>
                <TableCell>{staffPerProgram[classroom]["message"]}</TableCell>
                <TableCell>
                  {staffPerProgram[classroom]["numTeachers"]}
                </TableCell>
                <TableCell>
                  {staffPerProgram[classroom]["numStudents"]}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>{staffPerProgram.schoolTotal.message}</TableCell>
              <TableCell colSpan={2}>
                {staffPerProgram.schoolTotal.numTeachers}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProgramSquare;
