import { Form, InputGroup } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import { formatDate } from "../../utils/formatDates";
import { fetchData } from "../../hooks/useApi";
import UniversalButton from "../UniversalButton";
import { formatDateSlashes } from "../../utils/formatDates";

const TODAYS_DATE = new Date();

const DateSelector = ({ setSelectedDate, setAgeTargetStudents }) => {
  const { handleSubmit, validated, onChangeInput, form } = useForm({
    selectedDate: formatDate(TODAYS_DATE),
    inputMonthsOld: 0,
  });

  const getChildrenOverDate = async () => {
    let { selectedDate, inputMonthsOld } = form;
    selectedDate = formatDate(selectedDate);
    const studentResponse = await fetchData(
      `api/waitlist/${selectedDate}/${inputMonthsOld}`,
      "GET"
    );
    setAgeTargetStudents(studentResponse.targetChildren);
    setSelectedDate(selectedDate);
  };

  return (
    <Form
      className="input-fields"
      noValidate
      onSubmit={(e) => handleSubmit(e, getChildrenOverDate)}
      validated={validated}
    >
      <Form.Group>
        <Form.Label> Select a future date</Form.Label>
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
        <Form.Label> Select a target age in months </Form.Label>
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
      <UniversalButton
        variant="contained"
        eventHandler={getChildrenOverDate}
        customStyles={{
          margin: ".7rem",
          backgroundColor: "var(--bright-peach)",
          "&:hover": { backgroundColor: "var(--darkest-peach)" },
        }}
        buttonText={
          form.inputMonthsOld > 0
            ? `Click to see children ${
                form.inputMonthsOld
              } months old by ${formatDateSlashes(form.selectedDate)}`
            : "Submit"
        }
      />
    </Form>
  );
};

export default DateSelector;
