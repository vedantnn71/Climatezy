import { useNavigate } from "react-router-dom";

const NavbarLink = ({ name, link }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(link);
  };

  return (
    <li className="nav-link">
      <button onClick={handleClick}>{name}</button>
    </li>
  );
};

export default NavbarLink;
