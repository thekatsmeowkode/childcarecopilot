import { useState, useEffect } from "react";
import WaitlistDetails from "../components/WaitlistDetails";
import AddStudentWaitlist from "../components/waitlistStudentForms/AddStudentWaitlist";

const Waitlist = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [waitlistStudents, setWaitlistStudents] = useState([]);

  useEffect( () => {
    const fetchWaitlist = async () => {
      const waitlist = await fetch("/api/waitlist");
      const waitlistJson = await waitlist.json();
      if (waitlist.ok) {
        setWaitlistStudents(waitlistJson.students);
      }
    };
    fetchWaitlist();
  }, []);

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
      <WaitlistDetails
        waitlistStudents={waitlistStudents}
        setWaitlistStudents = {setWaitlistStudents}
      />
    </>
  );
};

export default Waitlist;
