//  Lib
import { Fragment } from "react";
import { Flex } from "@chakra-ui/react";
//  Component
import FlowController from "@components/sementicMapLayer/elementFilter/FlowController";
import {
  DecoBotBox,
  DecoFrameL,
  DecoFrameCenter,
  DecoFrameR,
} from "@components/sementicMapLayer/elementDeco/Deco";

const FlowInit = () => {
  return (
    <Fragment>
      {/* ------------------------------ 상단 ------------------------------*/}
      {/* --------------------------- 중단 Frame ---------------------------*/}
      <Flex w="100%" h="100%" zIndex={1} gap="0.625rem" pointerEvents="none">
        <DecoFrameL />
        <DecoFrameCenter />
        <DecoFrameR />
      </Flex>
      {/* ------------------------------ 하단 ------------------------------*/}
      <DecoBotBox>
        <FlowController />
      </DecoBotBox>
    </Fragment>
  );
};

export default FlowInit;
