import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { CHECKBOX_FIELDS } from "../../constants";
import { fetchData } from "../../hooks/useApi";

const StatusSquares = ({ waitlistData }) => {

  const [catData, setCatData] = useState(null);

  const getCategoryData = async () => {
    const categoryDataPromises = CHECKBOX_FIELDS.map(async (category) => {
      return await fetchData(`api/waitlist/dashboard/${category}`, "GET");
    });

    const categoryData = await Promise.all(categoryDataPromises);
    setCatData(categoryData);
  };

  useEffect(() => {
    getCategoryData();
  }, [waitlistData]);

  return (
    <>
      {catData &&
        catData.map((category) =>
          <Paper
            className="status-square"
            sx={{ padding: "1rem" }}
            elevation={category.count ? category.count : 1}
          >
            <p>
              <strong>{category.category}</strong>
            </p>
            <p>{category.count}</p>
          </Paper>
        )}
    </>
  );
};

export default StatusSquares;
