import { useState } from "react";
import UniversalButton from "./UniversalButton";

const ClassroomDetails = ({ classroom, handleButtonClick }) => {
  const [viewToggled, setViewToggled] = useState(false);

  return (
    <div className="classroom-details">
      <h4>
        <UniversalButton
          variant="text"
          size="large"
          buttonText={classroom.roomName}
          value={classroom.roomName}
          eventHandler={handleButtonClick}
        >
          {classroom.roomName}
        </UniversalButton>
      </h4>
      {classroom.students.map((student) =>
        viewToggled ? <p key={student._id}>{student && student.name}</p> : null
      )}
      <span
        onClick={() => setViewToggled(!viewToggled)}
        className="material-symbols-outlined visibility-buttons"
      >
        {viewToggled ? "visibility_off" : "visibility"}
      </span>
    </div>
  );
};

export default ClassroomDetails;
