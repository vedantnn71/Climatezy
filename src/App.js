import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Settings from "./components/Settings";
import Ui from "./components/Ui";

const App = () => {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [forecast, setForecast] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLat(pos.coords.latitude);
        setLong(pos.coords.longitude);
      }, handleLocationError);
    }
  }, []);

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

  //  TODO - Make unit of wind to DRY;
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Ui location={[lat, long]} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/places/:city" element={<Ui />} />
        <Route path="/places/current" element={<Ui location={[lat, long]} />} />
      </Routes>
    </>
  );
};

export default App;
