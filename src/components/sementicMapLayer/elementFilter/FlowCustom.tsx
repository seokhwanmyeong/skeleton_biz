//  Lib
import { useState, useEffect, Fragment } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
//  Component
import UpjongListBox from "@components/sementicMapLayer/elementFilter/UpjongListBox";
import NiceFilterDepth from "@components/sementicMapLayer/elementFilter/NiceFilterDepth";
import BtnReset from "@components/sementicMapLayer/elementFilter/BtnReset";
import FlowPopInfo from "@components/sementicMapLayer/elementFilter/FlowPopInfo";
import DepthList from "@src/components/sementicMapLayer/elementFilter/DepthListBox";
//  State
import {
  atomUpjongState,
  infoComBrand,
  infoComFloatPop,
  infoComFlowDepth,
} from "@states/sementicMap/stateFilter";
import { atomSlctCustom } from "@states/sementicMap/stateMap";
import { sementicViewState } from "@states/sementicMap/stateView";
//  Icon
import { IcoBarChart, IcoFilter } from "@assets/icons/icon";
//  Deco
import {
  DecoTop,
  DecoFrameCenter,
  DecoFrameL,
  DecoFrameR,
  DecoBotHightBox,
  DecoFilterDivider,
} from "@components/sementicMapLayer/elementDeco/Deco";

type Props = {};

const FlowCustom = (props: Props) => {
  const { show, data: brandList } = useRecoilValue(infoComBrand);
  const { show: brandShow } = useRecoilValue(infoComFlowDepth);
  const { top, mid, bot } = useRecoilValue(atomUpjongState);
  const cutomArea = useRecoilValue(atomSlctCustom);
  const setSv = useSetRecoilState(sementicViewState);
  const resetSv = useResetRecoilState(sementicViewState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterType, setType] = useState("");

  useEffect(() => {
    return () => {
      resetSv();
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
        <DecoFrameL pl="1rem" align="flex-end">
          {brandShow && <FlowPopInfo />}
        </DecoFrameL>
        {/* <DecoFrameCenter /> */}
        <DecoFrameR pr="0.25rem">
          <DepthList brandShow={show} brandList={brandList || []} />
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
            <IcoFilter />
          </Box>
          마켓데이터
        </Button>
        <DecoFilterDivider />
        <Button
          variant="filterTop"
          isDisabled={!(top.code && mid.code && bot.code)}
          onClick={() => {
            setSv({ props: cutomArea, viewId: "eval" });
          }}
        >
          <Box>
            <IcoBarChart />
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
