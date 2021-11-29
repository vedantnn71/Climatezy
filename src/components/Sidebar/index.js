import { BrowserRouter as Router } from "react-router-dom";
import Popup from "reactjs-popup";
import "../../Sidebar.css";
import AddPlace from "../AddPlace";
import NavbarLink from "./part/NavbarLink";
// import "reactjs-popup/dist/index.css";

/*
  TODO -> Make this code DRY
*/

const Sidebar = ({ cities }) => {
  const places =
    typeof cities !== "undefined"
      ? cities.map((place, index) =>
        place === "Add" ? (
          <Popup
            trigger={<li className="nav-link">{place}</li>}
            position="center center"
            key={index}
          >
            <AddPlace />
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

  return (
    <div className="sidebar-container">
      <ul>
        <div className="places-container">
          <li className="heading-container">
            <h3 className="heading heading-small">Places</h3>
            <hr className="sep sep-left sep-40" />
          </li>
          {/* TODO -> Make add functionality */}
          {typeof cities !== "undefined" ? (
            places
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
          <NavbarLink name="Tommorow" link="/tommorow" />
          <NavbarLink name="This Week" link="/week" />
          <NavbarLink name="This Month" link="/month" />
          <hr className="sep sep-left" />
        </div>

        <div className="settings-container">
          <NavbarLink name="Settings" link="/settings" />
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
