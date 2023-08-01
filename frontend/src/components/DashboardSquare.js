const DashboardSquare = ({ squareDetails }) => {
    console.log(squareDetails)
  return (
    <>
      {squareDetails.revenue && squareDetails.revenue.title === "Total Revenue" && (
        <>
          <p>{squareDetails.revenue.title}</p>
          <p>{squareDetails.revenue.schoolTotal.message}</p>
          <p>{squareDetails.revenue.schoolTotal.value}</p>
          <p>{squareDetails.revenue.earlyMorning.message}</p>
          <p>{squareDetails.revenue.earlyMorning.value}</p>
          <p>{squareDetails.revenue.extendedDay.message}</p>
          <p>{squareDetails.revenue.extendedDay.value}</p>
          <p>{squareDetails.revenue.lateDay.message}</p>
          <p>{squareDetails.revenue.lateDay.value}</p>
        </>
      )}
      <p>{squareDetails.totalStudents}</p>
    </>
  );
};

export default DashboardSquare;
