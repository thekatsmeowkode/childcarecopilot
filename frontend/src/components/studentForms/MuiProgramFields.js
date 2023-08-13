import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const MuiProgramField = ({ handleProgramChange, form, value, label }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          value={value}
          onChange={handleProgramChange}
          checked={form.programs.includes(value)}
        />
      }
      label={label}
    />
  );
};

export default MuiProgramField;