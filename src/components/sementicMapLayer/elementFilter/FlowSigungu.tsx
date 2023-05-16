//  Lib
import { useContext, useEffect, useState } from "react";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { NaverMapContext } from "@src/lib/src";
//  Component
import UpjongListBox from "@components/sementicMapLayer/elementFilter/UpjongListBox";
import NiceFilter from "@components/sementicMapLayer/elementFilter/NiceFilter";
import BtnReset from "@components/sementicMapLayer/common/BtnReset";
import BtnBack from "@components/sementicMapLayer/common/BtnBack";
import { BoxRanking } from "@components/sementicMapLayer/elementFilter/BoxRanking";
//  Api
import { apiMapArea } from "@api/bizSub/config";
//  State
import {
  atomFilterFlow,
  infoComNiceRank,
  resetNice,
} from "@states/sementicMap/stateFilter";
import { atomFlowEnterArea, atomDongLi } from "@states/sementicMap/stateMap";
//  Icon
import { IcoFilter } from "@assets/icons/icon";
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

const FlowSigungu = () => {
  const { getDongList } = apiMapArea;
  const { state } = useContext(NaverMapContext);
  const [{ sido, sigungu }, setSlctArea] = useRecoilState(atomFlowEnterArea);
  const rankList = useRecoilValue(infoComNiceRank);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const setDongLi = useSetRecoilState(atomDongLi);
  const resetDongLi = useResetRecoilState(atomDongLi);
  const reset = useResetRecoilState(resetNice);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const getDongHandler = () => {
    if (sigungu?.slctCode) {
      getDongList({ ctyCd: sigungu.slctCode }).then((res) => {
        if (res.data && res.data.length > 0) {
          const addFeature = res.data.map((li, idx: number) => {
            const lat = li.center.split(" ")[2].slice(0, -2);
            const lng = li.center.split(" ")[1].slice(1, -1);
            const bounds = li?.bounds
              ?.split("((")[1]
              ?.split("))")[0]
              ?.split(", ")
              ?.map((li: string) => {
                const t = li.split(" ");
                return [Number(t[1]), Number(t[0])];
              });

            return {
              ...li,
              code: li.admiCd,
              name: li.admiNm,
              lat: Number(lat),
              lng: Number(lng),
              idx: idx,
              id: li._id,
              bounds: bounds || null,
              feature: {
                type: "Feature",
                properties: {
                  ...li,
                  code: li.admiCd,
                  name: li.admiNm,
                  lat: Number(lat),
                  lng: Number(lng),
                  bounds: bounds || null,
                  id: li._id,
                  feature: {
                    type: "Feature",
                    properties: {
                      ...li,
                      id: li._id,
                      code: li.admiCd,
                      name: li.admiNm,
                      lat: Number(lat),
                      lng: Number(lng),
                      bounds: bounds || null,
                    },
                    geometry: li.geometry,
                  },
                },
                geometry: {
                  ...li.geometry,
                  id: li._id,
                },
              },
            };
          });

          setDongLi(addFeature);
          return;
        } else {
          alert(`동 리스트를 불러올 수 없습니다. \n다시 시도해주세요`);
          return;
        }
      });
    }

    return;
  };

  useEffect(() => {
    if (sigungu?.slctCode) getDongHandler();
  }, [sigungu?.slctCode]);

  useEffect(() => {
    if (rankList.length > 0) {
      let left: any = [];
      let right: any = [];

      rankList.map((li: any) => {
        if (li.rank <= 5) {
          left.push(li);
        } else if (li.rank <= 10) {
          right.push(li);
        }
      });

      setLeft(left);
      setRight(right);
    } else {
      setLeft([]);
      setRight([]);
    }
  }, [rankList]);

  return (
    <>
      {/* ------------------------------ 상단 ------------------------------*/}
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
            setSlctArea({
              sido: sido,
              sigungu: {
                slctName: "",
                slctCode: "",
                slctIdx: "",
                slctPath: undefined,
                slctLat: undefined,
                slctLng: undefined,
                slctZoom: undefined,
                slctBounds: null,
              },
            });
            reset();
            resetDongLi();
            setFlow("enter");
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
              {sigungu?.slctName.replace(sido?.slctName || "", "")}
            </Button>
            <DecoTop width="13rem" />
          </Flex>
          {sido?.slctName && (
            <Text variant="filterTopArea">{sido.slctName}</Text>
          )}
        </Flex>
        <UpjongListBox />
      </Flex>
      {/* --------------------------- 중단 Frame ---------------------------*/}
      <Flex w="100%" h="100%" zIndex={1} gap="0.625rem" pointerEvents="none">
        <DecoFrameL pl="1rem" align="flex-end">
          <Flex
            p="2px 0"
            maxW="19.25rem"
            h="100%"
            direction="column"
            justify="space-between"
            gap="2px"
          >
            {left.length > 0 &&
              left.map((li: any, idx: number) => {
                return <BoxRanking key={`rank-left-${idx}`} rankData={li} />;
              })}
          </Flex>
        </DecoFrameL>
        <DecoFrameCenter />
        <DecoFrameR pr="1rem">
          <Flex
            p="2px 0"
            h="100%"
            direction="column"
            justify="space-between"
            gap="2px"
          >
            {right.length > 0 &&
              right.map((li: any, idx: number) => {
                return (
                  <BoxRanking
                    key={`rank-right-${idx}`}
                    rankData={li}
                    direction="right"
                  />
                );
              })}
          </Flex>
        </DecoFrameR>
      </Flex>
      {/* ------------------------------ 하단 ------------------------------*/}
      <DecoBotHightBox>
        <Button
          variant="filterTop"
          isActive={isOpen}
          onClick={() => (isOpen ? onClose() : onOpen())}
        >
          <Box>
            <IcoFilter width="1.125rem" height="1.125rem" />
          </Box>
          분석필터
        </Button>
        <DecoFilterDivider />
        <BtnReset />
      </DecoBotHightBox>
      {isOpen && sigungu?.slctCode && (
        <NiceFilter areaCode={sigungu.slctCode} />
      )}
    </>
  );
};

export default FlowSigungu;
