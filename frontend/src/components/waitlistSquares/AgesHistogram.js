import * as d3 from "d3";
import { useMemo, useState, useEffect } from "react";
import Histogram from './Histogram'

const AgesHistogram = ({ selectedDate }) => {
  const [theData, setTheData] = useState(null);

  const getHistogramData = async (selectedDate) => {
    const histogramResponse = await fetch(
      `/api/waitlist/histogram/data/${selectedDate}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const histogramJson = await histogramResponse.json();
    console.log(histogramJson);
    setTheData(histogramJson);
  };

  useEffect(() => {
    getHistogramData(selectedDate);
  }, [selectedDate]);

  return (
    <>
      <button onClick={getHistogramData}>See it</button>
      {theData && <Histogram height={500} width={400} data={theData}/>}
    </>
  );
};

export default AgesHistogram;
