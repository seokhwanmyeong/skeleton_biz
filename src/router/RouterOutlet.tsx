// Lib
import { Route, Routes } from "react-router-dom";
// Pages
import Home from "@page/Home";
import Maps from "@page/Maps";
import Erp from "@page/Erp";
import ErrorPage from "@page/ErrorPage";
import Guide from "@page/Guide";
// Components
import Main from "@components/common/Main";

const RouterOutlet = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} errorElement={<ErrorPage />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route path="maps" element={<Maps />}>
            <Route path="map01" element={<Maps />} />
            <Route path="map02" element={<Maps />} />
          </Route>
          <Route path="erp" element={<Erp />}>
            <Route path="erp01" element={<Erp />} />
            <Route path="erp02" element={<Erp />} />
          </Route>
          <Route path="guide" element={<Guide />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RouterOutlet;
