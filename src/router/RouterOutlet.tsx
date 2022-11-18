// Lib
import { Route, Routes } from "react-router-dom";
// Pages
import Home from "@page/Home";
import Maps from "@page/Maps";
import Erp from "@page/Erp";
import ErpDashboard from "@page/erpDepth/ErpDashboard";
import ErrorPage from "@page/ErrorPage";
import Guide from "@page/Guide";
// Components
import MainFrame from "@src/components/common/MainFrame";

const RouterOutlet = () => {
  return (
    <Routes>
      <Route path="/" element={<MainFrame />} errorElement={<ErrorPage />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route path="maps" element={<Maps />} />
          <Route path="erp" element={<Erp />}>
            <Route index element={<Erp />} />
            <Route path="erp01-Sub01" element={<Erp />} />
            <Route path="erp01-Sub02" element={<Erp />} />
            <Route path="erp01-Sub03" element={<Erp />} />
            <Route path="erp02-Sub01" element={<Erp />} />
            <Route path="erp02-Sub02" element={<Erp />} />
            <Route path="erp02-Sub03" element={<Erp />} />
            <Route path="erp03" element={<Erp />} />
            <Route path="erp04" element={<Erp />} />
          </Route>
          <Route path="guide" element={<Guide />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RouterOutlet;
