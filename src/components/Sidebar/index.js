/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { capitalize } from "../utils";
import { useParams, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "../../Sidebar.css";
import AddPlace from "../AddPlace";
import NavbarLink from "./part/NavbarLink";
import "boxicons";

const Sidebar = ({ showSidebar, setShowSidebar, setShowMenuButton }) => {
  const [cities, setCities] = useState([]);
  const params = useParams();

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

    localStorage.setItem("last-location", params.city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Places = () => {
    const place =
      typeof cities !== "undefined"
        ? cities.map((place, index) =>
            place === "Add" ? (
              <Popup
                trigger={<li className="nav-link">{capitalize(place)}</li>}
                position="center center"
                key={index}
              >
                <AddPlace
                  cities={cities}
                  setCities={setCities}
                  setShowSidebar={setShowSidebar}
                  setShowMenuButton={setShowMenuButton}
                />
              </Popup>
            ) : (
              <NavbarLink
                name={place}
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

  return (
    <div
      className={`sidebar-container ${
        showSidebar ? "open-sidebar" : "close-sidebar"
      }`}
    >
      <ul>
        <div className="places-container">
          <li className="heading-container">
            <h3 className="heading heading-small">Places</h3>
            <hr className="sep sep-left sep-40" />
          </li>
          {typeof cities !== "undefined" ? (
            <Places />
          ) : (
            <h3 className="heading heading-small">Loading...</h3>
          )}
          <hr className="sep sep-left" />
        </div>
        <div className="disabled-parent" title="Feature in development">
          <div aria-disabled="true" className="disabled forecast-container">
            <li className="heading-container">
              <h3 className="heading heading-small">Forecast</h3>
              <hr className="sep sep-left sep-40" />
            </li>
            <NavbarLink name="Today" link="/" />
            <NavbarLink name="Tommorow" link="/forecast/tommorow" />
            <NavbarLink name="This Week" link="/forecast/week" />
            <hr className="sep sep-left" />
          </div>
        </div>

        <div className="disabled-parent" title="Feature in development">
          <div className="disabled settings-container">
            <NavbarLink name="Settings" link="/settings" />
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
