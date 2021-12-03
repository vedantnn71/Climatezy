import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Head from "./part/Head";
import { setBackgroundClass, setForecastEndpoint, getWeather } from "./utils";

const Ui = ({ location, forecast }) => {
  const [data, setData] = useState([]);
  const [units, setUnits] = useState("metric"); // Default - Kelvin, Metric - Celsius, Imperial - Fahernite
  const [city, setCity] = useState("");
  const params = useParams();
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_API_KEY);
  let [lat, long] = [0, 0];

  if (location) {
    [lat, long] = location;
  }

  /* eslint-disable-next-line */
  const initUi = () => {
    let endpoint = setForecastEndpoint(forecast || "");
    console.log("Forecast", setForecastEndpoint(forecast));
    setCity(params.city);
    const baseURL =
      typeof params.city !== "undefined"
        ? `http://api.openweathermap.org/data/2.5/${endpoint}?q=${params.city}&units=${units}&appid=${apiKey}`
        : `http://api.openweathermap.org/data/2.5/${endpoint}?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;

    getWeather(setData, setApiKey, apiKey, baseURL);
  };

  useEffect(() => {
    if (data === []) {
      <h3>Loading...</h3>;
    }
    initUi();
  }, []);

  if (params.city !== city) {
    initUi();
  }

  return (
    <div className="app-container">
      {typeof data.weather !== "undefined" ? (
        <div
          className={`${setBackgroundClass(
            data.weather[0].main
          )} app-container`}
        >
          <Head
            main={data.weather[0].main}
            temp={Math.round(data.main.temp)}
            units={units}
          />
          <Header
            main={data.weather[0].main}
            temp={Math.round(data.main.temp)}
            humid={`${data.main.humidity}%`}
            wind={`${Math.round(data.wind.speed * 3.6)}KM/h`}
            sky={
              { main: "Clouds", data: `${data.clouds.all}%` } || {
                main: "Precipitation",
                data: `${data.precipitation.value}mm`,
              }
            }
            units={units}
          />
          <Sidebar />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Ui;
