import { useContext, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
//  Api
import cubejsApi from "@api/cubeApi/config";
//  State
import { atomFilterFlow } from "@states/sementicMap/filterState";
import {
  atomFlowEnterArea,
  atomSidoLi,
  atomSigunguLi,
  resetHandler,
} from "@states/sementicMap/mapState";
import { NaverMapContext } from "@src/lib/src";
//  Component
import BtnReset from "@components/sementicMapLayer/mapElement/BtnReset";
import BtnFlowCustom from "@components/sementicMapLayer/mapElement/BtnFlowCustom";
import BtnBack from "@components/sementicMapLayer/mapElement/BtnBack";

const FlowEnter = () => {
  const { state } = useContext(NaverMapContext);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const reset = useSetRecoilState(resetHandler);
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
    if (sido.slctCode && sido.slctName && sido.slctIdx) {
      getSigunguList(sido.slctCode);
    }
  }, [sido]);

  useEffect(() => {
    if (sigungu.slctCode && sigungu.slctName && sigungu.slctIdx) {
      getSigunguList(sido.slctCode);
    }
  }, [sigungu]);

  return (
    <>
      <Flex
        pos="absolute"
        top="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
      >
        <Button
          onClick={() => {
            onClose();
          }}
          color="#000000"
        >
          업종
        </Button>
        <Flex
          pos="relative"
          direction="column"
          justify="center"
          color="#000000"
        >
          <BtnBack onClick={() => {}} disabled={!sido?.slctName} />
          <Button
            onClick={() => {
              isOpen ? onClose() : onOpen();
            }}
            color="#000000"
          >
            지역을 선택해주세요
          </Button>
          {sido?.slctName && <Text align="center">{sido.slctName}</Text>}
          {sido?.slctCode
            ? sigunguLi.length !== 0 &&
              isOpen && (
                <Flex
                  display={isOpen ? "flex" : "none"}
                  pos="absolute"
                  top="4rem"
                  left="50%"
                  transform="translateX(-50%)"
                  w="30rem"
                  wrap="wrap"
                >
                  {sigunguLi.map(
                    ({
                      name,
                      code,
                      path,
                    }: {
                      name: string;
                      code: string;
                      path: never[];
                    }) => {
                      return (
                        <Button
                          key={`key-${code}`}
                          color="#000000"
                          onClick={() => {
                            setSlctArea({
                              sigungu: {
                                slctName: name,
                                slctCode: code,
                                slctIdx: `area${code}`,
                                slctPath: path,
                              },
                              sido,
                            });
                            setFlow(1);
                          }}
                        >
                          {name}
                        </Button>
                      );
                    }
                  )}
                </Flex>
              )
            : sidoLi.length !== 0 &&
              isOpen && (
                <Flex
                  display={isOpen ? "flex" : "none"}
                  pos="absolute"
                  top="4rem"
                  left="50%"
                  transform="translateX(-50%)"
                  w="30rem"
                  wrap="wrap"
                >
                  {sidoLi.map(
                    ({
                      name,
                      code,
                      path,
                    }: {
                      name: string;
                      code: string;
                      path: never[];
                    }) => {
                      return (
                        <Button
                          key={`key-${code}`}
                          color="#000000"
                          onClick={() => {
                            setSlctArea({
                              sido: {
                                slctName: name,
                                slctCode: code,
                                slctIdx: `area${code}`,
                                slctPath: path,
                              },
                              sigungu,
                            });

                            state.map?.setOptions({
                              minZoom: 0,
                              maxZoom: 16,
                            });
                            state.map?.fitBounds(path);

                            let curZoom = state.map?.getZoom();

                            state.map?.setOptions({
                              minZoom: curZoom,
                              maxZoom: curZoom,
                            });
                          }}
                        >
                          {name}
                        </Button>
                      );
                    }
                  )}
                </Flex>
              )}
        </Flex>
        <BtnFlowCustom />
      </Flex>
      <Flex
        pos="absolute"
        bottom="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
      >
        <Button onClick={() => {}} color="#000000">
          분석필터
        </Button>
        <Button onClick={() => {}} color="#000000">
          ERP 필터
        </Button>
        <BtnReset />
        <Button onClick={() => {}} color="#000000">
          리포트
        </Button>
      </Flex>
    </>
  );
};

export default FlowEnter;
