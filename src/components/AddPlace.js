import "boxicons";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../AddPlace.css";

const AddPlace = () => {
  const [city, setCity] = useState("");
  let [cities, setCities] = useState(
    JSON.parse(localStorage.getItem("cities")) || []
  );

  const handleChange = (e) => {
    setCity(e.target.value);
    cities[1] = e.target.value;

    localStorage.setItem("cities", JSON.stringify(cities));
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleChange(e);
      setCity("");
      history.push(`/places/${cities[cities.length - 1]}`);
    }
  };

  return (
    <div className="add-place">
      <div className="add-place-child">
        <div className="box search-box">
          {/* <button>
        <box-icon name="x" size="sm"></box-icon>
      </button> */}

          <div className="search-item">
            <box-icon name="search" size="1.5rem"></box-icon>
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
        <div className="box completion-box">
          <ul>
            {typeof cities !== "undefined" || cities !== []
              ? cities.map((place, index) => (
                  <li className="search-item completion-item" key={index}>
                    <Link to={`/${place}`}>{place}</Link>
                  </li>
                ))
              : ""}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddPlace;
