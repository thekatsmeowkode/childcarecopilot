import { Form, Button } from "react-bootstrap";
import { ClassroomContext } from "../context/ClassroomContext";
import { useContext, useState } from "react";

const EditStudentForm = ({ classrooms, getOneStudent }) => {
//   const id = student.id;
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [classroomName, setClassroomName] = useState("");
  const [allergies, setAllergies] = useState("");
  const [phone, setPhone] = useState("");

  const { dispatch } = useContext(ClassroomContext);

  const updatedStudent = { name, birthdate, classroomName, allergies, phone };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updatedStudent);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          onChange={(e) => setBirthdate(e.target.value)}
          value={birthdate}
        />
      </Form.Group>
      <Form.Group>
        <label>Classroom</label>
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
        <label>Allergies:</label>
        <Form.Control
          type="text"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          // className={nullFields.includes(allergies) ? "error" : ""}
        />
      </Form.Group>
      <Form.Group>
        <label>Phone Number:</label>
        <Form.Control
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          // className={nullFields.includes(phone) ? "error" : ""}
        />
      </Form.Group>
      <Button variant='success' type='submit' block>
        Edit Student
      </Button>
    </Form>
  );
};

export default EditStudentForm