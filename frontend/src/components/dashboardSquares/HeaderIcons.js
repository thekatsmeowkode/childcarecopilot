import { TableCell, Tooltip } from "@mui/material";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";

const HeaderIcons = () => {
  return (
    <>
      <Tooltip title="Teachers" arrow>
        <TableCell>
          <BabyChangingStationIcon aria-label="Teachers" />
        </TableCell>
      </Tooltip>
      <Tooltip title="Students" arrow>
        <TableCell>
          <ChildFriendlyIcon aria-label="Students" />
        </TableCell>
      </Tooltip>
    </>
  );
};

export default HeaderIcons