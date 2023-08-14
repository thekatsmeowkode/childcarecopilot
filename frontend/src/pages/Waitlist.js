import React, { useState, useEffect } from "react";
import WaitlistDetails from "../components/WaitlistDetails";
import AddStudentWaitlist from "../components/studentForms/AddStudentWaitlist";
import StatusSquares from "../components/waitlistSquares/StatusSquares";
import { fetchData } from "../hooks/useApi";
import { CHECKBOX_FIELDS } from "../constants";

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
    </>
  );
});

export default Waitlist;
