//  Lib
import { Route, Routes } from "react-router-dom";
//  Pages
import Home from "@page/Home";
import Maps from "@page/Maps";
import DashBoard from "@src/page/erp/DashBoard";
import ErpBase from "@src/page/erp/erpBase";
import ErpApiTable from "@src/page/erp/erpApiTable";
import ErrorPage from "@page/ErrorPage";
import Guide from "@page/Guide";
//  Components
import FrameMain from "@src/components/frame/FrameMain";
import FrameErp from "@src/components/frame/FrameErp";

const RouterOutlet = () => {
  return (
    <Routes>
      <Route path="/" element={<FrameMain />} errorElement={<ErrorPage />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route path="maps" element={<Maps />} />
          <Route path="erp" element={<FrameErp />}>
            <Route index element={<DashBoard />} />
            <Route path="erp01-Sub01" element={<ErpBase />} />
            <Route path="erp01-Sub02" element={<ErpApiTable />} />
            <Route path="erp02-Sub01" element={<ErpBase />} />
            <Route path="erp02-Sub02" element={<ErpBase />} />
            <Route path="erp03" element={<ErpBase />} />
            <Route path="erp04" element={<ErpBase />} />
          </Route>
          <Route path="guide" element={<Guide />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RouterOutlet;
