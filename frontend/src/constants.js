export const CLASS_NAMES = ["infants", "toddlers", "crawlers", "twos"];

export const PROGRAM_NAMES = ["earlyMorning", "extendedDay", "lateDay"];

export const CLASS_LABELS = {
  infants: "Infant Room",
  crawlers: "Crawlers Room",
  toddlers: "Toddlers Room",
  twos: "Twos Room",
};

export const PROGRAM_FIELDS = [
    { value: "earlyMorning", label: "Early Morning (7:30-8:30)" },
    { value: "extendedDay", label: "Extended Day (3:30-4:30)" },
    { value: "lateDay", label: "Late Day (4:30-5:30)" },
  ];

export const CHECKBOX_FIELDS = [
    "sibling",
    "emailed",
    "toured",
    "registered",
    "enrolled",
    "declined",
  ];

export const WAITLIST_EMPTY_FIELDS = {
    childName: "",
    parentName: "",
    birthdate: "",
    startDate: "",
    allergies: "",
    phone: "",
    email: "",
    programs: [],
    sibling: false,
    emailed: false,
    toured: false,
    registered: false,
    enrolled: false,
    declined: false,
  };