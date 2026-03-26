
/** Returns today's date in YYYY-MM-DD format (ISO string). */
export const getToday = () => {
  return new Date().toISOString().split("T")[0]; // yyyy-mm-dd
};

/** Formats an ISO time string into a human-readable HH:MM time. */
export const formatTime = (time: string) =>
  new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
});
