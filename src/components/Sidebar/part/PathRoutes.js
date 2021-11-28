import { Route, Routes } from "react-router";
import Forecast from "../../Forecast";
import Settings from "../../Settings";

const PathRoutes = () => {
  return (
    <Routes>
      <Route path="/settings" element={<Settings />} />
      <Route path="/forecast" element={<Forecast />} />
    </Routes>
  );
};

export default PathRoutes;
