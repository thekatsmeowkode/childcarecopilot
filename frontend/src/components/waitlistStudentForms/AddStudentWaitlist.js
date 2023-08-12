import { Form, Button, Modal, InputGroup } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import CheckboxField from "./CheckboxField";
import ProgramField from "./ProgramField";
import {
  PROGRAM_FIELDS,
  CHECKBOX_FIELDS,
  WAITLIST_EMPTY_FIELDS,
} from "../../constants";
import { fetchData } from "../../api/useApi";

const AddStudentWaitlist = ({ setStudents, isOpen, onClose }) => {
  const {
    form,
    setForm,
    onChangeInput,
    handleProgramChange,
    handleSubmit,
    validated,
  } = useForm(WAITLIST_EMPTY_FIELDS);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const student = { ...form };

    const response = await fetchData("/api/waitlist/student", "POST", student);

    setStudents(response.students);
    setForm(WAITLIST_EMPTY_FIELDS);
    console.log(`new student added`);
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          onSubmit={(e) => handleSubmit(e, handleAddStudent)}
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
                value={form.birthdate}
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
                value={form.startDate}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input a birthdate.
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
                value={program.value}
                label={program.label}
                handleProgramChange={handleProgramChange}
                form={form}
              />
            ))}
          </Form.Group>
          {CHECKBOX_FIELDS.map((field) => (
            <CheckboxField
              onChangeInput={onChangeInput}
              form={form}
              fieldName={field}
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

export default AddStudentWaitlist;
