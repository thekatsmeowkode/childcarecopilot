import { Form, InputGroup, Button } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import { formatDate } from "../../utils/formatDates";

const TODAYS_DATE = new Date();

const DateSelector = ({ setSelectedDate, setAgeTargetStudents }) => {
  const { handleSubmit, validated, onChangeInput, form } = useForm({
    selectedDate: formatDate(TODAYS_DATE),
    inputMonthsOld: 0,
  });

  const getChildrenOverDate = async () => {
    let { selectedDate, inputMonthsOld } = form;
    selectedDate = formatDate(selectedDate);
    const studentResponse = await fetch(
      `api/waitlist/${selectedDate}/${inputMonthsOld}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const studentJson = await studentResponse.json();
    setAgeTargetStudents(studentJson.targetChildren);
    setSelectedDate(selectedDate);
  };
  
  return (
    <Form
      noValidate
      onSubmit={(e) => handleSubmit(e, getChildrenOverDate)}
      validated={validated}
    >
      <Form.Group>
        <Form.Label>Select a future date</Form.Label>
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
      <Form.Group>
        <Form.Label>Select a target age in months </Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type="number"
            name="inputMonthsOld"
            max={48}
            onChange={onChangeInput}
            value={form.inputMonthsOld}
            required
          />
          <InputGroup.Text>months</InputGroup.Text>
          <Form.Control.Feedback type="invalid">
            Please select a number of months
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Button type="submit">See possibilities</Button>
    </Form>
  );
};

export default DateSelector;
