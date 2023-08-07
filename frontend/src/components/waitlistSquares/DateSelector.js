import { Form, InputGroup } from "react-bootstrap";
import useForm from "../../hooks/useForm";

const DateSelector = ({ setSelectedDate, selectedDate }) => {
  const { handleSubmit, validated, onChangeInput } = useForm({
    selectedDate: "",
  });

  const setDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <Form
      noValidate
      onSubmit={(e) => handleSubmit(e, setDate)}
      validated={validated}
    >
      <Form.Group>
        <Form.Label>Select a date to view enrollment possibilities</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type="date"
            name="selectedDate"
            onChange={onChangeInput}
            value={selectedDate ? selectedDate : ""}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please select a date.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default DateSelector;
