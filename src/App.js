import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddPlace from "./components/AddPlace";
import Settings from "./components/Settings";
import Ui from "./components/Ui";
import Commandline from "./components/Commandline";

const App = () => {
  useEffect(() => {
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
              console.log({ lat, lon }, position.coords.accuracy);
              if (position.coords.accuracy > 10) {
                window.alert(
                  "The GPS accuracy isn't good enough, search for location manually."
                );
              }
            },
            (e) => {
              console.error(e.message);
              console.error(e.message);
            },
            { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
          );
        }

        return;
      };

      readLocation();
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
