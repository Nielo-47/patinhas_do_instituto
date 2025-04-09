export default function createDateFromDDMMYYYY(dateString: string): Date {
  // Split the date string into day, month, and year
  const [day, month, year] = dateString
    .split("/")
    .map((part) => parseInt(part, 10));

  // Create new Date (note: month is 0-indexed in JavaScript Date)
  return new Date(year, month - 1, day);
}
