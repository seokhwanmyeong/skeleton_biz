//  Lib
import { Fragment, useEffect, useState } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
//  Component
import FlowController from "@components/sementicMapLayer/elementFilter/FlowController";
import ModalBuilding from "@components/modal/map/ModalBuilding";
//  Deco
import {
  DecoBotBox,
  DecoFrameCenter,
  DecoFrameL,
  DecoFrameR,
} from "@components/sementicMapLayer/elementDeco/Deco";
//  Icon
import NiceFilter from "./NiceFilter";
import { BoxRanking } from "./BoxRanking";

const FlowInit = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [testData, setTestData] = useState<any[]>([]);

  useEffect(() => {
    setTestData([]);
  }, []);

  return (
    <Fragment>
      {/* ------------------------------ 상단 ------------------------------*/}
      {/* --------------------------- 중단 Frame ---------------------------*/}
      <Flex w="100%" h="100%" zIndex={1} gap="0.625rem" pointerEvents="none">
        <DecoFrameL pl="1rem">
          <Flex p="2px 0" h="100%" direction="column" gap="2px">
            <BoxRanking />
            <BoxRanking />
            <BoxRanking />
            <BoxRanking />
            <BoxRanking />
          </Flex>
        </DecoFrameL>
        <DecoFrameCenter />
        <DecoFrameR pr="1rem">
          <Flex p="2px 0" h="100%" direction="column" gap="2px">
            <BoxRanking direction="right" />
            <BoxRanking direction="right" />
            <BoxRanking direction="right" />
            <BoxRanking direction="right" />
            <BoxRanking direction="right" />
          </Flex>
        </DecoFrameR>
        <ModalBuilding onClose={onClose} isOpen={isOpen} />
      </Flex>
      {/* ------------------------------ 하단 ------------------------------*/}
      <DecoBotBox>
        <FlowController />
        <NiceFilter areaCode={"11010"} />
      </DecoBotBox>
    </Fragment>
  );
};

export default FlowInit;
