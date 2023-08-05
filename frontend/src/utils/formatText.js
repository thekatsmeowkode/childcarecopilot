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


export default formatProgramName