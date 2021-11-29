import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Head from "./part/Head";
import { setForecastEndpoint, setBackgroundClass } from "./utils";

const Ui = ({ location }) => {
  const [data, setData] = useState([]);
  const [units, setUnits] = useState("metric"); // Default - Kelvin, Metric - Celsius, Imperial - Fahernite
  const [forecast, setForecast] = useState("");
  const [cities, setCities] = useState(
    JSON.parse(localStorage.getItem("cities")) || ["Current", "Add"]
  );
  const [city, setCity] = useState("");
  const params = useParams();
  const api_key = process.env.REACT_APP_API_KEY;
  let [lat, long] = [0, 0];

  if (location) {
    [lat, long] = location;
  }

  useEffect(() => {
    if (data === []) {
      <h3>Loading...</h3>;
    }
    setCities(cities.concat(["Add", "Current"]));
    setCity(params.city);
    getWeather(city);
  }, []);

  const getWeather = () => {
    let endpoint = setForecastEndpoint(forecast || "");
    const api_url =
      typeof params.city !== "undefined"
        ? `http://api.openweathermap.org/data/2.5/${endpoint}?q=${params.city}&units=${units}&appid=${api_key}`
        : `http://api.openweathermap.org/data/2.5/${endpoint}?lat=${lat}&lon=${long}&units=${units}&appid=${api_key}`;

    fetch(api_url)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      })
      .catch((err) => <h3>Error: {err}</h3>);
  };

  return (
    <div className="app-container">
      {typeof data.weather !== "undefined" ? (
        <div className={`${setBackgroundClass()} app-container`}>
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
          <Sidebar cities={cities} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Ui;
