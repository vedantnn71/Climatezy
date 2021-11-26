import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [data, setData] = useState([]);
  // const [aqi, setAqi] = useState([])
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [forecast, setForecast] = useState("");
  const [units, setUnits] = useState("metric"); // Default - Kelvin, Metric - Celsius, Imperial - Fahernite
  const api_key = process.env.REACT_APP_API_KEY;
  const location_api_key = process.env.REACT_APP_LOCATION_API_KEY;
  const [city, setCity] = useState("");
  let endpoint = "weather";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLat(pos.coords.latitude);
        setLong(pos.coords.longitude);
        getWeather();
        // setCity(geocoding());
      }, handleLocationError);
    }
  }, []);

  const geocoding = (mode = "reverse") => {
    // let api_url = `https://us1.locationiq.com/v1/${mode}.php?${location_api_key}&lat=${lat}&lon=${long}&format=json`;
    let api_url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%${long}&lang=en-US`;
    let result = "";

    console.log(api_url);

    fetch(api_url, {
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        Authorization: "5Oz8WyEYCotxg-whiBk278FWXhSYFgzjnoOjV-eE6QI",
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result));

    return result;
  };

  const getWeather = () => {
    const api_url = `http://api.openweathermap.org/data/2.5/${endpoint}?lat=${lat}&lon=${long}&units=${units}&appid=${api_key}`;
    // const aqi_api_url = `https://api.waqi.info/feed/geo:${lat};${long}/?token=demo`;

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
      });
  };

  const handleLocationError = (err) => {
    // eslint-disable-next-line
    switch (err.code) {
      case err.PERMISSION_DENIED:
        alert(
          "Please allow location access to get weather information in your locality."
        );
        break;
      case err.POSITION_UNAVAILABLE:
        alert(
          "Unable to get your location, please enter your pincode or city name."
        );
        break;
      case err.Timeout:
        alert("Location request time out.");
        break;
      case err.UNKNOWN_ERROR:
        alert("Encountered unknown error.");
        break;
    }
  };

  const backgroundClass = (weather) => {
    console.log(weather);
    let time = new Date().getHours();
    let day_time;
    let res;

    if (time <= 19) {
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

  console.log(data);

  //  TODO - Make unit of wind to DRY;
  return (
    <>
      {typeof data.weather !== "undefined" ? (
        <div
          className={`${backgroundClass(data.weather[0].main)} app-container`}
        >
          <Helmet>
            <title>{`Climatezy | ${Math.round(data.main.temp)}°${
              units === "metric" ? "C" : "F"
            }`}</title>
          </Helmet>
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
          />
          <Sidebar city={["California", "New York", "London"]} />
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};

export default App;
