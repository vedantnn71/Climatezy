import Details from "./Details";
import "../Header.css";

const Header = ({ temp, main, humid, sky, wind }) => {
  return (
    <div className="header-container">
      <div className="heading header-heading">
        <h1 className="main-heading">
          {temp}°, {main}
        </h1>
      </div>
      <Details humid={humid} wind={wind} sky={sky} />
    </div>
  );
};
export default Header;
