import { Form, InputGroup } from "react-bootstrap";
import { ClassroomContext } from "../../context/ClassroomContext";
import { useContext, useRef } from "react";
import { PROGRAM_FIELDS } from "../../constants";
import { fetchData } from "../../hooks/useApi";
import ProgramField from "./ProgramField";
import useForm from "../../hooks/useForm";
import UniversalButton from "../UniversalButton";

const EditStudentModal = ({ student, isOpen, onClose, setSelectedStudent }) => {
  const { form, onChangeInput, handleProgramChange, validated, handleSubmit } =
    useForm({
      ...student,
    });
  //this remembers the classroom that the student was previously enrolled into
  const incomingDataClassroomMemory = student.classroomName;

  const { dispatch } = useContext(ClassroomContext);
  const formRef = useRef(null);

  const handleEditStudent = async (e) => {
    e.preventDefault();
    const updatedStudent = {
      ...form,
      incomingDataClassroomMemory,
    };

    const response = await fetchData(
      "/api/classes/" +
        updatedStudent.classroomName +
        "/students/" +
        updatedStudent._id.toString(),
      "PATCH",
      updatedStudent
    );

    dispatch({ type: "UPDATE_STUDENTS", payload: response });

    setSelectedStudent("");
    onClose();
  };

  return (
    <Form ref={formRef} noValidate validated={validated}>
      <Form.Group className="input-field">
        <Form.Label>Name:</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            required
            value={form.name}
            onChange={onChangeInput}
          />
          <Form.Control.Feedback type="invalid">
            Please input a name.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group className="input-field">
        <Form.Label>Birthdate</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type="date"
            required
            name="birthdate"
            onChange={onChangeInput}
            value={form.birthdate}
          />
          <Form.Control.Feedback type="invalid">
            Please input a birthdate.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group className="input-field">
        <Form.Label>Classroom:</Form.Label>
        <InputGroup hasValidation>
          <Form.Select
            aria-label="Choose a classroom"
            name="classroomName"
            required
            value={form.classroomName}
            onChange={onChangeInput}
          >
            <option value="infants">Infants</option>
            <option value="crawlers">Crawlers</option>
            <option value="toddlers">Toddlers</option>
            <option value="twos">Twos</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please input a class name.
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
          type="text"
          name="phone"
          value={form.phone}
          onChange={onChangeInput}
        />
      </Form.Group>
      <Form.Group className="input-field">
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
      <UniversalButton
        variant="contained"
        eventHandler={(e) => handleSubmit(e, handleEditStudent, formRef)}
        customStyles={{
          margin: ".7rem",
          backgroundColor: "var(--bright-peach)",
          "&:hover": { backgroundColor: "var(--dark-peach)" },
        }}
        buttonText="Save changes"
      />
      <UniversalButton
        variant="outlined"
        eventHandler={onClose}
        buttonText="Cancel"
      />
    </Form>
  );
};

export default EditStudentModal;
