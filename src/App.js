import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import AddPlace from "./components/AddPlace";
import Settings from "./components/Settings";
import Ui from "./components/Ui";
import Commandline from "./components/Commandline";
import axios from "axios";

const App = () => {
  const lastLocation = localStorage.getItem("last-location") ?? "";
  const navigate = useNavigate();

  useEffect(() => {
    if (lastLocation !== "") {
      navigate("/places/" + lastLocation);
    } else {
      console.log("No last location");
    }
    if (navigator.geolocation) {
      const readLocation = () => {
        if (navigator.geolocation) {
          const geoId = navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              const accuracy = position.coords.accuracy;
              localStorage.setItem("latitude", lat);
              localStorage.setItem("longitude", lon);
              if (position.coords.accuracy > 100) {
                window.alert(
                  "The GPS accuracy isn't good enough, search for location manually."
                );
              }
            },
            handleLocationError,
            { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
          );
        }

        return;
      };

      readLocation();
    }
  }, []);

  const handleLocationError = (err) => {
    const ipApiKey = process.env.REACT_APP_IP_API_KEY;
    const baseURL = `https://api.freegeoip.app/json/?apikey=${ipApiKey}`;
    axios.get(baseURL).then((response) => {
      localStorage.setItem("latitude", response.data.latitude);
      localStorage.setItem("longitude", response.data.longitude);
    });

    // eslint-disable-next-line
    switch (err.code) {
      case err.PERMISSION_DENIED:
        alert(
          "Please allow location access to get accurate weather information in your locality."
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

  console.log(
    "%c Made with ❤️ by Vedant Nandwana \nIf you like my work please support me over on patreon -> https://www.patreon.com/vedantnn7",
    "background-color: #2E3440;color: #D8DEE9;"
  );

  //  TODO - Make unit of wind to DRY;
  return (
    <>
      <Routes>
        <Route path="/" element={<Ui />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/places/:city" element={<Ui />} />
        <Route path="/places/current" element={<Ui />} />
        <Route path="/places/add" element={<AddPlace />} />
        <Route path="/forecast/:forecast" element={<Ui />} />
        <Route path="/cmd/:f" element={<Commandline />} />
      </Routes>
    </>
  );
};

export default App;
