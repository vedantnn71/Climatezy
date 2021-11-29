const setForecastEndpoint = (forecast) => {
  const endpoints = {
    month: "forecast/climate",
    week: "forecast",
    default: "weather",
  };
  return endpoints[forecast] || endpoints["default"];
};

export default setForecastEndpoint;
