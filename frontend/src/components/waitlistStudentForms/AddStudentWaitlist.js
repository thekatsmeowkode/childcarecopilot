import { Form, Button, Modal, InputGroup } from "react-bootstrap";
import useForm from "../../hooks/useForm";

const initialFormValues = {
  childName: "",
  parentName: "",
  birthdate: "",
  startDate: "",
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
}

const AddStudentWaitlist = ({ setStudents, isOpen, onClose }) => {
  const {
    form,
    setForm,
    onChangeInput,
    handleProgramChange,
    handleSubmit,
    validated,
  } = useForm(initialFormValues);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const student = { ...form };

    //this post response returns complete json of the updated classroom {_id:3423, roomName: infants, students:[{}{}]
    const response = await fetch("/api/waitlist/student", {
      method: "POST",
      body: JSON.stringify(student),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (!response.ok) {
      throw Error("Error while trying to post student to database");
    }

    if (json) {
      setStudents(json.students);
      setForm(initialFormValues);
      console.log(`new student added`);
    }
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
            <Form.Check
              type="checkbox"
              value="earlyMorning"
              onChange={handleProgramChange}
              label="Early morning 7:30-8:30"
            ></Form.Check>
            <Form.Check
              type="checkbox"
              value="extendedDay"
              label="Extended Day 3:30-4:30"
              onChange={handleProgramChange}
            ></Form.Check>
            <Form.Check
              type="checkbox"
              value="lateDay"
              label="Late Day 4:30-5:30"
              onChange={handleProgramChange}
            ></Form.Check>
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              name="sibling"
              checked={form.sibling}
              onChange={onChangeInput}
              label="Sibling"
            ></Form.Check>
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              value={form.emailed}
              name="emailed"
              onChange={onChangeInput}
              label="Emailed"
            ></Form.Check>
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              value={form.toured}
              name="toured"
              onChange={onChangeInput}
              label="Toured"
            ></Form.Check>
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              value={form.registered}
              name="registered"
              onChange={onChangeInput}
              label="Registered"
            ></Form.Check>
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              checked={form.enrolled}
              name="enrolled"
              onChange={onChangeInput}
              label="Enrolled"
            ></Form.Check>
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              checked={form.declined}
              name="declined"
              onChange={onChangeInput}
              label="Declined"
            ></Form.Check>
          </Form.Group>

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
