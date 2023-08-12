import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import { formatDate } from "../../utils/formatDates";
import CheckboxField from "./CheckboxField";
import ProgramField from "./ProgramField";
import { fetchData } from "../../api/waitlistApi";
import {
  CHECKBOX_FIELDS,
  PROGRAM_FIELDS,
  WAITLIST_EMPTY_FIELDS,
} from "../../constants";

const EditStudentWaitlist = ({
  student,
  setWaitlistStudents,
  isOpen,
  onClose,
}) => {
  const {
    form,
    setForm,
    onChangeInput,
    handleProgramChange,
    handleSubmit,
    validated,
  } = useForm({
    ...student,
    birthdate: new Date(student.birthdate),
    startDate: new Date(student.startDate),
  });

  const handleEditStudent = async (e) => {
    e.preventDefault();
    const student = { ...form };

    const response = await fetchData("/", "PATCH", student);

    setWaitlistStudents(response.students);
    setForm(WAITLIST_EMPTY_FIELDS);
    console.log(`student updated`);
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          onSubmit={(e) => handleSubmit(e, handleEditStudent)}
          validated={validated}
        >
          <Form.Group>
            <Form.Label>Child's Name:</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Child's Name"
                name="childName"
                value={form.childName}
                onChange={onChangeInput}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input a name.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Caregiver Contact Name:</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Caregiver Contact Name"
                name="parentName"
                value={form.parentName}
                onChange={onChangeInput}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input a name.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Child's Birthdate</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="date"
                name="birthdate"
                onChange={onChangeInput}
                value={formatDate(form.birthdate)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input a birthdate.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Requested Start Date</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="date"
                name="startDate"
                onChange={onChangeInput}
                value={formatDate(form.startDate)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input a start date.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Allergies:</Form.Label>
            <Form.Control
              type="text"
              name="allergies"
              value={form.allergies}
              onChange={onChangeInput}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={form.phone}
              onChange={onChangeInput}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={form.email}
              onChange={onChangeInput}
            />
          </Form.Group>
          <Form.Group>
            {PROGRAM_FIELDS.map((program) => (
              <ProgramField
                key={program.label}
                value={program.value}
                label={program.label}
                handleProgramChange={handleProgramChange}
                form={form}
              />
            ))}
          </Form.Group>
          {CHECKBOX_FIELDS.map((field) => (
            <CheckboxField
              key={field}
              form={form}
              fieldName={field}
              onChangeInput={onChangeInput}
            />
          ))}
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditStudentWaitlist;
