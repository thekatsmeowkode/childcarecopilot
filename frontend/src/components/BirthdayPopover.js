import { OverlayTrigger, Popover } from "react-bootstrap";
import { useState, Fragment } from "react";
import { formatDateMonthDay } from "../utils/formatDates";

const BirthdayPopover = () => {
  const [birthdayData, setBirthdayData] = useState(null);

  const handleMouseEnter = async () => {
    const response = await fetch("/api/classes/navbar/birthdays", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const birthdayJson = await response.json();
    if (!response.ok) {
      throw Error("Error while trying to get birthdays");
    }

    if (response.ok) {
      const { upcomingBirthdays } = birthdayJson;
      setBirthdayData(upcomingBirthdays);
    }
  };

  const handleMouseLeave = () => {
    setBirthdayData(null);
  };

  return (
    <OverlayTrigger
      placement="left-start"
      overlay={
        <Popover>
          <Popover.Header>Upcoming Birthdays</Popover.Header>
          <Popover.Body>
            {birthdayData &&
              birthdayData.map((student) => (
                <Fragment key={student.id}>
                  <p
                    className={
                      formatDateMonthDay(student.birthdate) ===
                      formatDateMonthDay(new Date())
                        ? "birthday"
                        : ""
                    }
                  >{`${student.name} ${formatDateMonthDay(student.birthdate)}`}</p>
                </Fragment>
              ))}
          </Popover.Body>
        </Popover>
      }
    >
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="material-symbols-outlined"
      >
        Cake
      </span>
    </OverlayTrigger>
  );
};

export default BirthdayPopover;
