import { Link } from "react-router-dom";

const NavbarLink = ({ name, link }) => {
  return (
    <li className="nav-link">
      <Link to={link}>{name}</Link>
    </li>
  );
};

export default NavbarLink;
