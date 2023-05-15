//  Lib
import { Fragment, useState, useEffect } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
//  Component
import UpjongListBox from "@components/sementicMapLayer/elementFilter/UpjongListBox";
import NiceFilterDepth from "@components/sementicMapLayer/elementFilter/NiceFilterDepth";
import BtnReset from "@components/sementicMapLayer/common/BtnReset";
import FlowPopInfo from "@components/sementicMapLayer/elementFilter/FlowPopInfo";
import DepthListBox from "@src/components/sementicMapLayer/elementFilter/DepthListBox";
//  State
import {
  atomUpjongState,
  infoComBrand,
  infoComFlowDepth,
  infoComBuilding,
  resetNiceDepth,
} from "@states/sementicMap/stateFilter";
import { atomSlctCustom } from "@states/sementicMap/stateMap";
import { sementicViewState } from "@states/sementicMap/stateView";
//  Icon
import { IcoAddBusiness, IcoAddChart } from "@assets/icons/icon";
//  Deco
import {
  DecoTop,
  DecoBotHightBox,
  DecoFilterDivider,
} from "@components/sementicMapLayer/elementDeco/Deco";
import {
  DecoFrameCenter,
  DecoFrameL,
  DecoFrameR,
} from "@components/sementicMapLayer/elementDeco/DecoCenter";

const FlowCustom = () => {
  const { top, mid, bot } = useRecoilValue(atomUpjongState);
  const {
    show: flowShow,
    active: flowActive,
    data: flowList,
  } = useRecoilValue(infoComFlowDepth);
  const {
    show: brandShow,
    active: brandActive,
    data: brandList,
  } = useRecoilValue(infoComBrand);
  const {
    show: buildShow,
    active: buildActive,
    filter: buildFilter,
    data: buildList,
  } = useRecoilValue(infoComBuilding);
  const cutomArea = useRecoilValue(atomSlctCustom);
  const setSv = useSetRecoilState(sementicViewState);
  const reset = useResetRecoilState(resetNiceDepth);
  const resetSv = useResetRecoilState(sementicViewState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterType, setType] = useState("");

  useEffect(() => {
    return () => {
      resetSv();
      reset();
    };
  }, []);

  return (
    <Fragment>
      {/* ------------------------------ 상단 ------------------------------*/}
      <Flex
        pos="absolute"
        top="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        gap={"4rem"}
      >
        <Flex
          pos="relative"
          pt="0.3rem"
          direction="column"
          justify="flex-start"
          color="#000000"
          gap="0.5rem"
        >
          <Flex pos="relative" direction="column">
            <Button variant="filterTopMain" cursor="unset">
              {cutomArea.slctName}
            </Button>
            <DecoTop width={"13rem"} />
          </Flex>
        </Flex>
        <Flex pos="absolute" right="-4rem">
          <UpjongListBox />
        </Flex>
      </Flex>
      {/* --------------------------- 중단 Frame ---------------------------*/}
      <Flex
        w="100%"
        h="100%"
        zIndex={1}
        gap="0.625rem"
        pointerEvents="none"
        justify="space-between"
      >
        <DecoFrameL pl="0.25rem" align="flex-end" w="20%">
          {flowActive && flowShow && <FlowPopInfo />}
        </DecoFrameL>
        <DecoFrameCenter w="60%" />
        <DecoFrameR pr="0.25rem" w="20%">
          {((brandShow && brandActive) || (buildShow && buildActive)) && (
            <DepthListBox
              brandShow={brandShow}
              brandList={brandList || []}
              buildShow={buildShow}
              buildList={buildList || []}
              buildFilter={buildFilter}
            />
          )}
        </DecoFrameR>
      </Flex>
      {/* ------------------------------ 하단 ------------------------------*/}
      <DecoBotHightBox gap="3rem">
        <Button
          variant="filterTop"
          isActive={isOpen}
          onClick={() => (isOpen ? onClose() : onOpen())}
        >
          <Box>
            <IcoAddBusiness width="1rem" height="1rem" />
          </Box>
          마켓데이터
        </Button>
        <DecoFilterDivider />
        <Button
          variant="filterTop"
          isDisabled={!(top.code && mid.code && bot.code)}
          onClick={() => {
            setSv({ props: cutomArea, viewId: "report" });
          }}
        >
          <Box>
            <IcoAddChart width="1rem" height="1rem" />
          </Box>
          리포트
        </Button>
        <DecoFilterDivider />
        <BtnReset />
      </DecoBotHightBox>
      {isOpen && <NiceFilterDepth areaInfo={cutomArea} />}
    </Fragment>
  );
};

export default FlowCustom;
