import { useState } from "react";
import UniversalButton from "./UniversalButton";

const ClassroomDetails = ({ classroom, handleButtonClick }) => {
  const [viewToggled, setViewToggled] = useState(false);

  return (
    <div className="classroom-details">
      <h4>
        <UniversalButton
          variant="outlined"
          size="large"
          buttonText={classroom.roomName}
          eventHandler={handleButtonClick}
          customStyles={{
            border: "1px dotted var(--dark-peach)",
            color: "var(--dark-peach)",
            "&:hover": {
              backgroundColor: "var(--soft-peach)",
              color: "var(--darkest-peach)",
              border: "1px solid var(--darkest-peach)"
            },
          }}
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
