//  Lib
import { useContext, useEffect, useState } from "react";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { NaverMapContext } from "@src/lib/src";
//  Component
import UpjongListBox from "@components/sementicMapLayer/elementFilter/UpjongListBox";
import NiceFilter from "@components/sementicMapLayer/elementFilter/NiceFilter";
import BtnReset from "@components/sementicMapLayer/elementFilter/BtnReset";
import BtnBack from "@components/sementicMapLayer/elementFilter/BtnBack";
import { BoxRanking } from "@components/sementicMapLayer/elementFilter/BoxRanking";

//  Api
import { apiMapArea } from "@api/biz/config";
//  State
import { atomFilterFlow, resetNice } from "@states/sementicMap/stateFilter";
import { atomFlowEnterArea, atomDongLi } from "@states/sementicMap/stateMap";
//  Icon
import { IcoFilter } from "@assets/icons/icon";
//  Deco
import {
  DecoTop,
  DecoFrameL,
  DecoFrameCenter,
  DecoFrameR,
} from "@components/sementicMapLayer/elementDeco/Deco";
//  Type
import type { AreaProps } from "@states/sementicMap/stateMap";

const FlowSigungu = () => {
  const { getDongList } = apiMapArea;
  const { state } = useContext(NaverMapContext);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const [{ sido, sigungu }, setSlctArea] = useRecoilState(atomFlowEnterArea);
  const setDongLi = useSetRecoilState(atomDongLi);
  const reset = useResetRecoilState(resetNice);
  const [filterType, setType] = useState("");

  // const pathTransHandler = (
  //   areaList: AreaProps[]
  // ) => {
  //   return areaList.map((area) => {
  //     const paths = Object.values(JSON.parse(area.path)).map((latLng: any) => {
  //       if (area.code === "28" || area.code === "46") {
  //         return latLng.map(
  //           (depth: any) => new naver.maps.LatLng(depth[1], depth[0])
  //         );
  //       } else {
  //         return new naver.maps.LatLng(latLng[1], latLng[0]);
  //       }
  //     });

  //     return { code: area.code, name: area.name, num: area.num, path: paths };
  //   });
  // };

  const pathTransHandler = (areaList: AreaProps[]) => {
    return areaList.map((area, idx: number) => {
      const paths = area.path.map((latLng: [number, number][]) => {
        return latLng.map((depth: any) => {
          const trans = naver.maps.TransCoord.fromUTMKToLatLng(
            new naver.maps.Point(depth[0], depth[1])
          );
          return [trans.x, trans.y];
        });
      });

      return {
        code: area.code,
        name: area.name,
        num: area.code,
        path: paths,
        lat: area.lat,
        lng: area.lng,
        zoomLev: area.zoomLev,
      };
    });
  };

  const getDongHandler = () => {
    if (sigungu?.slctCode) {
      getDongList({ code: sigungu.slctCode }).then((res: any) => {
        console.log(res);

        if (res.dong && res.dong.length > 0) {
          const transData = pathTransHandler(res.dong);
          setDongLi(transData);
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
    getDongHandler();
  }, [sigungu?.slctCode]);

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
              sido,
              sigungu: {
                slctName: "",
                slctCode: "",
                slctIdx: "",
                slctPath: [],
              },
            });
            reset();
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
            <BoxRanking />
            <BoxRanking />
            <BoxRanking />
            <BoxRanking />
            <BoxRanking />
          </Flex>
        </DecoFrameL>
        <DecoFrameCenter />
        <DecoFrameR pr="1rem">
          <Flex
            p="2px 0"
            maxW="19.25rem"
            h="100%"
            direction="column"
            justify="space-between"
            gap="2px"
          >
            <BoxRanking direction="right" />
            <BoxRanking direction="right" />
            <BoxRanking direction="right" />
            <BoxRanking direction="right" />
            <BoxRanking direction="right" />
          </Flex>
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
          isActive={filterType === "anal"}
          onClick={() => {
            if (filterType === "anal") {
              setType("");
            } else {
              setType("anal");
            }
          }}
        >
          <Box>
            <IcoFilter width="1.125rem" height="1.125rem" />
          </Box>
          분석필터
        </Button>
        <BtnReset />
      </Flex>
      {filterType === "anal" && sigungu?.slctCode && (
        <NiceFilter areaCode={sigungu.slctCode} />
      )}
    </>
  );
};

export default FlowSigungu;
