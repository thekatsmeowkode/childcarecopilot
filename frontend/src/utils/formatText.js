const formatProgramName = (program) => {
  switch (program) {
    case "earlyMorning":
      return "Early Morning";
    case "extendedDay":
      return "Extended Day";
    case "lateDay":
      return "Late Day";
    default:
      return;
  }
};

function formatAmountInDollars(amount) {
  if (typeof amount !== "number" || amount < 0) {
    throw new Error("Invalid input: Amount must be a positive number");
  }

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return formattedAmount;
}

module.exports = { formatProgramName, formatAmountInDollars };
