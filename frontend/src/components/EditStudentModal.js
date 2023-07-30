import { Form, Button, Modal } from "react-bootstrap";
import { ClassroomContext } from "../context/ClassroomContext";
import { useContext, useState } from "react";

const EditStudentModal = ({
  student,
  isOpen,
  onClose,
  setSelectedStudent,
  setSelectedStudents,
}) => {
  const [name, setName] = useState(student.name);
  const [birthdate, setBirthdate] = useState(student.birthdate)
  const [classroomName, setClassroomName] = useState(student.classroomName);
  const [allergies, setAllergies] = useState(student.allergies);
  const [phone, setPhone] = useState(student.phone);
  const [id, setId] = useState(student.id);
  const [programs, setPrograms] = useState(student.programs);
  //this remembers the classroom that the student was previously enrolled into
  const incomingDataClassroomMemory = student.classroomName;

  const { dispatch } = useContext(ClassroomContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedStudent = {
      id,
      name,
      birthdate,
      classroomName,
      allergies,
      phone,
      programs,
      incomingDataClassroomMemory,
    };
    console.log(updatedStudent);

    const allClassroomsResponse = await fetch("/api/classes/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const classroomJson = await allClassroomsResponse.json();

    const targetClassroom = classroomJson.find(
      (classroom) => classroom.roomName === classroomName
    );

    const classroomId = targetClassroom._id.toString();

    if (!classroomId) {
      console.log("Classroom not found");
      return;
    }

    const response = await fetch(
      "/api/classes/" +
        classroomId +
        "/students/" +
        updatedStudent.id.toString(),
      {
        method: "PATCH",
        body: JSON.stringify(updatedStudent),
        headers: { "Content-Type": "application/json" },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      console.log("bad response");
    }

    const updatedAllClassroomsResponse = await fetch("/api/classes/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const updatedJson = await updatedAllClassroomsResponse.json();

    if (response.ok) {
      await dispatch({ type: "SET_CLASSROOMS", payload: updatedJson }); // await dispatch({type:"UPDATE_STUDENT", payload:classroomWithUpdatedStudentInside})
    }

    setSelectedStudent("");
    setSelectedStudents(json.students);
    onClose();
  };

  const handleProgramChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPrograms((prevPrograms) => [...prevPrograms, value]);
    } else {
      setPrograms((prevPrograms) =>
        prevPrograms.filter((program) => program !== value)
      );
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Birthdate</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setBirthdate(e.target.value)}
              value={birthdate}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Classroom:</Form.Label>
            <Form.Select
              aria-label="Choose a classroom"
              name="classroomName"
              value={classroomName}
              onChange={(e) => setClassroomName(e.target.value)}
              // className={nullFields.includes(classroomName) ? "error" : ""}
            >
              <option value="infants">Infants</option>
              <option value="crawlers">Crawlers</option>
              <option value="toddlers">Toddlers</option>
              <option value="twos">Twos</option>
            </Form.Select>
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
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              // className={nullFields.includes(phone) ? "error" : ""}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              value="earlyMorning"
              onChange={handleProgramChange}
              label="Early morning 7:30-8:30"
              checked={programs.includes("earlyMorning")}
            ></Form.Check>
            <Form.Check
              type="checkbox"
              value="extendedDay"
              label="Extended Day 3:30-4:30"
              onChange={handleProgramChange}
              checked={programs.includes("extendedDay")}
            ></Form.Check>
            <Form.Check
              type="checkbox"
              value="lateDay"
              label="Late Day 4:30-5:30"
              onChange={handleProgramChange}
              checked={programs.includes("lateDay")}
            ></Form.Check>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditStudentModal;
