//  Lib
import { useContext } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
//  Component
import UpjongListBox from "@components/sementicMapLayer/elementFilter/UpjongListBox";
import NiceFilterDepth from "@components/sementicMapLayer/elementFilter/NiceFilterDepth";
import BtnReset from "@components/sementicMapLayer/common/BtnReset";
import BtnBack from "@components/sementicMapLayer/common/BtnBack";
//  State
import { atomFilterFlow } from "@states/sementicMap/stateFilter";
import { atomFlowEnterArea, atomSlctDong } from "@states/sementicMap/stateMap";
import { sementicViewState } from "@states/sementicMap/stateView";
//  Icon
import { IcoBarChart, IcoFilter } from "@assets/icons/icon";
//  Deco
import {
  DecoBotHightBox,
  DecoFilterDivider,
  DecoTop,
} from "@components/sementicMapLayer/elementDeco/Deco";

const FlowDong = () => {
  const { state } = useContext(NaverMapContext);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const setSv = useSetRecoilState(sementicViewState);
  const { sigungu } = useRecoilValue(atomFlowEnterArea);
  const dong = useRecoilValue(atomSlctDong);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        pos="absolute"
        top="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        gap={"7rem"}
      >
        <BtnBack
          onClick={() => {
            state.map?.setOptions({
              minZoom: 0,
              maxZoom: 22,
              scrollWheel: false,
              draggable: false,
              disableDoubleClickZoom: false,
              disableDoubleTapZoom: false,
              disableTwoFingerTapZoom: false,
            });
            setFlow("sigungu");
          }}
        />
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
              {dong.slctName}
            </Button>
            <DecoTop width="13rem" />
          </Flex>
          {sigungu?.slctName && (
            <Text variant="filterTopArea">{sigungu?.slctName}</Text>
          )}
        </Flex>
        <UpjongListBox />
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
          분석필터
        </Button>
        <DecoFilterDivider />
        <Button
          variant="filterTop"
          onClick={() => {
            setSv({
              props: {
                areaType: "dong",
                areaCode: dong.slctCode,
                slctName: dong.slctName,
              },
              viewId: "eval",
            });
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
      {isOpen && (
        <NiceFilterDepth
          areaInfo={{
            areaType: "dong",
            slctName: dong.slctName,
            slctCode: dong.slctCode,
          }}
        />
      )}
    </>
  );
};

export default FlowDong;
