export function sameDay(date1, date2) {
  return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
}

export function sameWeek(date1, date2) {
  const weekStart = new Date(date2.setDate(date2.getDate() - date2.getDay()));
  return date1 >= weekStart;
}

export function sameMonth(date1, date2) {
  return date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
}

export function sameYear(date1, date2) {
  return date1.getFullYear() === date2.getFullYear();
}

export const PERIODS = Object.freeze({
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
});

export const compareDates = Object.freeze({
  [PERIODS.TODAY]: sameDay,
  [PERIODS.WEEK]: sameWeek,
  [PERIODS.MONTH]: sameMonth,
  [PERIODS.YEAR]: sameYear,
})

export function euclideanDistance(point1, point2) {
  return Math.sqrt(
    Math.pow(point1.x - point2.x, 2) +
    Math.pow(point1.y - point2.y, 2)
  );
}