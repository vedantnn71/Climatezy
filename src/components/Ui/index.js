import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Head from "./part/Head";

const Ui = ({ location, forecast, temp }) => {
  const [data, setData] = useState([]);
  const [units, setUnits] = useState("metric"); // Default - Kelvin, Metric - Celsius, Imperial - Fahernite
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
    let endpoint = "weather";
    const api_url =
      typeof params.city !== "undefined"
        ? `http://api.openweathermap.org/data/2.5/${endpoint}?q=${params.city}&units=${units}&appid=${api_key}`
        : `http://api.openweathermap.org/data/2.5/${endpoint}?lat=${lat}&lon=${long}&units=${units}&appid=${api_key}`;

    switch (forecast) {
      case "week":
        endpoint = "forecast";
        break;
      case "month":
        endpoint = "forecast/climate";
        break;
      default:
        endpoint = "weather";
        break;
    }

    fetch(api_url)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      })
      .catch((err) => <h3>Error: {err}</h3>);
  };
  const backgroundClass = (weather) => {
    let time = new Date().getHours();
    let day_time;
    let res;

    if (time < 19) {
      day_time = "day";
    } else {
      day_time = "night";
    }

    switch (weather) {
      case "Clear":
        res = `clear-${day_time}`;
        break;
      case "Clouds":
        res = `clouds-${day_time}`;
        break;
      case "Thunderstorm":
        res = `thunderstorm`;
        break;
      case "Rain":
        res = `rain-${day_time}`;
        break;
      case "Drizzle":
        res = `rain-${day_time}`;
        break;
      case "Snow":
        res = `snow-${day_time}`;
        break;
      default:
        res = `clear-${day_time}`;
        break;
    }
    return res;
  };

  return (
    <div className="app-container">
      {typeof data.weather !== "undefined" ? (
        <div
          className={`${backgroundClass(data.weather[0].main)} app-container`}
        >
          <Head main={data.weather[0].main} temp={Math.round(temp)} />
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
