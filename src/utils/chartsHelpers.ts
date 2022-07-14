const today = new Date();
export const months = [
  today,
  new Date(new Date().setMonth(today.getMonth() - 1, 1)),
  new Date(new Date().setMonth(today.getMonth() - 2, 1)),
  new Date(new Date().setMonth(today.getMonth() - 3, 1)),
  new Date(new Date().setMonth(today.getMonth() - 4, 1)),
  new Date(new Date().setMonth(today.getMonth() - 5, 1)),
  new Date(new Date().setMonth(today.getMonth() - 6, 1)),
];

export const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
