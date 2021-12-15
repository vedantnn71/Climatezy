import { useParams } from "react-router-dom";

const Commandline = (f) => {
  const params = useParams();

  return <h1>{ params }</h1>;
};

export default Commandline;
