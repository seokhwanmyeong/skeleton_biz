//  Lib
import { useContext, useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
//  Component
import UpjongListBox from "@components/sementicMapLayer/elementFilter/UpjongListBox";
import NiceFilterDepth from "@components/sementicMapLayer/elementFilter/NiceFilterDepth";
import BtnReset from "@components/sementicMapLayer/common/BtnReset";
import BtnBack from "@components/sementicMapLayer/common/BtnBack";
import { BoxRankingDong } from "@components/sementicMapLayer/elementFilter/BoxRanking";
import FlowPopInfo from "@components/sementicMapLayer/elementFilter/FlowPopInfo";
import DepthListBox from "@components/sementicMapLayer/elementFilter/DepthListBox";
//  State
import {
  atomFilterFlow,
  infoComBrand,
  infoComBuilding,
  infoComFlowDepth,
  infoComNiceRank,
  resetNiceDepth,
} from "@states/sementicMap/stateFilter";
import { atomFlowEnterArea, atomSlctDong } from "@states/sementicMap/stateMap";
import { sementicViewState } from "@states/sementicMap/stateView";
//  Icon
import { IcoAddBusiness, IcoAddChart } from "@assets/icons/icon";
//  Deco
import {
  DecoBotHightBox,
  DecoFilterDivider,
  DecoTop,
} from "@components/sementicMapLayer/elementDeco/Deco";
import {
  DecoFrameCenter,
  DecoFrameL,
  DecoFrameR,
} from "@components/sementicMapLayer/elementDeco/DecoCenter";
//  Type
import type { RankType } from "@states/sementicMap/stateFilter";

const FlowDong = () => {
  const { state } = useContext(NaverMapContext);
  const { sigungu } = useRecoilValue(atomFlowEnterArea);
  const dong = useRecoilValue(atomSlctDong);
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
    fitler: buildFilter,
    data: buildList,
  } = useRecoilValue(infoComBuilding);
  const rankList = useRecoilValue(infoComNiceRank);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const setSv = useSetRecoilState(sementicViewState);
  const reset = useResetRecoilState(resetNiceDepth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dongRank, setDongRank] = useState<RankType | null>(null);

  useEffect(() => {
    let rank;

    for (let i = 0; i < rankList.length; i++) {
      if (rankList[i].dongName === dong.slctName) {
        rank = rankList[i];
        break;
      }
    }
    if (rank) setDongRank(rank);

    return () => {
      setDongRank(null);
    };
  }, [rankList]);

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
            reset();
            setFlow("sigungu");
          }}
        />
        <Flex
          pos="relative"
          p="2px 0"
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
          {dongRank && <BoxRankingDong rankData={dongRank} />}
          {flowActive && flowShow && <FlowPopInfo />}
        </DecoFrameL>
        <DecoFrameCenter activeAni={false} w="60%" />
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
          onClick={() => {
            setSv({
              props: {
                areaType: "dong",
                slctCode: dong.slctCode,
                slctName: dong.slctName,
              },
              viewId: "report",
            });
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
