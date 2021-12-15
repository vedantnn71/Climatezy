/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../utils";
import "../../AddPlace.css";
import Places from "./part/Places";
import "boxicons";

const AddPlace = ({ cities, setCities, setShowSidebar, setShowMenuButton }) => {
  const [city, setCity] = useState("");
  const [hide, setHide] = useState(false);
  const navigate = useNavigate();
  let isTarget = false;

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleChange(e);
      navigate(`/places/${e.target.value}`);
      setShowSidebar(false);
      setShowMenuButton(true);

      for (let i = 0; i < cities.length; i++) {
        const place = cities[i];

        if (place.toLowerCase() === e.target.value.toLowerCase()) {
          isTarget = true;
          break;
        }
      }

      if (isTarget === false && cities && cities.length < 4) {
        cities.push(capitalize(e.target.value));
        localStorage.setItem("cities", JSON.stringify(cities));
      }

      setCity("");
    }
  };

  return (
    <div className="add-place" style={{ display: `${hide ? "none" : "flex"}` }}>
      <button
        onClick={() => {
          setHide(!hide);
        }}
        className="btn white no-bg no-border top-right"
      >
        <box-icon name="x" size="2rem"></box-icon>
      </button>

      <div className="add-place-child">
        <div className="box search-box">
          <div className="search-item">
            <box-icon
              name="search"
              size="1.5rem"
              onClick={handleEnter}
            ></box-icon>
          </div>
          <input
            type="text"
            placeholder="Search Location"
            className="search-item"
            value={city}
            onChange={(e) => handleChange(e)}
            onKeyDown={handleEnter}
          />
        </div>
        <div className="completion-box">
          <ul>
            {typeof cities !== "undefined" || cities !== []
              ? cities.map((place, index) => (
                  <Places
                    place={place}
                    key={index}
                    setHide={setHide}
                    cities={cities}
                    setCities={setCities}
                  />
                ))
              : ""}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddPlace;
