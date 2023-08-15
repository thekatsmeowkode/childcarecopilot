import DateSelector from "../components/timeTraveler/DateSelector";
import StudentOlderTable from "../components/timeTraveler/StudentOlderTable";
import { useState } from "react";
import "../css/timeTraveler.css";

const TimeTraveler = () => {
  const [ageTargetStudents, setAgeTargetStudents] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
      <div className="time-traveler-container">
        <div className="date-selector">
          <DateSelector
            setAgeTargetStudents={setAgeTargetStudents}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <div className="age-target-selector">
        {ageTargetStudents && (
          <StudentOlderTable
            selectedDate={selectedDate}
            students={ageTargetStudents}
          />
        )}
        </div>
      </div>
  );
};

export default TimeTraveler;
