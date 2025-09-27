export const formDate = (dateInput: Date | string | number) => {
  if (!dateInput) {
    return "Invalid data";
  }

  const data = new Date(dateInput);

  if (isNaN(data.getTime())) {
    return "Inalid Date";
  }

  // this is for format options
  const options: Intl.DateTimeFormatOptions = {
    // for example this change like with sunday, sep 3

    weekday: "long",
    month: "long",
    day: "numeric",

    // and for like 10:21

    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(data);
};

export const formatShortDate = (dateInput: Date | string | number) => {
  const date = new Date(dateInput); // by the way the i get the error down at with out use of .getTime()
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};
