import { Form } from "react-bootstrap";

const CheckboxField = ({ form, fieldName, onChangeInput }) => {
  const lowerCase = fieldName.toLowerCase();
  const fieldLabel = fieldName.charAt(0).toUpperCase() + lowerCase.slice(1);

  return (
    <Form.Group>
      <Form.Check
        type="checkbox"
        name={fieldName}
        value={form[fieldName]}
        checked={form[fieldName]}
        onChange={onChangeInput}
        label={fieldLabel}
      ></Form.Check>
    </Form.Group>
  );
};

export default CheckboxField;
