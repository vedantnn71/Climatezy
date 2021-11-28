import { Helmet } from "react-helmet";

const Head = ({ main, temp, units }) => {
  return (
    <Helmet>
      <title>{`Climatezy | ${main}, ${temp}°${
        units === "metric" ? "C" : "F"
      }`}</title>
    </Helmet>
  );
};

export default Head;