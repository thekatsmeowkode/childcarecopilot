import { Form, Button, Modal, InputGroup } from "react-bootstrap";
import { ClassroomContext } from "../context/ClassroomContext";
import { useContext, useState } from "react";

const AddStudentModal = ({ isOpen, onClose, setSelectedStudents }) => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [classroomName, setClassroomName] = useState("");
  const [allergies, setAllergies] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const [programs, setPrograms] = useState([]);
  const [validated, setValidated] = useState(false);

  const { dispatch } = useContext(ClassroomContext);

  const handleSubmit = (e) => {
    const form = e.target;
    console.log(`validity ${form.checkValidity()}`);

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
    e.preventDefault()
    const student = {
      name,
      birthdate,
      phone,
      classroomName,
      allergies,
      programs,
    };
    
    console.log(student)
    console.log(typeof(student.birthdate))

    const allClassroomsResponse = await fetch("/api/classes/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const classroomJson = await allClassroomsResponse.json();

    const classroom = classroomJson.find(
      (classroom) => classroom.roomName === student.classroomName
    );
    const classroomId = classroom._id.toString();

    if (!classroomId) {
      console.log("Classroom not found");
      return;
    }
    //this post response returns complete json of the updated classroom {_id:3423, roomName: infants, students:[{}{}]
    const response = await fetch("/api/classes/" + classroomId + "/students", {
      method: "POST",
      body: JSON.stringify(student),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("error");
    }

    if (response.ok) {
      setSelectedStudents(json.students);
      setName("");
      setBirthdate("");
      setAllergies("");
      setPhone("");
      setClassroomName("");
      setPrograms([]);
      console.log("new student added");
      console.log(json.students)
      dispatch({ type: "ADD_STUDENT_TO_CLASSROOM", payload: json });
    }

    setSelectedStudents(json.students);
    onClose();
  };

  const handleProgramChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setPrograms((prevPrograms) =>
        !prevPrograms ? [value] : [...prevPrograms, value]
      );
    } else {
      setPrograms((prevPrograms) =>
        prevPrograms.filter((program) => program !== value)
      );
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                // isInvalid={!isFormValid && name.length === 0}
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
                onChange={(e) => setBirthdate(e.target.value)}
                value={birthdate}
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
              value={classroomName}
              onChange={(e) => setClassroomName(e.target.value)}
              required
              // isInvalid={!isFormValid && classroomName === ''}
              // className={nullFields.includes(classroomName) ? "error" : ""}
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
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              // className={nullFields.includes(allergies) ? "error" : ""}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              // className={nullFields.includes(phone) ? "error" : ""}
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
