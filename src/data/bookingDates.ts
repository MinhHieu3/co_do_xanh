import { EVO_LITE_ID } from "./vehicles.ts";

const calendarDayVehicles = new Set([EVO_LITE_ID, "xe-dap-phoenix-nam", "xe-dap-phoenix-nu"]);

export function usesCalendarDay(vehicleId: string) {
  return calendarDayVehicles.has(vehicleId);
}

const dateLabel = new Intl.DateTimeFormat("en-GB", { timeZone: "UTC" });

export function getBookingDates(startDate: string, days: number, hour: number, vehicleId: string) {
  const start = new Date(`${startDate}T00:00:00Z`);
  if (!Number.isFinite(start.getTime()) || start.toISOString().slice(0, 10) !== startDate) return;

  const isCalendarDay = usesCalendarDay(vehicleId);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + days - Number(isCalendarDay));
  const startTime = `${String(hour).padStart(2, "0")}:00`;
  const endTime = isCalendarDay ? "23:59" : startTime;

  return {
    pickupDate: `${dateLabel.format(start)} ${startTime}`,
    dropoffDate: `${dateLabel.format(end)} ${endTime}`,
  };
}
