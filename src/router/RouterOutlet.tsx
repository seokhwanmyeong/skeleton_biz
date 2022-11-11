// Lib
import { Route, Routes } from "react-router-dom";
// Pages
import Home from "../page/Home";
import Maps from "../page/Maps";
import Erp from "../page/Erp";
import ErrorPage from "../page/ErrorPage";
import Guide from "../page/Guide";
// Components
import MainFrame from "../components/common/MainFrame";

const RouterOutlet = () => {
  return (
    <Routes>
      <Route path="/" element={<MainFrame />} errorElement={<ErrorPage />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route path="maps" element={<Maps />}>
            <Route path="map02" element={<Home />} />
          </Route>
          <Route path="erp" element={<Erp />} />
          <Route path="guide" element={<Guide />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RouterOutlet;
