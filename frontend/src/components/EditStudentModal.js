import { Form, Button, Modal } from "react-bootstrap";
import { ClassroomContext } from "../context/ClassroomContext";
import { useContext } from "react";
import { getClassroomId } from "../utils/getClassroomId";
import { PROGRAM_FIELDS } from "../constants";
import { fetchData } from "../api/useApi";
import ProgramField from "./waitlistStudentForms/ProgramField";
import useForm from "../hooks/useForm";

const EditStudentModal = ({
  student,
  isOpen,
  onClose,
  setSelectedStudent,
  setSelectedStudents,
}) => {
  const { form, setForm, onChangeInput, handleProgramChange, handleSubmit } =
    useForm({
      ...student,
    });
  //this remembers the classroom that the student was previously enrolled into
  const incomingDataClassroomMemory = student.classroomName;

  const { dispatch } = useContext(ClassroomContext);

  const handleEditStudent = async (e) => {
    e.preventDefault();
    const updatedStudent = {
      ...form,
      incomingDataClassroomMemory,
    };

    const classroomId = await getClassroomId(updatedStudent);

    const response = await fetchData(
      "/api/classes/" +
        classroomId +
        "/students/" +
        updatedStudent.id.toString(),
      "PATCH",
      updatedStudent
    );

    const updatedAllClassroomsResponse = await fetchData(
      "/api/classes/",
      "GET"
    );
    console.log(updatedAllClassroomsResponse);

    dispatch({ type: "UPDATE_STUDENT", payload: response }); // await dispatch({type:"UPDATE_STUDENT", payload:classroomWithUpdatedStudentInside})

    setSelectedStudent("");
    setSelectedStudents(response.students)
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e, handleEditStudent)}>
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
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={form.phone}
              onChange={onChangeInput}
            />
          </Form.Group>
          <Form.Group>
            {PROGRAM_FIELDS.map((program) => (
              <ProgramField
                key={program.label}
                value={program.value}
                label={program.label}
                handleProgramChange={handleProgramChange}
                form={form}
              />
            ))}
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

export default EditStudentModal;
