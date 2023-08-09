const AgesHistogram = ({ selectedDate }) => {
  const getHistogramData = async (selectedDate) => {
    const histogramResponse = await fetch(`/api/waitlist/histogram/data/${selectedDate}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const histogramJson = await histogramResponse.json();
    console.log(histogramJson)
  };

  getHistogramData(selectedDate)
};

export default AgesHistogram;
