import { useState, useEffect } from "react";
import { useClassroomContext } from "../../hooks/useClassroomContext";

const ClassForm = () => {
  const { dispatch } = useClassroomContext();
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClass = async () => {
      //in production this needs to be changed to correct endpoint
      const response = await fetch("/api/classes");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CLASSROOMS", payload: json });
      }
    };

    fetchClass();
  }, [dispatch]);

  const handleSubmit = async (e, action) => {
    e.preventDefault();

    if (action === "add") {
      const classroom = { roomName };

      const response = await fetch("/api/classes", {
        method: "POST",
        body: JSON.stringify(classroom),
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }

      if (response.ok) {
        setRoomName("");
        setError(null);
        dispatch({ type: "CREATE_CLASSROOM", payload: json });
      }
    }

    if (action === "delete") {
      const response = await fetch(`/api/classes/admin/${roomName}`, {
        method: "DELETE",
        body: JSON.stringify({ roomName }),
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }

      if (response.ok) {
        setRoomName("");
        setError(null);
        dispatch({ type: "DELETE_CLASSROOM", payload: json });
      }
    }
  };

  const CLASSROOMS = [
    { identifier: "infants", name: "Infants" },
    { identifier: "crawlers", name: "Crawlers" },
    { identifier: "toddlers", name: "Toddlers" },
    { identifier: "twos", name: "Twos" },
    { identifier: "tester", name: "Tester" },
  ];

  return (
    <>
      <form className="create-class">
        <label>Classroom Name:</label>
        <select
          value={roomName}
          defaultValue={"infants"}
          onChange={(e) => setRoomName(e.target.value)}
        >
          <option value=""></option>
          {CLASSROOMS.map((classroom) => (
            <option value={classroom.identifier}>{classroom.name}</option>
          ))}
        </select>
        <button onClick={(e) => handleSubmit(e, "add")}>Add class</button>
        {error && <div className="error">{error}</div>}
        <button onClick={(e) => handleSubmit(e, "delete")}>Delete class</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default ClassForm;
