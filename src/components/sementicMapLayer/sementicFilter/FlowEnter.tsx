import { useContext, useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
//  State
import { atomFilterFlow } from "@states/sementicMap/filterState";
import {
  atomFlowEnterArea,
  atomSidoLi,
  atomSigunguLi,
} from "@states/sementicMap/mapState";
//  Component
import BtnReset from "@src/components/sementicMapLayer/sementicFilter/BtnReset";
import BtnFlowCustom from "@components/sementicMapLayer/sementicFilter/BtnFlowCustom";
import BtnBack from "@components/sementicMapLayer/sementicFilter/BtnBack";
import DecoTop from "@components/sementicMapLayer/sementicFilter/DecoTop";
import AreaListBox from "@components/sementicMapLayer/sementicFilter/AreaListBox";
import NiceFilter from "@components/sementicMapLayer/sementicFilter/NiceFilter";
import UpjonListBox from "@components/sementicMapLayer/sementicFilter/UpjonListBox";
//  Icon
import { IcoBarChart, IcoErp, IcoFilter } from "@assets/icons/icon";
//  Sample
import sidoData from "@util/data/area/sido.json";
import sigunguData from "@util/data/area/sigungu.json";

const FlowEnter = () => {
  const { state } = useContext(NaverMapContext);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const resetSlct = useResetRecoilState(atomFlowEnterArea);
  const [{ sido, sigungu }, setSlctArea] = useRecoilState(atomFlowEnterArea);
  const [sidoLi, setSidoLi] = useRecoilState(atomSidoLi);
  const [sigunguLi, setSigunguLi] = useRecoilState(atomSigunguLi);
  const [slctLi, setSlctLi] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterType, setType] = useState("");

  const pathTransHandler = (
    areaList: { code: string; name: string; path: string }[]
  ) => {
    return areaList.map((area) => {
      const paths = Object.values(JSON.parse(area.path)).map((latLng: any) => {
        if (area.code === "28" || area.code === "46") {
          return latLng.map(
            (depth: any) => new naver.maps.LatLng(depth[1], depth[0])
          );
        } else {
          return new naver.maps.LatLng(latLng[1], latLng[0]);
        }
      });

      return { code: area.code, name: area.name, path: paths };
    });
  };

  const getSidoList = () => {
    const test = sidoData.map(({ code, name, polygon }) => {
      return {
        code: code,
        name: name,
        path: polygon,
      };
    });

    const transData = pathTransHandler(test);

    setSidoLi(transData);
  };

  const getSigunguList = (slctCode: string) => {
    const test = sigunguData
      .map(({ code, name, polygon, parent }: any) => {
        return {
          code: code,
          name: name,
          path: polygon,
          parent: parent,
        };
      })
      .filter((li: any) => li.parent === slctCode);

    const transData = pathTransHandler(test);

    setSigunguLi(transData);
  };

  useEffect(() => {
    if (sidoLi.length === 0) {
      getSidoList();
    }
  }, []);

  useEffect(() => {
    if (sido?.slctCode && sido?.slctName && sido?.slctIdx) {
      getSigunguList(sido.slctCode);
    }
  }, [sido]);

  useEffect(() => {
    if (
      sigungu?.slctCode &&
      sigungu?.slctName &&
      sigungu?.slctIdx &&
      sido?.slctCode
    ) {
      getSigunguList(sido.slctCode);
    }
  }, [sigungu]);

  return (
    <>
      {/* ------------------------------ 상단 ------------------------------*/}
      <Flex
        pos="absolute"
        top="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        gap="4rem"
      >
        <UpjonListBox />
        {sidoLi.length !== 0 && (
          <AreaListBox
            title="시/도 선택"
            isOpen={isOpen}
            list={sido?.slctCode && sigunguLi.length !== 0 ? sigunguLi : sidoLi}
            setSlctArea={(val: {
              slctName: string;
              slctCode: string;
              slctIdx: string;
              slctPath: any;
            }) => {
              if (sido?.slctCode && sigunguLi.length !== 0) {
                setSlctArea({
                  sido,
                  sigungu: val,
                });

                setFlow(1);
              } else {
                setSlctArea({
                  sido: val,
                  sigungu,
                });
              }
            }}
          />
        )}
        <Flex
          pos="relative"
          pt="0.3rem"
          direction="column"
          justify="flex-start"
          color="#000000"
          gap="0.5rem"
        >
          <Flex pos="relative" direction="column">
            {sido?.slctName && (
              <BtnBack
                onClick={() => {
                  resetSlct();
                  state.map?.setOptions({
                    minZoom: 0,
                    maxZoom: 16,
                    scrollWheel: false,
                  });
                }}
                disabled={!sido?.slctName}
              />
            )}
            <Button
              variant="filterTopMain"
              onClick={() => {
                isOpen ? onClose() : onOpen();
              }}
            >
              {sido?.slctName ? "시군구를 선택하세요" : "지역을 선택하세요"}
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
              setSlctArea={(val: {
                slctName: string;
                slctCode: string;
                slctIdx: string;
                slctPath: any;
              }) => {
                if (sido?.slctCode && sigunguLi.length !== 0) {
                  setSlctArea({
                    sido,
                    sigungu: val,
                  });

                  setFlow(1);
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
        <BtnFlowCustom />
      </Flex>
      {/* ------------------------------ 하단 ------------------------------*/}
      <Flex
        pos="absolute"
        bottom="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        gap="1.25rem"
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
            <IcoFilter />
          </Box>
          분석필터
        </Button>
        <Button
          variant="filterTop"
          isActive={filterType === "erp"}
          disabled
          onClick={() => {
            setType("erp");
          }}
        >
          <Box>
            <IcoErp />
          </Box>
          ERP 필터
        </Button>
        <BtnReset
          activeReset={false}
          onClick={() => {
            resetSlct();
          }}
        />
        <Button variant="filterTop" disabled onClick={() => {}}>
          <Box>
            <IcoBarChart />
          </Box>
          리포트
        </Button>
      </Flex>
      {filterType === "anal" && <NiceFilter />}
      {filterType === "erp" && (
        <Flex
          pos="absolute"
          bottom="calc(1% + 4.5rem)"
          left="50%"
          zIndex={999}
          transform="translateX(-50%)"
          gap="1.25rem"
        >
          <Button variant="filterTop" onClick={() => {}}>
            <Box>
              <IcoErp />
            </Box>
          </Button>
          <Button variant="filterTop" onClick={() => {}}>
            <Box>
              <IcoErp />
            </Box>
          </Button>
          <Button variant="filterTop" onClick={() => {}}>
            <Box>
              <IcoErp />
            </Box>
          </Button>
          <Button variant="filterTop" onClick={() => {}}>
            <Box>
              <IcoErp />
            </Box>
          </Button>
          <Button variant="filterTop" onClick={() => {}}>
            <Box>
              <IcoErp />
            </Box>
          </Button>
        </Flex>
      )}
    </>
  );
};

export default FlowEnter;