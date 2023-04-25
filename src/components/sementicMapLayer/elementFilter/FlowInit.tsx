//  Lib
import { Fragment } from "react";
//  Component
import FlowController from "@components/sementicMapLayer/elementFilter/FlowController";
//  Deco
import ToolBox from "./ToolBox";

const FlowInit = () => {
  return (
    <Fragment>
      {/* ------------------------------ 상단 ------------------------------*/}
      {/* --------------------------- 중단 Frame ---------------------------*/}
      {/* ------------------------------ 하단 ------------------------------*/}
      <ToolBox />
      <FlowController />
    </Fragment>
  );
};

export default FlowInit;
