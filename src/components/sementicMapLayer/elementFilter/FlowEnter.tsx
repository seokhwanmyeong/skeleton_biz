import { Fragment, useContext, useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
//  Component
import BtnReset from "@components/sementicMapLayer/elementFilter/BtnReset";
import BtnBack from "@components/sementicMapLayer/elementFilter/BtnBack";
import AreaListBox from "@components/sementicMapLayer/elementFilter/AreaListBox";
import UpjongListBox from "@components/sementicMapLayer/elementFilter/UpjongListBox";
//  Api
import { apiMapArea } from "@api/biz/config";
//  State
import { atomFilterFlow } from "@states/sementicMap/stateFilter";
import {
  atomFlowEnterArea,
  atomSidoLi,
  atomSigunguLi,
} from "@states/sementicMap/stateMap";
//  Icon
import { IcoFilter } from "@assets/icons/icon";
//  Deco
import { DecoTop } from "@components/sementicMapLayer/elementDeco/Deco";
//  Type
import type { SlctProps, AreaProps } from "@states/sementicMap/stateMap";

const FlowEnter = () => {
  const { getSidoList, getSigunguList } = apiMapArea;
  const { state } = useContext(NaverMapContext);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const resetSlct = useResetRecoilState(atomFlowEnterArea);
  const [{ sido, sigungu }, setSlctArea] = useRecoilState(atomFlowEnterArea);
  const [sidoLi, setSidoLi] = useRecoilState(atomSidoLi);
  const [sigunguLi, setSigunguLi] = useRecoilState(atomSigunguLi);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterType, setType] = useState("");

  const pathTransHandler = (areaList: AreaProps[]) => {
    return areaList.map((area) => {
      let paths;

      if (
        area.code === "11" ||
        area.code === "22" ||
        area.code === "24" ||
        area.code === "25" ||
        area.code === "26" ||
        area.code === "29" ||
        area.code.length > 2
      ) {
        paths = area.path.map((latLng: [number, number][]) => {
          // if (area.code === "28" || area.code === "46") {
          //   return latLng.map(
          //     (depth: any) => new naver.maps.LatLng(depth[1], depth[0])
          //   );
          // } else {
          //   return new naver.maps.LatLng(latLng[1], latLng[0]);
          // }
          return latLng.map((depth: any) => {
            const trans = naver.maps.TransCoord.fromUTMKToLatLng(
              new naver.maps.Point(depth[0], depth[1])
            );
            return [trans.x, trans.y];
          });
        });
      } else {
        paths = area.path;
      }

      return {
        code: area.code,
        name: area.name,
        path: paths,
        lat: area.lat,
        lng: area.lng,
        zoomLev: area.zoomLev,
      };
    });
  };

  const getSidoHandler = () => {
    getSidoList().then((res: any) => {
      console.log(res);

      if (res.sido && res.sido.length > 0) {
        const transData = pathTransHandler(res.sido);
        console.log("transData", transData);
        setSidoLi(transData);
        return;
      } else {
        alert(`시/도 리스트를 불러올 수 없습니다. \n다시 시도해주세요`);
        return;
      }
    });
  };

  const getSigunguHandler = (slctCode: string) => {
    getSigunguList({ code: slctCode }).then((res: any) => {
      console.log(res);

      if (res.sigungu && res.sigungu.length > 0) {
        const transData = pathTransHandler(res.sigungu);
        console.log("transData", transData);
        setSigunguLi(transData);
        return;
      } else {
        alert(`시/군/구 리스트를 불러올 수 없습니다. \n다시 시도해주세요`);
        return;
      }
    });
  };

  useEffect(() => {
    if (sidoLi.length === 0) {
      getSidoHandler();
    }
  }, []);

  useEffect(() => {
    if (sido?.slctCode && sido?.slctName && sido?.slctIdx) {
      getSigunguHandler(sido.slctCode);
    }
  }, [sido]);

  useEffect(() => {
    if (
      sigungu?.slctCode &&
      sigungu?.slctName &&
      sigungu?.slctIdx &&
      sido?.slctCode
    ) {
      getSigunguHandler(sido.slctCode);
    }
  }, [sigungu]);

  return (
    <Fragment>
      {/* ------------------------------ 상단 ------------------------------*/}
      <Flex
        pos="absolute"
        top="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        gap="4rem"
      >
        <BtnBack
          onClick={() => {
            state.map?.setOptions({
              minZoom: 0,
              maxZoom: 16,
              scrollWheel: false,
            });
            resetSlct();
          }}
          disabled={!sido?.slctName}
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
            <Button
              variant="filterTopMain"
              onClick={() => {
                isOpen ? onClose() : onOpen();
              }}
            >
              {sido?.slctName ? "시/군/구를 선택하세요" : "시/도를 선택하세요"}
            </Button>
            <DecoTop width={"13rem"} />
          </Flex>
          {sido?.slctName && (
            <Text variant="filterTopArea">{sido.slctName}</Text>
          )}
          {sidoLi.length !== 0 && (
            <AreaListBox
              title="시/도 선택"
              isOpen={isOpen}
              list={
                sido?.slctCode && sigunguLi.length !== 0 ? sigunguLi : sidoLi
              }
              setSlctArea={(val: SlctProps) => {
                if (sido?.slctCode && sigunguLi.length !== 0) {
                  setSlctArea({
                    sido,
                    sigungu: val,
                  });

                  setFlow("sigungu");
                } else {
                  setSlctArea({
                    sido: val,
                    sigungu,
                  });
                }
              }}
            />
          )}
        </Flex>
        <UpjongListBox />
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
        <Tooltip
          hasArrow
          isDisabled={false}
          placement="auto"
          label="시군구까지 지역을 선택하셔야 합니다"
          p="1rem"
          borderRadius="base"
        >
          <Button
            variant="filterTop"
            isActive={filterType === "anal"}
            disabled
            onClick={() => {
              setType("anal");
            }}
          >
            <Box>
              <IcoFilter width="1.125rem" height="1.125rem" />
            </Box>
            분석필터
          </Button>
        </Tooltip>
        <BtnReset />
      </Flex>
    </Fragment>
  );
};

export default FlowEnter;
