function extractDateArguments(dateTimeString) {
    console.log(dateTimeString)
    const [datePart, timePart] = dateTimeString.split(' ');
    const dateParts = datePart.split('-');
    
    if (dateParts.length !== 3) {
      throw new Error('Invalid date format. Expected format: YYYY-MM-DD');
    }
  
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Month is zero-based in Date objects
    const day = parseInt(dateParts[2]);
  
    let hour = 0;
    let minute = 0;
  
    if (timePart) {
      const [hourPart, minutePart] = timePart.split(':');
      hour = parseInt(hourPart);
      minute = parseInt(minutePart);
    }
    console.log(year, month, day, hour, minute)
    return new Date(year, month, day, hour, minute);
  }

console.log(extractDateArguments('2023-04-03'))