import { useState } from "react";
import { WaitlistDetails } from "../components/WaitlistDetails";
import AddStudentWaitlist from "../components/waitlistStudentForms/AddStudentWaitlist";

const Waitlist = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [waitlistStudents, setWaitlistStudents] = useState([]);

  return (
    <>
      <button onClick={() => setIsAddOpen(true)}>Add Student</button>
      {isAddOpen && (
        <AddStudentWaitlist
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          setStudents={setWaitlistStudents}
        />
      )}
    </>
  );
};

export default Waitlist;
