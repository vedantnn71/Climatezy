const setForecastEndpoint = (forecast) => {
  const endpoints = {
    month: "forecast/climate",
    tommorow: "forecast",
    week: "forecast",
    default: "weather",
  };
  return endpoints[forecast] || endpoints["default"];
};

export default setForecastEndpoint;
