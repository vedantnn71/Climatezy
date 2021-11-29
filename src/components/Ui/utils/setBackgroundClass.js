const setBackgroundClass = (weather) => {
  const hours = new Date().getHours();
  const time = hours < 19 ? "day" : "night";
  const classes = {
    main: `${weather}-${time}`,
    default: `clear-${time}`,
  };

  return weather !== undefined || "" ? classes.main : classes.default
};

export default setBackgroundClass;
