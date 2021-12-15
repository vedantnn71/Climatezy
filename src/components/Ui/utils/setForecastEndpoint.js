const setForecastEndpoint = (forecast) => {
  const endpoints = {
    month: "forecast/climate",
    tommorow: "forecast",
    week: "forecast",
    default: "weather",
  };
  console.log(endpoints[forecast]);
  return endpoints[forecast] || endpoints["default"];
};

export default setForecastEndpoint;
