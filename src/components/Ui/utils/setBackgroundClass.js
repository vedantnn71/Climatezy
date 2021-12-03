const setBackgroundClass = (weather) => {
  const hours = new Date().getHours();
  const time = hours < 19 ? "day" : "night";

  const avail = [
    "clear",
    "clouds" || "haze",
    "rainy" || "drizzle",
    "snow",
    "thunderstorm",
  ];

  const classes = {
    clear: `clear-${time}`,
    clouds: `clouds-${time}`,
    haze: `clouds-${time}`,
    rain: `rainy-${time}`,
    drizzle: `rainy-${time}`,
    snow: `snow-${time}`,
    thunderstorm: `thunderstorm`,
    default: `clear-${time}`,
  };

  return classes[weather.toLowerCase()] || classes["default"];
};

export default setBackgroundClass;
