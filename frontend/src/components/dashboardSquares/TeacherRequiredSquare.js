import { CLASS_NAMES } from "../../constants";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import HeaderIcons from "./HeaderIcons";
import { formatAmountInDollars } from "../../utils/formatText";

const TeacherRequiredSquare = ({
  staffCoreData,
  staffEarlyData,
  staffExtendedData,
  staffLateData,
  revenueData,
  roomCapacityData,
}) => {
  const { staffCoreHours } = staffCoreData;
  const staffEarlyMorning = staffEarlyData.staffPerProgram;
  const staffExtendedDay = staffExtendedData.staffPerProgram;
  const staffLateDay = staffLateData.staffPerProgram;
  const counts = revenueData.counts;
  const revenue = revenueData.revenue;
  const totalStudents = roomCapacityData.total;

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={2}>
                <strong>{staffCoreHours.title}</strong>
              </TableCell>
              <TableCell colSpan={2}>
                <strong>{staffEarlyMorning.title}</strong>
              </TableCell>
              <TableCell colSpan={2}>
                <strong>{staffExtendedDay.title}</strong>
              </TableCell>
              <TableCell colSpan={2}>
                <strong>{staffLateDay.title}</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{revenue.title}</TableCell>
              <TableCell colSpan={2}>
                {formatAmountInDollars(revenue.schoolTotal.value)}
              </TableCell>
              <TableCell colSpan={2}>
                {formatAmountInDollars(revenue.earlyMorning.value)}
              </TableCell>
              <TableCell colSpan={2}>
                {formatAmountInDollars(revenue.extendedDay.value)}
              </TableCell>
              <TableCell colSpan={2}>
                {formatAmountInDollars(revenue.lateDay.value)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell> </TableCell>
              <HeaderIcons />
              <HeaderIcons />
              <HeaderIcons />
              <HeaderIcons />
            </TableRow>
            {CLASS_NAMES.map((classroom) => (
              <TableRow key={Math.random()}>
                <TableCell>{staffCoreHours[classroom]["message"]}</TableCell>
                <TableCell>
                  {staffCoreHours[classroom]["numTeachers"]}
                </TableCell>
                <TableCell>
                  {staffCoreHours[classroom]["numStudents"]}
                </TableCell>
                <TableCell>
                  {staffEarlyMorning[classroom]["numTeachers"]}
                </TableCell>
                <TableCell>
                  {staffEarlyMorning[classroom]["numStudents"]}
                </TableCell>
                <TableCell>
                  {staffExtendedDay[classroom]["numTeachers"]}
                </TableCell>
                <TableCell>
                  {staffExtendedDay[classroom]["numStudents"]}
                </TableCell>
                <TableCell>{staffLateDay[classroom]["numTeachers"]}</TableCell>
                <TableCell>{staffLateDay[classroom]["numStudents"]}</TableCell>
              </TableRow>
            ))}
            <TableRow
              sx={{
                borderRight: "1px dotted lightgray",
              }}
            >
              <TableCell>{staffCoreHours.schoolTotal.message}</TableCell>
              <TableCell>{staffCoreHours.schoolTotal.numTeachers}</TableCell>
              <TableCell>{totalStudents}</TableCell>
              <TableCell>{staffEarlyMorning.schoolTotal.numTeachers}</TableCell>
              <TableCell>{counts.earlyMorning}</TableCell>
              <TableCell>{staffExtendedDay.schoolTotal.numTeachers}</TableCell>
              <TableCell>{counts.extendedDay}</TableCell>
              <TableCell>{staffLateDay.schoolTotal.numTeachers}</TableCell>
              <TableCell>{counts.lateDay}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TeacherRequiredSquare;
