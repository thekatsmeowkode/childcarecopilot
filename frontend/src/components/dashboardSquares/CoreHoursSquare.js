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

const CoreHoursSquare = ({ coreData }) => {
  const { staffCoreHours } = coreData;

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{staffCoreHours.title}</TableCell>
              <TableCell>☕</TableCell>
              <TableCell>🍼</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {CLASS_NAMES.map((classroom) => (
              <TableRow key={Math.random()}>
                <TableCell>{staffCoreHours[classroom]["message"]}</TableCell>
                <TableCell>
                  {staffCoreHours[classroom]["numTeachers"]}
                </TableCell>
                <TableCell>
                  {staffCoreHours[classroom]["numStudents"]}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>{staffCoreHours.schoolTotal.message}</TableCell>
              <TableCell colSpan={2}>{staffCoreHours.schoolTotal.numTeachers}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CoreHoursSquare;
