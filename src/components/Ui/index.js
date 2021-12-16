import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useWindowDimensions } from "../hooks";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Head from "./part/Head";
import { setBackgroundClass, setForecastEndpoint, getWeather } from "./utils";
// import { ReactComponent as Preloader } from "../../images/preloader.svg";
const Ui = () => {
  const [data, setData] = useState([]);
  const [units, setUnits] = useState("metric"); // Default - Kelvin, Metric - Celsius, Imperial - Fahernite
  const [city, setCity] = useState("");
  const params = useParams();
  const forecast = params.forecast;
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_API_KEY);
  const [windowWidth, windowHeight] = [
    useWindowDimensions().width,
    useWindowDimensions().height,
  ];
  const [showSidebar, setShowSidebar] = useState(windowWidth > 764);
  const [showMenuButton, setShowMenuButton] = useState(showSidebar === false);
  const [animation, setAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [forecastData, setForecastData] = useState([]);
  let [lat, long] = [
    localStorage.getItem("latitude") ?? 0,
    localStorage.getItem("longitude") ?? 0,
  ];
  const [prev_lat, prev_long] = [lat, long];

  /* eslint-disable-next-line */
  const initData = () => {
    let endpoint = setForecastEndpoint(forecast);
    setCity(params.city);
    const baseURL =
      typeof params.city !== "undefined"
        ? `http://api.openweathermap.org/data/2.5/${endpoint}?q=${params.city}&units=${units}&appid=${apiKey}`
        : `http://api.openweathermap.org/data/2.5/${endpoint}?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;

    getWeather(setData, setApiKey, apiKey, baseURL, setIsLoading, forecast);

    if (data[1]) {
      setForecastData(data);
      setData(data[0]);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  if (params.city !== city) {
    initData();
  }

  if (prev_lat !== lat || prev_long !== long) {
    window.location.reload();
  }

  const fadeEffect = () => {
    let opacity = 1;
    setInterval(() => {
      if (opacity > 0) {
        opacity -= 0.1;
      }
    }, 200);
    return opacity;
  };

  return !isLoading ? (
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
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            showMenuButton={showMenuButton}
            setShowMenuButton={setShowMenuButton}
            setAnimation={setAnimation}
            windowSize={windowWidth}
          />
          <Sidebar
            windowSize={windowWidth}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            showMenuButton={showMenuButton}
            setShowMenuButton={setShowMenuButton}
            animation={animation}
            setAnimation={setAnimation}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  ) : (
    <div
      className="preloader"
      style={{
        opacity: fadeEffect(),
      }}
    >
      <img
        src={`${process.env.PUBLIC_URL}/logo.svg`}
        style={{ fill: "#f0f0f0" }}
        alt="Climatezy logo"
      />
    </div>
  );
};

export default Ui;
