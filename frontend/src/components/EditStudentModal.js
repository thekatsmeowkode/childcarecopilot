import { Form, Button, Modal } from "react-bootstrap";
import { ClassroomContext } from "../context/ClassroomContext";
import { useContext } from "react";
import { getClassroomId } from "../utils/getClassroomId";
import useForm from "../hooks/useForm";

const EditStudentModal = ({
  student,
  isOpen,
  onClose,
  setSelectedStudent,
  setSelectedStudents,
}) => {
  const { form, setForm, onChangeInput } = useForm({
    name: student.name,
    birthdate: student.birthdate,
    classroomName: student.classroomName,
    allergies: student.allergies,
    phone: student.phone,
    id: student.id,
    programs: student.programs,
  });
  //this remembers the classroom that the student was previously enrolled into
  const incomingDataClassroomMemory = student.classroomName;

  const { dispatch } = useContext(ClassroomContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedStudent = {
      ...form,
      incomingDataClassroomMemory,
    };

    console.log(`updatedStudent: ${JSON.stringify(updatedStudent)}`);

    const classroomId = await getClassroomId(updatedStudent);

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
      throw Error("Could not complete patch request for update student route");
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
              value={form.name}
              onChange={onChangeInput}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Birthdate</Form.Label>
            <Form.Control
              type="date"
              name="birthdate"
              onChange={onChangeInput}
              value={form.birthdate}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Classroom:</Form.Label>
            <Form.Select
              aria-label="Choose a classroom"
              name="classroomName"
              value={form.classroomName}
              onChange={onChangeInput}
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
              name="allergies"
              value={form.allergies}
              onChange={onChangeInput}
              // className={nullFields.includes(allergies) ? "error" : ""}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={form.phone}
              onChange={onChangeInput}
              // className={nullFields.includes(phone) ? "error" : ""}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              value="earlyMorning"
              onChange={handleProgramChange}
              label="Early morning 7:30-8:30"
              checked={form.programs.includes("earlyMorning")}
            ></Form.Check>
            <Form.Check
              type="checkbox"
              value="extendedDay"
              label="Extended Day 3:30-4:30"
              onChange={handleProgramChange}
              checked={form.programs.includes("extendedDay")}
            ></Form.Check>
            <Form.Check
              type="checkbox"
              value="lateDay"
              label="Late Day 4:30-5:30"
              onChange={handleProgramChange}
              checked={form.programs.includes("lateDay")}
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
