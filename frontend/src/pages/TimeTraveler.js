import DateSelector from "../components/timeTraveler/DateSelector";
import StudentOlderTable from "../components/timeTraveler/StudentOlderTable";
import { useState } from "react";

const TimeTraveler = () => {
  const [ageTargetStudents, setAgeTargetStudents] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <DateSelector
        setAgeTargetStudents={setAgeTargetStudents}
        setSelectedDate={setSelectedDate}
      />
      {ageTargetStudents && (
        <StudentOlderTable
          selectedDate={selectedDate}
          students={ageTargetStudents}
        />
      )}
    </>
  );
};

export default TimeTraveler;
