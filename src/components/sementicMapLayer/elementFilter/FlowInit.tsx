//  Lib
import { Fragment } from "react";
//  Component
import FlowController from "@components/sementicMapLayer/elementFilter/FlowController";
import { DecoBotBox } from "@components/sementicMapLayer/elementDeco/Deco";

const FlowInit = () => {
  return (
    <Fragment>
      {/* ------------------------------ 상단 ------------------------------*/}
      {/* ------------------------------ 하단 ------------------------------*/}
      <DecoBotBox>
        <FlowController />
      </DecoBotBox>
    </Fragment>
  );
};

export default FlowInit;
