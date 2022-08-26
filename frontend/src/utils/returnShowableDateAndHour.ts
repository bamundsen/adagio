export const extractFormattedDateTime = (dateTime: string) => {
  const dateTimeObject = new Date(dateTime);

  return `${dateTimeObject.getDate()}/${
    dateTimeObject.getMonth() + 1
  }/${dateTimeObject.getFullYear()} ${dateTimeObject.getHours()}:${dateTimeObject.getMinutes()}`;
};
