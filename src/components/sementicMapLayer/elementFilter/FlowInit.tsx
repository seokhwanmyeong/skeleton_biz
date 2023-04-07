//  Lib
import { Flex } from "@chakra-ui/react";
//  Component
import FlowController from "@components/sementicMapLayer/elementFilter/FlowController";

const FlowInit = () => {
  return (
    <>
      {/* ------------------------------ 상단 ------------------------------*/}
      {/* ------------------------------ 하단 ------------------------------*/}
      <Flex
        pos="absolute"
        bottom="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        gap="4.25rem"
      >
        <FlowController />
      </Flex>
    </>
  );
};

export default FlowInit;
