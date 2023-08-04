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

  function formatDate(birthdate) {
    const date = new Date(birthdate);
    return date.toISOString().substring(0, 10);
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

module.exports = {formatAge, formatDate, calculateAge}