import { useContext, useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
//  Api
import cubejsApi from "@api/cubeApi/config";
//  State
import { atomFilterFlow } from "@states/sementicMap/filterState";
import {
  atomFlowEnterArea,
  atomSidoLi,
  atomSigunguLi,
} from "@states/sementicMap/mapState";
import { NaverMapContext } from "@src/lib/src";
//  Component
import BtnReset from "@components/sementicMapLayer/mapElement/BtnReset";
import BtnFlowCustom from "@components/sementicMapLayer/mapElement/BtnFlowCustom";
import BtnBack from "@components/sementicMapLayer/mapElement/BtnBack";
import DecoTop from "@components/sementicMapLayer/mapElement/DecoTop";
//  Icon
import {
  IcoAppStore,
  IcoBarChart,
  IcoErp,
  IcoFilter,
} from "@assets/icons/icon";
import AreaListBox from "../mapElement/AreaListBox";

const FlowEnter = () => {
  const { state } = useContext(NaverMapContext);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const resetSlct = useResetRecoilState(atomFlowEnterArea);
  const [{ sido, sigungu }, setSlctArea] = useRecoilState(atomFlowEnterArea);
  const [sidoLi, setSidoLi] = useRecoilState(atomSidoLi);
  const [sigunguLi, setSigunguLi] = useRecoilState(atomSigunguLi);
  const [slctLi, setSlctLi] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    cubejsApi
      .load({
        dimensions: ["AreaSido.code", "AreaSido.name", "AreaSido.polygon"],
      })
      .then((res) => {
        const data = res.rawData().map((si: any) => {
          return {
            code: si["AreaSido.code"],
            name: si["AreaSido.name"],
            path: si["AreaSido.polygon"],
          };
        });
        if (data) {
          const transData = pathTransHandler(data);

          setSidoLi(transData);
        }
      });
  };

  const getSigunguList = (slctCode: string) => {
    cubejsApi
      .load({
        dimensions: ["AreaGungu.code", "AreaGungu.name", "AreaGungu.polygon"],
        filters: [
          {
            member: "AreaGungu.parent",
            operator: "equals",
            values: [slctCode],
          },
        ],
      })
      .then((res) => {
        const data = res.rawData().map((sigungu: any) => {
          return {
            code: sigungu["AreaGungu.code"],
            name: sigungu["AreaGungu.name"],
            path: sigungu["AreaGungu.polygon"],
          };
        });
        if (data) {
          const transData = pathTransHandler(data);

          setSigunguLi(transData);
        }
      });
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

  const upjong = {
    top: [
      "생활서비스",
      "소매/유통",
      "여가/오락",
      "음식",
      "의료/건강",
      "학문/교육",
    ],
    mid: {
      F: [
        "광고/인쇄/인화",
        "미용서비스",
        "법무세무회계",
        "부동산",
        "사우나/휴게시설",
        "세탁/가사서비스",
        "수리서비스",
        "예식/의례",
        "주유소/충전소",
        "차량관리",
      ],
    },
  };

  return (
    <>
      {/* ------------------------------ 상단 ------------------------------*/}
      <Flex
        pos="absolute"
        top="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        gap={sido?.slctName ? "3rem" : "2rem"}
      >
        <Button
          onClick={() => {
            onClose();
          }}
          variant="filterTop"
        >
          <Box>
            <IcoAppStore />
          </Box>
          업종
        </Button>
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
          pt="0.6rem"
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
            <DecoTop width={sido?.slctName ? "13rem" : "10rem"} />
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
          {/* {sido?.slctCode
            ? sigunguLi.length !== 0 && (
                <AreaListBox
                  title="시/군/구 선택"
                  isOpen={isOpen}
                  list={sigunguLi}
                  setSlctArea={(val: {
                    slctName: string;
                    slctCode: string;
                    slctIdx: string;
                    slctPath: any;
                  }) =>
                    setSlctArea({
                      sido,
                      sigungu: val,
                    })
                  }
                  onClick={() => {
                    setFlow(1);
                  }}
                />
              )
            : sidoLi.length !== 0 && (
                <AreaListBox
                  title="시/도 선택"
                  isOpen={isOpen}
                  list={
                    sido?.slctCode && sigunguLi.length !== 0
                      ? sigunguLi
                      : sidoLi
                  }
                  setSlctArea={(val: {
                    slctName: string;
                    slctCode: string;
                    slctIdx: string;
                    slctPath: any;
                  }) =>
                    sido?.slctCode && sigunguLi.length !== 0
                      ? setSlctArea({
                          sido,
                          sigungu: val,
                        })
                      : setSlctArea({
                          sido: val,
                          sigungu,
                        })
                  }
                />
              )} */}
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
        <Button variant="filterTop" onClick={() => {}}>
          <Box>
            <IcoFilter />
          </Box>
          분석필터
        </Button>
        <Button variant="filterTop" onClick={() => {}}>
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
        <Button variant="filterTop" onClick={() => {}}>
          <Box>
            <IcoBarChart />
          </Box>
          리포트
        </Button>
      </Flex>
    </>
  );
};

export default FlowEnter;
