//  Lib
import { useContext, useState, useEffect, useCallback, useRef } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
//  Component
import UpjongListBox from "@components/sementicMapLayer/elementFilter/UpjongListBox";
import NiceFilterDepth from "@components/sementicMapLayer/elementFilter/NiceFilterDepth";
import ErpFilter from "@components/sementicMapLayer/elementFilter/ErpFilter";
import BtnReset from "@components/sementicMapLayer/elementFilter/BtnReset";
import BtnBack from "@components/sementicMapLayer/elementFilter/BtnBack";
import DrawTools from "@components/sementicMapLayer/elementFilter/DrawTools";
import FlowPopInfo from "@components/sementicMapLayer/elementFilter/FlowPopInfo";
import { BoxRankingDong } from "@components/sementicMapLayer/elementFilter/BoxRanking";
import DepthListBox from "@src/components/sementicMapLayer/elementFilter/DepthListBox";
//  State
import {
  atomFilterFlow,
  infoComBrand,
  infoComFlowDepth,
  infoComNiceRank,
} from "@states/sementicMap/stateFilter";
import { atomFlowEnterArea, atomSlctDong } from "@states/sementicMap/stateMap";
import { sementicViewState } from "@states/sementicMap/stateView";
//  Icon
import { IcoBarChart, IcoErp, IcoFilter } from "@assets/icons/icon";
//  Deco
import {
  DecoBotHightBox,
  DecoFilterDivider,
  DecoFrameCenter,
  DecoFrameL,
  DecoFrameR,
  DecoTop,
} from "@components/sementicMapLayer/elementDeco/Deco";
import sample from "@src/util/data/sampleBuilding";
//  Type
import type { RankType } from "@states/sementicMap/stateFilter";

type Props = {};

const FlowDong = (props: Props) => {
  const { state } = useContext(NaverMapContext);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const setSv = useSetRecoilState(sementicViewState);
  const resetSv = useResetRecoilState(sementicViewState);
  const { sigungu } = useRecoilValue(atomFlowEnterArea);
  const dong = useRecoilValue(atomSlctDong);
  const rankList = useRecoilValue(infoComNiceRank);
  const { active, show } = useRecoilValue(infoComFlowDepth);
  const { data: brandList } = useRecoilValue(infoComBrand);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [centerView, setCenterView] = useState<boolean>(true);
  const [dongRank, setDongRank] = useState<RankType | null>(null);

  useEffect(() => {
    const dongName = dong.slctName.replace(`${sigungu?.slctName} `, "");
    let rank;

    for (let i = 0; i < rankList.length; i++) {
      if (rankList[i].dongName === dongName) {
        rank = rankList[i];
        break;
      }
    }
    if (rank) setDongRank(rank);
  }, [rankList]);

  useEffect(() => {
    const zoomHandler = naver.maps.Event.addListener(
      state.map,
      "zoom_changed",
      (zoom) => {
        const min = state.map?.getMinZoom() || 16;
        zoom > min ? setCenterView(false) : setCenterView(true);
      }
    );

    setCenterView(true);

    return () => {
      resetSv();
      naver.maps.Event.removeListener(zoomHandler);
    };
  }, []);

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
              {dong.slctName.replace(sigungu?.slctName, "")}
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
      <Flex w="100%" h="100%" zIndex={1} gap="0.625rem" pointerEvents="none">
        <DecoFrameL pl="1rem" align="flex-end">
          {active && show && <FlowPopInfo />}
          {dongRank && <BoxRankingDong rankData={dongRank} />}
        </DecoFrameL>
        <DecoFrameCenter isOpen={centerView} activeAni={false} />
        <DecoFrameR pr="0.25rem">
          <DepthListBox brandList={brandList || []} />
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
          분석필터
        </Button>
        <DecoFilterDivider />
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
        <DecoFilterDivider />
        <BtnReset />
      </DecoBotHightBox>
      {isOpen && <NiceFilterDepth path={dong.slctPath} />}
    </>
  );
};

export default FlowDong;
