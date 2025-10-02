// gymapp/app/utils/formatDate.ts

/**
 * Formats a date string or Date object into a readable string.
 * @param dateInput The date to format (string or Date object).
 * @returns A formatted date string (e.g., "Oct 1, 2025").
 */
export const formatDate = (dateInput: string | Date): string => {
  const date = new Date(dateInput);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
