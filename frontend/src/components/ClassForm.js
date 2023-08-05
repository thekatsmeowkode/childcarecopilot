import { useState } from "react";
import { useClassroomContext } from "../hooks/useClassroomContext";

const ClassForm = () => {
  const { dispatch } = useClassroomContext();
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState(null);
  const [nullFields, setNullFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const classroom = { roomName };
    const response = await fetch("/api/classes", {
      method: "POST",
      body: JSON.stringify(classroom),
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

  const CLASSROOMS = [
    { identifier: "infants", name: "Infants" },
    { identifier: "crawlers", name: "Crawlers" },
    { identifier: "toddlers", name: "Toddlers" },
    { identifier: "twos", name: "Twos" },
  ];

  return (
    <form className="create-class" onSubmit={handleSubmit}>
      <label>Classroom Name:</label>
      <select
        value={roomName}
        className={nullFields.includes("roomName") ? "error" : ""}
        defaultValue={"infants"}
        onChange={(e) => setRoomName(e.target.value)}
      >
        <option value=""></option>
        {CLASSROOMS.map((classroom) => (
          <option value={classroom.identifier}>{classroom.name}</option>
        ))}
      </select>
      {/* <input
        type="text"
        className={nullFields.includes("roomName") ? "error" : ""}
        onChange={(e) => setRoomName(e.target.value)}
        value={roomName}
      /> */}
      <button>Add class</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ClassForm;
