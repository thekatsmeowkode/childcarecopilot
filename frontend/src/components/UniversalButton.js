import {Button} from "@mui/material";

const UniversalButton = ({ variant, eventHandler, icon, customStyles, buttonText }) => {
  return (
    <Button
      variant={variant}
      sx={customStyles}
      startIcon={icon}
      onClick={eventHandler}
    >
      {buttonText}
    </Button>
  );
};

export default UniversalButton;
