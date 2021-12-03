/* eslint-disable no-unused-vars */
import "boxicons";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "../../Sidebar.css";
import AddPlace from "../AddPlace";
import { capitalize } from "../utils";
import NavbarLink from "./part/NavbarLink";
// import "reactjs-popup/dist/index.css";

/*
  TODO -> Make this code DRY
*/

const Sidebar = () => {
  const windowSize = window.innerWidth;
  const [showSidebar, setShowSidebar] = useState(windowSize > 768);
  const [showCloseButton, setShowCloseButton] = useState(windowSize < 768);
  const [showMenuButton, setShowMenuButton] = useState(
    showCloseButton === false
  );
  // const getCities =
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCities(
      localStorage.getItem("cities") !== null
        ? JSON.parse(localStorage.getItem("cities"))
        : ["Current", "Add"]
    );

    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];

      if (city === "Add" || city === "Current") {
        break;
      } else {
        setCities([...cities, "Add", "Current"]);
      }
    }
  }, []);

  const Places = () => {
    const place =
      typeof cities !== "undefined"
        ? cities.map((place, index) =>
            place === "Add" ? (
              // <NavbarLink isPopup={true} setPopup={setPopup} name={place} />
              <Popup
                trigger={<li className="nav-link">{capitalize(place)}</li>}
                position="center center"
                key={index}
              >
                <AddPlace cities={cities} setCities={setCities} />
              </Popup>
            ) : (
              <NavbarLink
                name={capitalize(place)}
                link={
                  place !== null
                    ? `/places/${place.toLowerCase()}`
                    : `/places/${place}`
                }
                key={index}
              />
            )
          )
        : "";
    return place;
  };

  return showSidebar ? (
    <div
      className="sidebar-container"
      style={{ display: `${showSidebar ? "block" : "none"}` }}
    >
      <button
        style={{ display: `${showCloseButton ? "initial" : "none"}` }}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <box-icon name="x" size="sm"></box-icon>
      </button>
      <ul>
        <div className="places-container">
          <li className="heading-container">
            <h3 className="heading heading-small">Places</h3>
            <hr className="sep sep-left sep-40" />
          </li>
          {/* TODO -> Make add functionality */}
          {typeof cities !== "undefined" ? (
            <Places />
          ) : (
            <h3 className="heading heading-small">Loading...</h3>
          )}
          <hr className="sep sep-left" />
        </div>
        <div className="forecast-container">
          <li className="heading-container">
            <h3 className="heading heading-small">Forecast</h3>
            <hr className="sep sep-left sep-40" />
          </li>
          <NavbarLink name="Tommorow" link="/forecast/tommorow" />
          <NavbarLink name="This Week" link="/forecast/week" />
          <NavbarLink name="This Month" link="/forecast/month" />
          <hr className="sep sep-left" />
        </div>

        <div className="settings-container">
          <NavbarLink name="Settings" link="/settings" />
        </div>
      </ul>
    </div> ? (
      !showSidebar && windowSize > 768
    ) : (
      <button
        style={{ display: `${showMenuButton ? "block" : "none"}` }}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <box-icon name="menu-alt-right" size="sm"></box-icon>
      </button>
    )
  ) : (
    ""
  );
};

export default Sidebar;
