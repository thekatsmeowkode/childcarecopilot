import { PROGRAM_NAMES } from "../../constants";
import { formatAmountInDollars } from "../../utils/formatText";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const RevenueSquare = ({ revenueData }) => {
  const { revenue } = revenueData;

  return (
    <>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHead colSpan={2}>{revenue.title}</TableHead>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{revenue.schoolTotal.message}</TableCell>
            <TableCell>{formatAmountInDollars(revenue.schoolTotal.value)}</TableCell>
          </TableRow>
          {PROGRAM_NAMES.map((program) => (
            <TableRow key={program}>
              <TableCell>{revenue[program]["message"]}</TableCell>
              <TableCell>{formatAmountInDollars(revenue[program]["value"])}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </>
  );
};

export default RevenueSquare;
