import Details from "./part/Details";
import "../../Header.css";
import "boxicons";

const Header = ({
  temp,
  main,
  humid,
  sky,
  wind,
  showSidebar,
  setShowSidebar,
  showMenuButton,
  setShowMenuButton,
  setAnimation,
}) => {
  return (
    <div className="header-container">
      <div className="heading heading-child-container">
        <h1 className="main-heading">
          {temp}°, {main}
        </h1>
        <div className="btn-container">
          <button
            className="btn no-bg no-border white menu"
            style={{
              zIndex: "399",
            }}
            onClick={() => {
              setShowSidebar(!showSidebar);
              setShowMenuButton(!showMenuButton);
              setAnimation(true);
            }}
          >
            <box-icon
              color="white"
              name={showMenuButton ? "menu-alt-right" : "x"}
              size="2.3rem"
            ></box-icon>
          </button>
        </div>
      </div>
      <Details humid={humid} wind={wind} sky={sky} />
    </div>
  );
};
export default Header;
