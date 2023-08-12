import { useState } from "react";

const ClassroomDetails = ({ classroom, handleButtonClick }) => {
  const [viewToggled, setViewToggled] = useState(false);

  return (
    <div className="classroom-details">
      <h4>
        <button
          onClick={(e) => {
            handleButtonClick(e);
          }}
        >
          {classroom.roomName}
        </button>
      </h4>
      {classroom.students.map((student) =>
        viewToggled ? <p key={student.name}>{student && student.name}</p> : null
      )}
      <span
        onClick={() => setViewToggled(!viewToggled)}
        className="material-symbols-outlined"
      >
        {viewToggled ? "visibility_off" : "visibility"}
      </span>
    </div>
  );
};

export default ClassroomDetails;
