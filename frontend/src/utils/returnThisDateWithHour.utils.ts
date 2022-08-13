export const returnThisDateWithHour = (hour: string) => {
  return `${String(new Date().getFullYear()).padStart(2, "0")}-${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}T${hour}`;
};
