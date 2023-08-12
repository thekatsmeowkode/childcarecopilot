import { Form } from "react-bootstrap";

const ProgramField = ({ handleProgramChange, form, value, label }) => {
  return (
    <Form.Check
      type="checkbox"
      value={value}
      onChange={handleProgramChange}
      label={label}
      checked={form.programs.includes(value)}
    ></Form.Check>
  );
};

export default ProgramField;
