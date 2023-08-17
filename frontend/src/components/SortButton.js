import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { ClassroomContext } from "../context/ClassroomContext";
import { useState, useContext } from "react";
import { fetchData } from "../hooks/useApi";

const SortButton = ({
  toSort,
  setWaitlistStudents,
  buttonText,
  origin,
  selectedClassName,
}) => {
  const [sortButton, setSortButton] = useState("asc");
  const { dispatch } = useContext(ClassroomContext);

  const handleSortClick = async (sortBy, toSort) => {
    let queryParams = { order: sortBy };

    let response = await fetchData(
      `api/${origin}/sort/${
        selectedClassName ? selectedClassName : "data"
      }/sorted/get-sorted-ages/${toSort}`,
      "GET",
      null,
      queryParams
    );

    const sortedStudents = response.students;
    sortButton === "asc" ? setSortButton("desc") : setSortButton("asc");
    if (origin === "waitlist") {
      setWaitlistStudents(sortedStudents);
    }
    if (origin === "classes") {
      dispatch({ type: "UPDATE_STUDENTS", payload: response });
    }
  };

  return (
    <>
      {sortButton === "asc" ? (
        <span>
          <ArrowCircleUpIcon onClick={() => handleSortClick("asc", toSort)} />
          {" " + buttonText}
        </span>
      ) : (
        <span>
          <ArrowCircleDownIcon
            onClick={() => handleSortClick("desc", toSort)}
          />
          {" " + buttonText}
        </span>
      )}
    </>
  );
};

export default SortButton;
