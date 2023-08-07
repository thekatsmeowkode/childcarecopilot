import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import { formatDate } from "../../utils/formatDates";
import CheckboxField from "./CheckboxField";
import ProgramField from "./ProgramField";

const CHECKBOX_FIELDS = [
  "sibling",
  "emailed",
  "toured",
  "registered",
  "enrolled",
  "declined",
];

const PROGRAM_FIELDS = [
  { value: "earlyMorning", label: "Early Morning (7:30-8:30)" },
  { value: "extendedDay", label: "Extended Day (3:30-4:30)" },
  { value: "lateDay", label: "Late Day (4:30-5:30)" },
];

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
    childName: student.childName,
    parentName: student.parentName,
    birthdate: new Date(student.birthdate),
    startDate: new Date(student.startDate),
    allergies: student.allergies,
    phone: student.phone,
    email: student.email,
    programs: student.programs,
    sibling: student.sibling,
    emailed: student.emailed,
    toured: student.toured,
    registered: student.registered,
    enrolled: student.enrolled,
    declined: student.declined,
  });

  const handleEditStudent = async (e) => {
    e.preventDefault();
    const student = { ...form };

    const studentResponse = await fetch("api/waitlist/" + student.childName, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const studentId = await studentResponse.json();

    const response = await fetch("/api/waitlist/" + studentId, {
      method: "PATCH",
      body: JSON.stringify(student),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (!response.ok) {
      throw Error("Error while trying to post student to database");
    }

    if (response.ok) {
      setWaitlistStudents(json.students);
      setForm({
        childName: "",
        parentName: "",
        birthdate: "",
        allergies: "",
        phone: "",
        email: "",
        programs: [],
        sibling: false,
        emailed: false,
        toured: false,
        registered: false,
        enrolled: false,
        declined: false,
      });
      console.log(`student updated`);
    }
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
                value={program.value}
                label={program.label}
                handleProgramChange={handleProgramChange}
                form={form}
              />
            ))}
          </Form.Group>
          {CHECKBOX_FIELDS.map((field) => (
            <CheckboxField
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
