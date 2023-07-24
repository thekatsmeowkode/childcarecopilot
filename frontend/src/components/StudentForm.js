import { useState } from "react";
import { useClassroomContext } from "../hooks/useClassroomContext";

const StudentForm = () => {
  e.preventDefault()
  const { state, dispatch } = useClassroomContext();
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [classroomName, setClassroomName] = useState("");
  const [allergies, setAllergies] = useState("");
  const [programs, setPrograms] = useState("");
  const [error, setError] = useState(null);
  const [nullFields, setNullFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const student = { name, birthdate, classroomName, allergies, programs };

    const response = await fetch("/api/classes/" + classroom.id, {
      method: "POST",
      body: JSON.stringify(student),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setNullFields(json.nullFields);
    }
    if (response.ok) {
      setRoomName("");
      setError(null);
      setNullFields([]);
      console.log("new class added");
      dispatch({ type: "CREATE_CLASSROOM", payload: json });
    }
  };

  return (
    <form className="create-class" onSubmit={handleSubmit}>
      <label>Student Name:</label>
      <input
        type="text"
        className={nullFields.includes("name") ? "error" : ""}
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <label>Student birthdate:</label>
      <input
        type="text"
        className={nullFields.includes(birthdate) ? "error" : ""}
        onChange={(e) => setBirthdate(e.target.value)}
        value={birthdate}
      />
      <label>Classroom</label>
      <select
        name="classroomName"
        value={classroomName}
        onChange={(e) => setClassroomName(e.target.value)}
        className={nullFields.includes(classroomName) ? "error" : ""}
      >
        <option value="infants">Infants</option>
        <option value="crawlers">Crawlers</option>
        <option value="toddlers">Toddlers</option>
        <option value="twos">Twos</option>
      </select>
      <label>Allergies:</label>
      <input
        type="text"
        value={allergies}
        onChange={(e) => setAllergies(e.target.value)}
        className={nullFields.includes(allergies) ? "error" : ""}
      />
      {/* <label>Programs</label>
      <input type='checkbox' name='early' id='early' value= */}
      <button>Add student</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default StudentForm;
