//  Lib
import { Fragment, useContext, useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  Box,
  Button,
  Flex,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
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
  atomUpjongState,
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
  const { top, mid, bot } = useRecoilValue(atomUpjongState);
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
    <Fragment>
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
        align="center"
      >
        <DecoFrameL pl="1rem" w="20%" h="770px" align="flex-end">
          {dongRank && <BoxRankingDong rankData={dongRank} />}
          {flowActive && flowShow && <FlowPopInfo />}
        </DecoFrameL>
        <DecoFrameCenter activeAni={false} w="60%" h="770px" />
        <DecoFrameR pr="1rem" w="20%" h="770px">
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
        <Tooltip
          hasArrow
          isDisabled={bot.code ? true : false}
          placement="top"
          label="업종을 선택하셔야 합니다."
          p="0.5rem 0.75rem"
          bgColor="#595959d9"
          border="1px solid"
          borderColor="neutral.gray6"
          borderRadius="base"
          textStyle="base"
          fontSize="xs"
          fontWeight="strong"
          color="font.inverse"
        >
          <Button
            variant="filterTop"
            isDisabled={!(top.code && mid.code && bot.code)}
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
        </Tooltip>
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
    </Fragment>
  );
};

export default FlowDong;
