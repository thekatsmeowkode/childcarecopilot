const DashboardSquare = ({ squareDetails }) => {
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
          <p>{squareDetails.staffCoreHours.infants.numTeachers}</p>
          <p>s:{squareDetails.staffCoreHours.infants.numStudents}</p>
          <p>{squareDetails.staffCoreHours.crawlers.message}</p>
          <p>{squareDetails.staffCoreHours.crawlers.numTeachers}</p>
          <p>s:{squareDetails.staffCoreHours.crawlers.numStudents}</p>
          <p>{squareDetails.staffCoreHours.toddlers.message}</p>
          <p>{squareDetails.staffCoreHours.toddlers.numTeachers}</p>
          <p>s:{squareDetails.staffCoreHours.toddlers.numStudents}</p>
          <p>{squareDetails.staffCoreHours.twos.message}</p>
          <p>{squareDetails.staffCoreHours.twos.numTeachers}</p>
          <p>s:{squareDetails.staffCoreHours.twos.numStudents}</p>
          <p>{squareDetails.staffCoreHours.schoolTotal.message}</p>
          <p>{squareDetails.staffCoreHours.schoolTotal.numTeachers}</p>
        </>
      )}
      {squareDetails.staffPerProgram &&
        squareDetails.staffPerProgram.dataLabel === "earlyMorning" && (
          <>
            <p>{squareDetails.staffPerProgram.title}</p>
            <p>{squareDetails.staffPerProgram.infants.message}</p>
            <p>teachers:{squareDetails.staffPerProgram.infants.numTeachers}</p>
            <p>students:{squareDetails.staffPerProgram.infants.numStudents}</p>
            <p>{squareDetails.staffPerProgram.crawlers.message}</p>
            <p>t: {squareDetails.staffPerProgram.crawlers.numTeachers}</p>
            <p>s: {squareDetails.staffPerProgram.crawlers.numStudents}</p>
            <p>{squareDetails.staffPerProgram.toddlers.message}</p>
            <p>t:{squareDetails.staffPerProgram.toddlers.numTeachers}</p>
            <p>s: {squareDetails.staffPerProgram.toddlers.numStudents}</p>
            <p>{squareDetails.staffPerProgram.twos.message}</p>
            <p>t: {squareDetails.staffPerProgram.twos.numTeachers}</p>
            <p>s: {squareDetails.staffPerProgram.twos.numStudents}</p>
            <p>{squareDetails.staffPerProgram.schoolTotal.message}</p>
            <p>t: {squareDetails.staffPerProgram.schoolTotal.numTeachers}</p>
          </>
        )}
      {squareDetails.staffPerProgram &&
        squareDetails.staffPerProgram.dataLabel === "extendedDay" && (
          <>
            <p>{squareDetails.staffPerProgram.title}</p>
            <p>{squareDetails.staffPerProgram.infants.message}</p>
            <p>teachers:{squareDetails.staffPerProgram.infants.numTeachers}</p>
            <p>students:{squareDetails.staffPerProgram.infants.numStudents}</p>
            <p>{squareDetails.staffPerProgram.crawlers.message}</p>
            <p>t: {squareDetails.staffPerProgram.crawlers.numTeachers}</p>
            <p>s: {squareDetails.staffPerProgram.crawlers.numStudents}</p>
            <p>{squareDetails.staffPerProgram.toddlers.message}</p>
            <p>t:{squareDetails.staffPerProgram.toddlers.numTeachers}</p>
            <p>s: {squareDetails.staffPerProgram.toddlers.numStudents}</p>
            <p>{squareDetails.staffPerProgram.twos.message}</p>
            <p>t: {squareDetails.staffPerProgram.twos.numTeachers}</p>
            <p>s: {squareDetails.staffPerProgram.twos.numStudents}</p>
            <p>{squareDetails.staffPerProgram.schoolTotal.message}</p>
            <p>t: {squareDetails.staffPerProgram.schoolTotal.numTeachers}</p>
          </>
        )}
      {squareDetails.staffPerProgram &&
        squareDetails.staffPerProgram.dataLabel === "lateDay" && (
          <>
            <p>{squareDetails.staffPerProgram.title}</p>
            <p>{squareDetails.staffPerProgram.infants.message}</p>
            <p>teachers:{squareDetails.staffPerProgram.infants.numTeachers}</p>
            <p>students:{squareDetails.staffPerProgram.infants.numStudents}</p>
            <p>{squareDetails.staffPerProgram.crawlers.message}</p>
            <p>t: {squareDetails.staffPerProgram.crawlers.numTeachers}</p>
            <p>s: {squareDetails.staffPerProgram.crawlers.numStudents}</p>
            <p>{squareDetails.staffPerProgram.toddlers.message}</p>
            <p>t:{squareDetails.staffPerProgram.toddlers.numTeachers}</p>
            <p>s: {squareDetails.staffPerProgram.toddlers.numStudents}</p>
            <p>{squareDetails.staffPerProgram.twos.message}</p>
            <p>t: {squareDetails.staffPerProgram.twos.numTeachers}</p>
            <p>s: {squareDetails.staffPerProgram.twos.numStudents}</p>
            <p>{squareDetails.staffPerProgram.schoolTotal.message}</p>
            <p>t: {squareDetails.staffPerProgram.schoolTotal.numTeachers}</p>
          </>
        )}
    </>
  );
};

export default DashboardSquare;
