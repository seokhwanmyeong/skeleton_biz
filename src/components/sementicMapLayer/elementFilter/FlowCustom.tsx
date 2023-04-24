//  Lib
import { useState, useEffect, Fragment } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
//  Component
import UpjonListBox from "@components/sementicMapLayer/elementFilter/UpjongListBox";
import NiceFilterDepth from "@components/sementicMapLayer/elementFilter/NiceFilterDepth";
import BtnReset from "@components/sementicMapLayer/elementFilter/BtnReset";
import { BoxRankingDong } from "@components/sementicMapLayer/elementFilter/BoxRanking";
import FlowPopInfo from "@components/sementicMapLayer/elementFilter/FlowPopInfo";
import DepthList from "@components/sementicMapLayer/elementFilter/DepthList";
//  State
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
} from "@components/sementicMapLayer/elementDeco/Deco";

type Props = {};

const FlowCustom = (props: Props) => {
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
          <UpjonListBox />
        </Flex>
      </Flex>
      {/* --------------------------- 중단 Frame ---------------------------*/}
      <Flex w="100%" h="100%" zIndex={1} gap="0.625rem" pointerEvents="none">
        <DecoFrameL pl="1rem" align="flex-end">
          <BoxRankingDong />
          <FlowPopInfo />
        </DecoFrameL>
        <DecoFrameCenter />
        <DecoFrameR pr="0.25rem">
          <DepthList />
        </DecoFrameR>
      </Flex>
      {/* ------------------------------ 하단 ------------------------------*/}
      <Flex
        pos="absolute"
        bottom="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        gap="4.25rem"
      >
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
        <Button
          variant="filterTop"
          onClick={() => {
            setSv({ props: null, viewId: "eval" });
          }}
        >
          <Box>
            <IcoBarChart />
          </Box>
          리포트
        </Button>
        <BtnReset />
      </Flex>
      {isOpen && <NiceFilterDepth path={cutomArea.slctPath} />}
    </Fragment>
  );
};

export default FlowCustom;
