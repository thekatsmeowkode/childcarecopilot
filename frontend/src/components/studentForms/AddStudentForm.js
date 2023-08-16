// import { Form, Button, InputGroup } from "react-bootstrap";
import { ClassroomContext } from "../../context/ClassroomContext";
import { useContext, useRef } from "react";
import ProgramField from "./ProgramField";
import { STUDENT_EMPTY_FIELDS, PROGRAM_FIELDS } from "../../constants";
import useForm from "../../hooks/useForm";
import { fetchData } from "../../hooks/useApi";
import { Form, InputGroup} from "react-bootstrap";
import UniversalButton from "../UniversalButton";

const AddStudentForm = ({ onClose }) => {
  const {
    form,
    setForm,
    onChangeInput,
    handleProgramChange,
    handleSubmit,
    validated,
  } = useForm(STUDENT_EMPTY_FIELDS);

  const { dispatch } = useContext(ClassroomContext);
  const formRef = useRef(null)

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const student = { ...form };

    //this post response returns complete json of the updated classroom {_id:3423, roomName: infants, students:[{}{}]
    const response = await fetchData("/api/classes/students", "POST", student);

    // setSelectedStudents(response.students);
    setForm(STUDENT_EMPTY_FIELDS);
    console.log(`new student added`);
    dispatch({ type: "UPDATE_STUDENTS", payload: response });

    onClose();
  };

  return (
        <Form
          ref={formRef}
          noValidate
          validated={validated}
        >
          <Form.Group className="input-field">
            <Form.Label column={true}>Name:</Form.Label>
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
          <Form.Group className="input-field">
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
          <Form.Group className="input-field">
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
              type="tel"
              name="phone"
              value={form.phone}
              onChange={onChangeInput}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
            type="submit"
            eventHandler={(e) => handleSubmit(e, handleAddStudent, formRef)}
            customStyles={{
              margin: ".7rem",
              backgroundColor: "var(--bright-peach)",
              "&:hover": { backgroundColor: "var(--darkest-peach)" },
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

export default AddStudentForm;
