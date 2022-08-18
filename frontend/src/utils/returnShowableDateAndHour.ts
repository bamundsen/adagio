export const extractFormattedDateTime = (dateTime: string) => {
  const dateTimeObject = new Date(dateTime);
  console.log(dateTimeObject);
  return `${dateTimeObject.getDate()}/${
    dateTimeObject.getMonth() + 1
  }/${dateTimeObject.getFullYear()} ${dateTimeObject.getHours()}:${dateTimeObject.getMinutes()}`;
};
