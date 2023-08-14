function formatAge(dateOfBirth) {
  const { years, months, days } = calculateAge(dateOfBirth);

  let formattedAge = "";

  if (years > 0) {
    formattedAge += `${years} ${years === 1 ? "year" : "years"}`;
  }

  if (months > 0) {
    formattedAge += ` ${months} ${months === 1 ? "month" : "months"}`;
  }

  if (years === 0 && months === 0 && days > 0) {
    formattedAge = `${days} ${days === 1 ? "day" : "days"}`;
  }

  return formattedAge.trim();
}

function formatDate(date) {
  const dateObj = new Date(date);
  return dateObj.toISOString().substring(0, 10);
}

function formatDateMonthDay(date) {
  const dateObj = new Date(date);
  return dateObj.toISOString().substring(6, 10);
}

function calculateAge(dateOfBirth) {
  const today = new Date();
  const birthDateObj = new Date(dateOfBirth);

  let years = today.getFullYear() - birthDateObj.getFullYear();
  let months = today.getMonth() - birthDateObj.getMonth();
  let days = today.getDate() - birthDateObj.getDate();

  if (days < 0) {
    months -= 1;
    const tempDate = new Date(today.getFullYear(), today.getMonth(), 0);
    days = tempDate.getDate() + days;
  }

  if (months < 0) {
    years -= 1;
    months = 12 + months;
  }

  return { years, months, days };
}

function monthsToYearsAndMonths(months) {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  return `${years} years ${remainingMonths} months`;
}

function formatDateSlashes(date) {
  date = new Date(date)
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${month} / ${day} / ${year.toString().slice(-2)}`;
}

module.exports = {
  formatAge,
  formatDate,
  calculateAge,
  monthsToYearsAndMonths,
  formatDateMonthDay,
  formatDateSlashes
};
