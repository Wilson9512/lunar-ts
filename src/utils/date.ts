export function getBeijingDate(timestamp: number): Date {
  // Convert UTC timestamp to Beijing time (UTC+8)
  return new Date(timestamp + 8 * 60 * 60 * 1000);
}