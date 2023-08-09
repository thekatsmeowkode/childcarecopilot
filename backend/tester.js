const futureDate = new Date();
const birthdate = new Date("2020-12-24");

const monthsOld =
  (futureDate.getFullYear() - birthdate.getFullYear()) * 12 +
  (futureDate.getMonth() - birthdate.getMonth());

function monthsToYearsAndMonths(months) {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  return `${years} years ${remainingMonths} months`;
}

console.log(monthsToYearsAndMonths(monthsOld));
