import { useState, useEffect } from "react";
import WaitlistDetails from "../components/WaitlistDetails";
import AddStudentWaitlist from "../components/waitlistStudentForms/AddStudentWaitlist";
import DateSelector from "../components/waitlistSquares/DateSelector";
import StatusSquares from "../components/waitlistSquares/StatusSquares";
import StudentOlderTable from "../components/waitlistSquares/StudentOlderTable";
import AgesHistogram from "../components/waitlistSquares/AgesHistogram";

const CATEGORIES = [
  "sibling",
  "emailed",
  "toured",
  "registered",
  "enrolled",
  "declined",
];

const Waitlist = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [waitlistStudents, setWaitlistStudents] = useState([]);
  const [statusData, setStatusData] = useState(null);
  const [ageTargetStudents, setAgeTargetStudents] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [triggerHistogram, setTriggerHistogram] = useState(false)

  const getCategoryData = async () => {
    const categoryDataPromises = CATEGORIES.map(async (category) => {
      const catData = await fetch(`api/waitlist/dashboard/${category}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return catData.json();
    });

    const categoryData = await Promise.all(categoryDataPromises);
    return categoryData;
  };

  const fetchWaitlist = async () => {
    const waitlist = await fetch("/api/waitlist");
    return waitlist.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [waitlistData, categoryData] = await Promise.all([
          fetchWaitlist(),
          getCategoryData(),
        ]);
        setWaitlistStudents(waitlistData.students);
        setStatusData(categoryData);
      } catch (error) {
        console.error("Error fetching waitlist data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <section className="waitlist-status-bar">
        {statusData &&
          statusData.map((status) => (
            <StatusSquares key={Math.random()} data={status} />
          ))}
      </section>
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
        setAgeTargetStudents={setAgeTargetStudents}
        setSelectedDate={setSelectedDate}
        setTriggerHistogram={setTriggerHistogram}
      />
      {ageTargetStudents && (
        <StudentOlderTable
          selectedDate={selectedDate}
          students={ageTargetStudents}
        />
      )}
      {triggerHistogram && <AgesHistogram selectedDate={selectedDate} />}
    </>
  );
};

export default Waitlist;
