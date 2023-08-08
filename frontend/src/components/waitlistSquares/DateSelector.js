import { Form, InputGroup, Button } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import {formatDate} from '../../utils/formatDates'

const TODAYS_DATE = new Date()

const DateSelector = ({ setSelectedDate, selectedDate }) => {
  const { handleSubmit, validated, onChangeInput, form } = useForm({
    selectedDate
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
        <Form.Label>Select a future date to view enrollment possibilities</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type="date"
            name="selectedDate"
            min={formatDate(TODAYS_DATE)}
            onChange={onChangeInput}
            value={form.selectedDate}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please select a date.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Button type='submit'>See possibilities</Button>
    </Form>
  );
};

export default DateSelector;
