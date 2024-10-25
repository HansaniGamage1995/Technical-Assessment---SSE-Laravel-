import Cookies from "js-cookie";
import dayjs from "dayjs";

export const cookies = {
  set: (name, value, expiration, secure = false) => {
    const currentDate = dayjs();
    const expireByDays = expiration
      ? dayjs(expiration).diff(currentDate, "day")
      : 1;

    return Cookies.set(name, value, {
      expires: expireByDays,
      path: "/",
      secure,
    });
  },

  get: (name) => Cookies.get(name),

  remove: (name) => Cookies.remove(name, { path: "/" }),
};
