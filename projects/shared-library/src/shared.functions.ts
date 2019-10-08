export function setTimezone(timezone: string, date: Date) {
  if (!date) {
    return date;
  }
  const parsedDate = new Date(deepCopy(date));
  const momentInTime = (<any>window).moment(parsedDate).tz(timezone);
  return momentInTime.toDate();
}

export function deepCopy(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
