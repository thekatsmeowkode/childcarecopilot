import React, { useState, useEffect } from "react";
import WaitlistDetails from "../components/WaitlistDetails";
import AddStudentWaitlist from "../components/studentForms/AddStudentWaitlist";
import StatusSquares from "../components/waitlistSquares/StatusSquares";
import UniversalButton from "../components/UniversalButton";
import { fetchData } from "../hooks/useApi";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UniversalModal from "../components/UniversalModal";

const Waitlist = React.memo(() => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [waitlistStudents, setWaitlistStudents] = useState([]);

  const fetchWaitlist = async () => {
    return await fetchData("api/waitlist", "GET");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const waitlistData = await fetchWaitlist();
        setWaitlistStudents(waitlistData.students);
      } catch (error) {
        console.error("Error fetching waitlist data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* controls edit modal */}
      {isAddOpen && (
        <UniversalModal
          modalTitle="Add Student"
          isOpen={isAddOpen}
          formComponent={<AddStudentWaitlist />}
          onClose={() => setIsAddOpen(false)}
          setStudents={setWaitlistStudents}
        />
      )}
      <section className="waitlist-status-bar">
        <UniversalButton
          variant="contained"
          eventHandler={() => setIsAddOpen(true)}
          icon={<PersonAddIcon />}
          customStyles={{
            margin: ".7rem",
            backgroundColor: "var(--bright-peach)",
            "&:hover": { backgroundColor: "var(--darkest-peach)" },
          }}
          buttonText="Add student"
        />
        {/* displays squares on top of waitlist */}
        {waitlistStudents && <StatusSquares waitlistData={waitlistStudents} />}
      </section>
      {waitlistStudents && <WaitlistDetails
        waitlistStudents={waitlistStudents}
        setWaitlistStudents={setWaitlistStudents}
      />}
    </>
  );
});

export default Waitlist;
