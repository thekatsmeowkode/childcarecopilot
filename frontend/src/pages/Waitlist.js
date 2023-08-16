import React, { useState, useEffect } from "react";
import WaitlistDetails from "../components/WaitlistDetails";
import AddStudentWaitlist from "../components/studentForms/AddStudentWaitlist";
import StatusSquares from "../components/waitlistSquares/StatusSquares";
import UniversalButton from "../components/UniversalButton";
import { fetchData } from "../hooks/useApi";
import { CHECKBOX_FIELDS } from "../constants";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UniversalModal from "../components/UniversalModal";

const Waitlist = React.memo(() => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [waitlistStudents, setWaitlistStudents] = useState([]);
  const [statusData, setStatusData] = useState(null);

  const getCategoryData = async () => {
    const categoryDataPromises = CHECKBOX_FIELDS.map(async (category) => {
      return await fetchData(`api/waitlist/dashboard/${category}`, "GET");
    });

    const categoryData = await Promise.all(categoryDataPromises);
    return categoryData;
  };

  const fetchWaitlist = async () => {
    return await fetchData("/api/waitlist", "GET");
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
    {/* controls edit modal */}
      {isAddOpen && (
        <UniversalModal
          modalTitle="Add Student"
          isOpen={isAddOpen}
          formComponent={<AddStudentWaitlist/>}
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
        {statusData &&
          statusData.map((status) => (
            <StatusSquares key={status.category} data={status} />
          ))}
      </section>
      <WaitlistDetails
        waitlistStudents={waitlistStudents}
        setWaitlistStudents={setWaitlistStudents}
      />
    </>
  );
});

export default Waitlist;
