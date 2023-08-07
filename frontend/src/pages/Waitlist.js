import { useState, useEffect } from "react";
import WaitlistDetails from "../components/WaitlistDetails";
import AddStudentWaitlist from "../components/waitlistStudentForms/AddStudentWaitlist";
import DateSelector from "../components/waitlistSquares/DateSelector";

const Waitlist = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [waitlistStudents, setWaitlistStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
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
        setWaitlistStudents={setWaitlistStudents}
      />
      <DateSelector
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />
    </>
  );
};

export default Waitlist;
