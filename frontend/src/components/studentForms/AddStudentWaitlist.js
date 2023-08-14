import { Form, Row, Modal, InputGroup, Col } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import CheckboxField from "./CheckboxField";
import ProgramField from "./ProgramField";
import {
  PROGRAM_FIELDS,
  CHECKBOX_FIELDS,
  WAITLIST_EMPTY_FIELDS,
} from "../../constants";
import { fetchData } from "../../hooks/useApi";
import UniversalButton from "../UniversalButton";

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
          <Form.Group className="input-field">
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
          <Form.Group className="input-field">
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
          <Form.Group className="input-field">
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
          <Form.Group className="input-field">
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
          <Form.Group className="input-field">
            <Form.Label>Allergies:</Form.Label>
            <Form.Control
              type="text"
              name="allergies"
              value={form.allergies}
              onChange={onChangeInput}
            />
          </Form.Group>
          <Form.Group className="input-field">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={form.phone}
              onChange={onChangeInput}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            />
          </Form.Group>
          <Form.Group className="input-field">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={form.email}
              onChange={onChangeInput}
            />
          </Form.Group>
          <Row className="mb-3 input-field">
          <Form.Group as={Col} xs={7} className="input-field">
            {PROGRAM_FIELDS.map((program) => (
              <ProgramField
                value={program.value}
                label={program.label}
                handleProgramChange={handleProgramChange}
                form={form}
              />
            ))}
          </Form.Group>
          <Form.Group as={Col}>
          {CHECKBOX_FIELDS.map((field) => (
            <CheckboxField
              onChangeInput={onChangeInput}
              form={form}
              fieldName={field}
            />
          ))}
          </Form.Group>
          </Row>

<UniversalButton
            variant="contained"
            eventHandler={handleAddStudent}
            customStyles={{
              margin: ".7rem",
              backgroundColor: "var(--bright-peach)",
              "&:hover": { backgroundColor: "var(--darkest-peach)" },
            }}
            buttonText="Save changes"
          />
          <UniversalButton
            variant="outlined"
            eventHandler={onClose}
            buttonText="Cancel"
          />
        </Form>
      </Modal.Body>
  
    </Modal>
  );
};

export default AddStudentWaitlist;
