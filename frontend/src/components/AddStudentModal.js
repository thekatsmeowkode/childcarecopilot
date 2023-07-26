import { Form, Button, Modal } from "react-bootstrap";
import { ClassroomContext } from "../context/ClassroomContext";
import { useContext, useState } from "react";

const AddStudentModal = ({ isOpen, onClose, setSelectedStudents}) => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [classroomName, setClassroomName] = useState("");
  const [allergies, setAllergies] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("")
  const [programs, setPrograms] = useState([])

  const { dispatch } = useContext(ClassroomContext);

  const handleSubmit = async (e) => {
        e.preventDefault();
        const student = { name, birthdate, phone, classroomName, allergies };
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
            console.log('error')
        //   setError(json.error);
          //   setNullFields(json.nullFields);
        }
        if (response.ok) {
          setSelectedStudents(json.students)
          setName("");
          setBirthdate("");
          setAllergies("");
          setPhone("");
          setClassroomName("");
        //   setError(null);
          //   setNullFields([]);
          console.log("new student added");
          dispatch({ type: "ADD_STUDENT_TO_CLASSROOM", payload: json });
        }

    console.log(json)
    setSelectedStudents(json.students)
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Student Details</Modal.Title>
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
              type="text"
              onChange={(e) => setBirthdate(e.target.value)}
              value={birthdate}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Classroom:</Form.Label>
            <select
              name="classroomName"
              value={classroomName}
              onChange={(e) => setClassroomName(e.target.value)}
              // className={nullFields.includes(classroomName) ? "error" : ""}
            >
              {" "}
              <option value=""></option>
              <option value="infants">Infants</option>
              <option value="crawlers">Crawlers</option>
              <option value="toddlers">Toddlers</option>
              <option value="twos">Twos</option>
            </select>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type='submit' variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddStudentModal