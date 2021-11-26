import "../Sidebar.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

/*
  TODO -> Make this code DRY
*/

const NavbarLink = ({ name, link }) => {
  return (
    <li className="nav-link">
      <Link to={link}>{name}</Link>
    </li>
  );
};

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => <li>{number}</li>);
const Nav = ({ city }) => {
  return city.map((place) => {
    <NavbarLink name={place} link={`/${place}`} />;
  });
};

const Sidebar = ({ city }) => {
  const places = city.map((place) => (
    <NavbarLink name={place} link={`/${place.toLowerCase()}`} />
  ));
  return (
    <Router>
      <div className="sidebar-container">
        <ul>
          <div className="places-container">
            <li className="heading-container">
              <h3 className="heading heading-small">Places</h3>
              <hr className="sep sep-left sep-40" />
            </li>
            {/* TODO -> Make add functionality */}
            {places}
          </div>
          <hr className="sep sep-left sep-40" />
          <div className="forecast-container">
            <li className="heading-container">
              <h3 className="heading heading-small">Forecast</h3>
              <hr className="sep sep-left sep-40" />
            </li>
            <NavbarLink name="Tommorow" link="/tommorow" />
            <NavbarLink name="This Week" link="/week" />
            <NavbarLink name="This Month" link="/month" />
          </div>
          <div className="sep sep-left sep-40">
            <hr />
          </div>

          <div className="settings-container">
            <NavbarLink name="Settings" link="/settings" />
          </div>
        </ul>
      </div>
    </Router>
  );
};

export default Sidebar;
