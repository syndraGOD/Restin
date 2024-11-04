export const isToday = () => {
  const today = new Date();
};
export const today = () => {
  let today = { now: new Date() };
  today = {
    ...today,
    year: today.now.getFullYear(),
    month: today.now.getMonth() + 1,
    date: today.now.getDate(),
    day: today.now.getDay(),
  };
  return today;
};
