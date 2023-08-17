import { OverlayTrigger, Popover } from "react-bootstrap";
import { useState, Fragment } from "react";
import { formatDateMonthDay } from "../../utils/formatDates";
import { fetchData } from "../../hooks/useApi";

const BirthdayPopover = () => {
  const [birthdayData, setBirthdayData] = useState(null);

  const handleMouseEnter = async () => {
    const response = await fetchData("api/classes/navbar/birthdays", "GET");
    setBirthdayData(response.upcomingBirthdays);
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
                  >{`${formatDateMonthDay(student.birthdate)} ${
                    student.name
                  }`}</p>
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
