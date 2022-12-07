//  Lib
import { Route, Routes } from "react-router-dom";
//  Pages
import Home from "@page/Home";
import Maps from "@page/Maps";
import DashBoard from "@src/page/erp/DashBoard";
import ErpBaseTable from "@src/page/erp/ErpBaseTable";
import ErpBaseApi from "@src/page/erp/ErpBaseApi";
import ErpPop from "@src/page/erp/ErpPop";
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
            <Route path="erp01-Sub01" element={<ErpBaseTable />} />
            <Route path="erp01-Sub02" element={<ErpBaseApi />} />
            <Route path="erp02-Sub01" element={<ErpBaseTable />} />
            <Route path="erp02-Sub02" element={<ErpBaseApi />} />
            <Route path="erp03" element={<ErpPop />} />
            <Route path="erp04" element={<ErpBaseTable />} />
          </Route>
          <Route path="guide" element={<Guide />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RouterOutlet;
