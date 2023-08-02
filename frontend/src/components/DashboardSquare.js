const DashboardSquare = ({ squareDetails }) => {
  //   console.log(squareDetails);
  console.log(squareDetails.staffPerProgram);
  return (
    <>
      {squareDetails.revenue &&
        squareDetails.revenue.title === "Total Revenue" && (
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
      {squareDetails.totalStudents && (
        <>
          <p>{squareDetails.title}</p>
          <p>{squareDetails.totalStudents}</p>
        </>
      )}

      {squareDetails.staffCoreHours && (
        <>
          <p>{squareDetails.staffCoreHours.title}</p>
          <p>{squareDetails.staffCoreHours.infants.message}</p>
          <p>{squareDetails.staffCoreHours.infants.value}</p>
          <p>{squareDetails.staffCoreHours.crawlers.message}</p>
          <p>{squareDetails.staffCoreHours.crawlers.value}</p>
          <p>{squareDetails.staffCoreHours.toddlers.message}</p>
          <p>{squareDetails.staffCoreHours.toddlers.value}</p>
          <p>{squareDetails.staffCoreHours.twos.message}</p>
          <p>{squareDetails.staffCoreHours.twos.value}</p>
          <p>{squareDetails.staffCoreHours.schoolTotal.message}</p>
          <p>{squareDetails.staffCoreHours.schoolTotal.value}</p>
        </>
      )}
      {squareDetails.staffPerProgram &&
        squareDetails.staffPerProgram.dataLabel === "earlyMorning" && (
          <>
            <p>{squareDetails.staffPerProgram.title}</p>
            <p>{squareDetails.staffPerProgram.infants.message}</p>
            <p>{squareDetails.staffPerProgram.infants.value}</p>
            <p>{squareDetails.staffPerProgram.crawlers.message}</p>
            <p>{squareDetails.staffPerProgram.crawlers.value}</p>
            <p>{squareDetails.staffPerProgram.toddlers.message}</p>
            <p>{squareDetails.staffPerProgram.toddlers.value}</p>
            <p>{squareDetails.staffPerProgram.twos.message}</p>
            <p>{squareDetails.staffPerProgram.twos.value}</p>
            <p>{squareDetails.staffPerProgram.schoolTotal.message}</p>
            <p>{squareDetails.staffPerProgram.schoolTotal.value}</p>
          </>
        )}
      {squareDetails.staffPerProgram &&
        squareDetails.staffPerProgram.dataLabel === "extendedDay" && (
          <>
            <p>{squareDetails.staffPerProgram.title}</p>
            <p>{squareDetails.staffPerProgram.infants.message}</p>
            <p>{squareDetails.staffPerProgram.infants.value}</p>
            <p>{squareDetails.staffPerProgram.crawlers.message}</p>
            <p>{squareDetails.staffPerProgram.crawlers.value}</p>
            <p>{squareDetails.staffPerProgram.toddlers.message}</p>
            <p>{squareDetails.staffPerProgram.toddlers.value}</p>
            <p>{squareDetails.staffPerProgram.twos.message}</p>
            <p>{squareDetails.staffPerProgram.twos.value}</p>
            <p>{squareDetails.staffPerProgram.schoolTotal.message}</p>
            <p>{squareDetails.staffPerProgram.schoolTotal.value}</p>
          </>
        )}
      {squareDetails.staffPerProgram &&
        squareDetails.staffPerProgram.dataLabel === "lateDay" && (
          <>
            <p>{squareDetails.staffPerProgram.title}</p>
            <p>{squareDetails.staffPerProgram.infants.message}</p>
            <p>{squareDetails.staffPerProgram.infants.value}</p>
            <p>{squareDetails.staffPerProgram.crawlers.message}</p>
            <p>{squareDetails.staffPerProgram.crawlers.value}</p>
            <p>{squareDetails.staffPerProgram.toddlers.message}</p>
            <p>{squareDetails.staffPerProgram.toddlers.value}</p>
            <p>{squareDetails.staffPerProgram.twos.message}</p>
            <p>{squareDetails.staffPerProgram.twos.value}</p>
            <p>{squareDetails.staffPerProgram.schoolTotal.message}</p>
            <p>{squareDetails.staffPerProgram.schoolTotal.value}</p>
          </>
        )}
    </>
  );
};

export default DashboardSquare;
