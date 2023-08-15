import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { FOOD_CATEGORIES } from "../../constants";

const FoodSquare = ({foodData}) => {

  const {title} = foodData

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{title}</TableCell>
              <TableCell>quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {FOOD_CATEGORIES.map((category) => (
              <TableRow key={Math.random()}>
                <TableCell>{foodData[category]["label"]}</TableCell>
                <TableCell>
                  {`${foodData[category]["value"]} ${foodData[category]["measurement"]}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default FoodSquare;
