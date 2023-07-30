import { Form, Button, Modal, InputGroup } from "react-bootstrap";
import { ClassroomContext } from "../context/ClassroomContext";
import { useContext, useState } from "react";
import { getClassroomId } from "../utils/getClassroomId";

const AddStudentModal = ({ isOpen, onClose, setSelectedStudents }) => {
  const [form, setForm] = useState({
    name: "",
    birthdate: "",
    classroomName: "",
    allergies: "",
    phone: "",
    programs: [],
  });
  const [validated, setValidated] = useState(false);
  const { dispatch } = useContext(ClassroomContext);

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    const form = e.target;

    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity() === true) {
      handleAddStudent(e);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const student = { ...form };
    console.log(student);

    const classroomId = await getClassroomId(student);

    //this post response returns complete json of the updated classroom {_id:3423, roomName: infants, students:[{}{}]
    const response = await fetch("/api/classes/" + classroomId + "/students", {
      method: "POST",
      body: JSON.stringify(student),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (!response.ok) {
      throw Error("Error while trying to post student to database");
    }

    if (response.ok) {
      setSelectedStudents(json.students);
      setForm({
        name: "",
        birthdate: "",
        classroomName: "",
        allergies: "",
        phone: "",
        programs: [],
      });
      console.log(`new student added`);
      dispatch({ type: "ADD_STUDENT_TO_CLASSROOM", payload: json });
    }

    setSelectedStudents(json.students);
    onClose();
  };

  const handleProgramChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setForm((prevForm) => ({
        ...prevForm,
        programs: [...prevForm.programs, value],
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        programs: prevForm.programs.filter((program) => program !== value),
      }));
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit} validated={validated}>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={form.name}
                onChange={onChangeInput}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input a name.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Birthdate</Form.Label>
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
            <Form.Label>Classroom:</Form.Label>
            <InputGroup hasValidation>
              <Form.Select
                name="classroomName"
                value={form.classroomName}
                onChange={onChangeInput}
                required
              >
                <option value=""></option>
                <option value="infants">Infants</option>
                <option value="crawlers">Crawlers</option>
                <option value="toddlers">Toddlers</option>
                <option value="twos">Twos</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please input a classroom.
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

export default AddStudentModal;
