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
import BtnReset from "@components/sementicMapLayer/common/BtnReset";
import BtnBack from "@components/sementicMapLayer/common/BtnBack";
import AreaListBox from "@components/sementicMapLayer/elementFilter/AreaListBox";
import UpjongListBox from "@components/sementicMapLayer/elementFilter/UpjongListBox";
//  Api
import { apiMapArea } from "@api/bizSub/config";
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
import {
  DecoBotHightBox,
  DecoFilterDivider,
  DecoTop,
} from "@components/sementicMapLayer/elementDeco/Deco";
//  Type
import type { SlctProps, AreaProps } from "@states/sementicMap/stateMap";
import { TypeMapSido } from "@src/api/bizSub/type";

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

  // const pathTransHandler = (areaList: TypeMapSido["res"][]) => {
  //   return areaList.map(
  //     ({
  //       _id,
  //       megaNm,
  //       megaCd,
  //       center,
  //       bounds,
  //       ctyCd,
  //       ctyNm,
  //       admiCd,
  //       admiNm,
  //       zoomLevel,
  //       geometry,
  //     }) => {
  //       const lat = Number(center.split(" ")[2].slice(0, -2));
  //       const lng = Number(center.split(" ")[1].slice(1, -1));
  //       // let paths = area.path.map((latLng: [number, number][]) => {
  //       //   // if (area.code === "28" || area.code === "46") {
  //       //   //   return latLng.map(
  //       //   //     (depth: any) => new naver.maps.LatLng(depth[1], depth[0])
  //       //   //   );
  //       //   // } else {
  //       //   //   return new naver.maps.LatLng(latLng[1], latLng[0]);
  //       //   // }
  //       //   return latLng.map((depth: any) => {
  //       //     const trans = naver.maps.TransCoord.fromUTMKToLatLng(
  //       //       new naver.maps.Point(depth[0], depth[1])
  //       //     );
  //       //     return [trans.x, trans.y];
  //       //   });
  //       // });

  //       return {
  //         code: megaCd && ctyCd ? ctyCd : megaCd,
  //         name: megaNm && ctyNm ? ctyNm : megaNm,
  //         path: geometry?.coordinates || [],
  //         lat: lat,
  //         lng: lng,
  //         zoomLevel: zoomLevel,
  //       };
  //     }
  //   );
  // };

  const getSidoHandler = () => {
    getSidoList({}).then((res) => {
      console.log(res);

      if (res.data && res.data.length > 0) {
        const addFeature = res.data.map((li, idx: number) => {
          const lat = li.center.split(" ")[2].slice(0, -2);
          const lng = li.center.split(" ")[1].slice(1, -1);

          return {
            ...li,
            code: li.megaCd,
            name: li.megaNm,
            lat: lat,
            lng: lng,
            idx: idx,
            feature: {
              type: "Feature",
              properties: {
                ...li,
                code: li.megaCd,
                name: li.megaNm,
                lat: lat,
                lng: lng,
                idx: idx,
                feature: {
                  type: "Feature",
                  properties: {
                    ...li,
                    code: li.megaCd,
                    name: li.megaNm,
                    idx: idx,
                    lat: lat,
                    lng: lng,
                  },
                  geometry: li.geometry,
                },
              },
              geometry: li.geometry,
            },
          };
        });

        setSidoLi(addFeature);
        return;
      } else {
        alert(`시/도 리스트를 불러올 수 없습니다. \n다시 시도해주세요`);
        return;
      }
    });
  };

  const getSigunguHandler = (slctCode: string) => {
    getSigunguList({ megaCd: slctCode }).then((res) => {
      console.log(res);

      if (res.data && res.data.length > 0) {
        const addFeature = res.data.map((li, idx: number) => {
          const lat = li.center.split(" ")[2].slice(0, -2);
          const lng = li.center.split(" ")[1].slice(1, -1);

          return {
            ...li,
            code: li.ctyCd,
            name: li.ctyNm,
            lat: lat,
            lng: lng,
            idx: idx,
            feature: {
              type: "Feature",
              properties: {
                ...li,
                code: li.ctyCd,
                name: li.ctyNm,
                lat: lat,
                lng: lng,
                idx: idx,
                feature: {
                  type: "Feature",
                  properties: {
                    ...li,
                    code: li.ctyCd,
                    name: li.ctyNm,
                    idx: idx,
                    lat: lat,
                    lng: lng,
                  },
                  geometry: li.geometry,
                },
              },
              geometry: li.geometry,
            },
          };
        });

        setSigunguLi(addFeature);
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

  // useEffect(() => {
  //   if (
  //     sigungu?.slctCode &&
  //     sigungu?.slctName &&
  //     sigungu?.slctIdx &&
  //     sido?.slctCode
  //   ) {
  //     getSigunguHandler(sido.slctCode);
  //   }
  // }, [sigungu]);

  return (
    <Fragment>
      {/* ------------------------------ 상단 ------------------------------*/}
      <Flex
        pos="absolute"
        top="0.75rem"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        gap="4rem"
      >
        <BtnBack
          onClick={() => {
            state.map?.setOptions({
              minZoom: 0,
              maxZoom: 22,
              scrollWheel: false,
            });
            resetSlct();
          }}
          disabled={!sido?.slctName}
        />
        <Flex
          pos="relative"
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
              title={sido?.slctCode ? "시/군/구 선택" : "시/도 선택"}
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
        <UpjongListBox relateOpen={isOpen} relateSetClose={onClose} />
      </Flex>
      {/* ------------------------------ 하단 ------------------------------*/}
      <DecoBotHightBox>
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
        <DecoFilterDivider />
        <BtnReset />
      </DecoBotHightBox>
    </Fragment>
  );
};

export default FlowEnter;
