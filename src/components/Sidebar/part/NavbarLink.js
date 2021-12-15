import { Link } from "react-router-dom";

const NavbarLink = ({ name, link, isPopup, setPopup }) => {
  return (
    <>
      {isPopup ? (
        <li className="nav-link">
          <Link to="" onClick={() => setPopup(true)}>
            {name}
          </Link>
        </li>
      ) : (
        <li className="nav-link">
          <Link to={link} onClick={() => setPopup(false)}>
            {name}
          </Link>
        </li>
      )}
    </>
  );
};

export default NavbarLink;
