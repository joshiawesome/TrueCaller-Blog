import { MONTH_NAMES, TIME_INTERVALS } from "../constants/TimeConstants";

export class TimeUtils {
  public static getTimeSince = (date: Date) => {
    const now = new Date();
    const givenDate = new Date(date);
    const seconds = Math.floor((now.getTime() - givenDate.getTime()) / 1000);

    for (const interval of TIME_INTERVALS) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  };

  public static formatArticlePublishedTimeStamp = (timeStamp: string) => {
    const date = new Date(timeStamp);

    const month = MONTH_NAMES[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
  };
}
