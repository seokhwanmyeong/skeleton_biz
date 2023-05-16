//  Lib
import {
  useContext,
  useEffect,
  useState,
  useRef,
  Fragment,
  useCallback,
} from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { NaverMapContext } from "@src/lib/src";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
//  Components
import ModalDaumAddr from "@components/modal/common/ModalDaumAddr";
//  State
import { atomFilterFlow } from "@states/sementicMap/stateFilter";
import { atomSlctCustom } from "@states/sementicMap/stateMap";
//  Util
import { calDist, calcPolyDistance } from "@util/map/distance";
//  Icons
import { IcoPolyline, IcoLineCurve, IcoDistance } from "@assets/icons/icon";
import markerIcon from "@assets/icons/marker.png";
import markerPoint from "@assets/icons/marker_point.png";
import markerAddr from "@assets/icons/marker_addr.png";
//  Ani
import { alertAnimation } from "@styles/animation/keyFremes";

const DrawAddr = () => {
  const { state } = useContext(NaverMapContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isConOpen,
    onOpen: onConOpen,
    onClose: onConClose,
  } = useDisclosure();
  const {
    isOpen: isInfoOpen,
    onOpen: onInfoOpen,
    onClose: onInfoClose,
  } = useDisclosure();
  const {
    isOpen: isAddrOpen,
    onOpen: onAddrOpen,
    onClose: onAddrClose,
  } = useDisclosure();
  const setFlow = useSetRecoilState(atomFilterFlow);
  const setSlceCustom = useSetRecoilState(atomSlctCustom);
  const resetSlctCustom = useResetRecoilState(atomSlctCustom);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [cursorPo, setCursorPo] = useState<any>(null);
  const [distance, setDistance] = useState<any>(null);
  const [addr, setAddr] = useState({
    address: "",
    point: {
      lat: 0,
      lng: 0,
    },
  });
  const polyRef = useRef<naver.maps.Polyline | null>(null);
  const markerRef = useRef<any[] | null>(null);
  const markerAddrRef = useRef<any>(null);
  const circleRef = useRef<naver.maps.Circle | null>(null);
  const eventRef = useRef<any>(null);
  const moveEventRef = useRef<any>(null);

  const resetDraw = () => {
    markerRef.current &&
      markerRef.current.map((marker: any) => marker.setMap(null));
    markerRef.current = [];
    polyRef.current?.setMap(null);
    polyRef.current = new naver.maps.Polyline({
      map: state.map,
      path: [],
      strokeColor: "#000000",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      clickable: true,
    });
    circleRef.current?.setMap(null);
    circleRef.current = new naver.maps.Circle({
      map: state.map,
      center: new naver.maps.LatLng(0, 0),
      radius: 0,
      strokeOpacity: 0,
      strokeWeight: 0,
      fillColor: "#000000",
      fillOpacity: 0.5,
    });
    setDistance(0);
    resetSlctCustom();
  };

  const resetAddr = () => {
    markerAddrRef.current?.setMap(null);
    markerAddrRef.current = null;
    naver.maps.Event.removeListener(eventRef.current);
    naver.maps.Event.removeListener(moveEventRef.current);
    eventRef.current = null;
    moveEventRef.current = null;
    setAddr({
      address: "",
      point: {
        lat: 0,
        lng: 0,
      },
    });
  };

  const resetAllElement = () => {
    markerRef.current &&
      markerRef.current.map((marker: any) => marker.setMap(null));
    markerRef.current = null;
    polyRef.current?.setMap(null);
    polyRef.current = null;
    markerAddrRef.current?.setMap(null);
    markerAddrRef.current = null;
    circleRef.current?.setMap(null);
    circleRef.current = null;
    naver.maps.Event.removeListener(eventRef.current);
    naver.maps.Event.removeListener(moveEventRef.current);
    eventRef.current = null;
    moveEventRef.current = null;
  };

  const activeEvent = (idx: number, activeAddr: boolean = false) => {
    if (activeIdx !== 2 && !activeAddr) {
      resetAddr();
    }
    if (activeIdx === idx) {
      setActiveIdx(-1);
    } else {
      setActiveIdx(idx);
    }
    markerRef.current &&
      markerRef.current.map((marker: any) => marker.setMap(null));
    markerRef.current = [];
    circleRef.current?.setRadius(0);
    naver.maps.Event.removeListener(eventRef.current);
    naver.maps.Event.removeListener(moveEventRef.current);
    eventRef.current = null;
    moveEventRef.current = null;
    isAddrOpen && onAddrClose();
    setDistance(0);
    circleRef.current?.setMap(null);
    polyRef.current?.setMap(null);

    const circle = new naver.maps.Circle({
      map: state.map,
      center: new naver.maps.LatLng(0, 0),
      radius: 0,
      strokeOpacity: 0,
      strokeWeight: 0,
      fillColor: "#000000",
      fillOpacity: 0.5,
    });
    const polyline = new naver.maps.Polyline({
      map: state.map,
      path: [],
      strokeColor: "#000000",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      clickable: false,
    });
    circleRef.current = circle;
    polyRef.current = polyline;

    if (idx === 0) {
      polyRef.current = polyline;
      const polyEvent = naver.maps.Event.addListener(
        state.map,
        "click",
        OnDrawPolygon
      );

      eventRef.current = polyEvent;
    } else if (idx === 2) {
      if (addr.address) {
        state.map?.setCenter(addr.point);
        let distance = 0;

        markerAddrRef.current && markerAddrRef.current?.setMap(null);

        const marker = new naver.maps.Marker({
          map: state.map,
          position: new naver.maps.LatLng(addr.point),
          icon: {
            url: markerAddr,
            size: new naver.maps.Size(30, 38),
            anchor: new naver.maps.Point(15, 15),
          },
        });

        markerAddrRef.current = marker;
        const moveEvent = naver.maps.Event.addListener(
          state.map,
          "mousemove",
          (e) => {
            if (markerAddrRef.current && e.latlng) {
              let point01 = markerAddrRef.current.getPosition();
              let point02 = e.latlng;

              distance = calDist(point01, point02);
              setDistance(distance);
            }

            setCursorPo(e.latlng);
            onInfoOpen();
          }
        );

        moveEventRef.current = moveEvent;
      } else {
        alert("주소를 입력해주세요");
      }
    }
  };

  const OnDrawPolygon = (e: any) => {
    if (polyRef.current === undefined) return;
    eventRef.current && naver.maps.Event.removeListener(eventRef.current);
    eventRef.current = [];
    const point: naver.maps.LatLng = e.coord;
    const path: any = polyRef.current?.getPath();
    setCursorPo(point);
    onInfoOpen();

    const marker = new naver.maps.Marker({
      map: state.map,
      position: point,
      icon: {
        url: markerPoint,
        size: new naver.maps.Size(8, 8),
        anchor: new naver.maps.Point(4, 4),
      },
    });

    const markerEvent = markerClickHandler(marker);
    const markerRightEvent = markerRightClickHandler(marker);
    markerRef.current && markerRef.current.push(marker);
    path.push(point);

    const polyMoveEvent = naver.maps.Event.addListener(
      state.map,
      "mousemove",
      (e) => {
        if (!markerRef.current) markerRef.current = [];
        if (!eventRef.current) eventRef.current = [];
        if (e.latlng) setCursorPo(e.latlng);

        const path: any = polyRef.current?.getPath();
        let distance = calcPolyDistance(path._array);
        setDistance(distance / 2);

        if (path.length === 1) {
          const marker = new naver.maps.Marker({
            map: state.map,
            position: e.latlng,
            icon: {
              url: markerPoint,
              size: new naver.maps.Size(8, 8),
              anchor: new naver.maps.Point(4, 4),
            },
          });
          const markerEvent = markerClickHandler(marker);
          const markerRightEvent = markerRightClickHandler(marker);

          path.push(e.latlng);
          markerRef.current.push(marker);
          eventRef.current.push(markerEvent);
          eventRef.current.push(markerRightEvent);
        } else if (path.length === 2) {
          path.splice(1, 1, e.latlng);
          const marker = markerRef.current[markerRef.current.length - 1];
          if (!marker?.__event_relations__?.click) {
            const markerEvent = markerClickHandler(marker);
            const markerRightEvent = markerRightClickHandler(marker);

            eventRef.current.push(markerEvent);
            eventRef.current.push(markerRightEvent);
          }
          marker.setPosition(e.latlng);
        } else if (path.length === 3) {
          path.splice(2, 1, e.latlng);
          const marker = markerRef.current[markerRef.current.length - 1];
          if (!marker?.__event_relations__?.click) {
            const markerEvent = markerClickHandler(marker);
            const markerRightEvent = markerRightClickHandler(marker);

            eventRef.current.push(markerEvent);
            eventRef.current.push(markerRightEvent);
          }
          marker.setPosition(e.latlng);
        } else if (path.length > 3) {
          path.splice(path.length - 2, 1, e.latlng);
          const marker = markerRef.current[markerRef.current.length - 1];
          if (!marker?.__event_relations__?.click) {
            const markerEvent = markerClickHandler(marker);
            const markerRightEvent = markerRightClickHandler(marker);

            eventRef.current.push(markerEvent);
            eventRef.current.push(markerRightEvent);
          }
          marker.setPosition(e.latlng);
        }

        onInfoOpen();
      }
    );

    if (eventRef.current) {
      eventRef.current.push(polyMoveEvent);
      eventRef.current.push(markerEvent);
      eventRef.current.push(markerRightEvent);
    } else {
      eventRef.current = [];
      eventRef.current.push(polyMoveEvent);
      eventRef.current.push(markerEvent);
      eventRef.current.push(markerRightEvent);
    }
  };

  const addrSlctHandler = (addr: any) => {
    const { address } = addr;
    // @ts-ignore
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result: any, status: any) => {
      // @ts-ignore
      if (status === kakao.maps.services.Status.OK) {
        const { x, y } = result[0];
        setAddr({
          address: address,
          point: {
            lat: y,
            lng: x,
          },
        });

        state.map?.setCenter({
          lat: y,
          lng: x,
        });
      }
    });
    onClose();
    onAddrOpen();
  };

  const markerClickHandler = useCallback(
    (marker: any) =>
      naver.maps.Event?.addListener(marker, "click", (e) => {
        const path: any = polyRef.current?.getPath();
        const point: naver.maps.LatLng = e.coord;
        const marker = new naver.maps.Marker({
          map: state.map,
          position: point,
          icon: {
            url: markerPoint,
            size: new naver.maps.Size(8, 8),
            anchor: new naver.maps.Point(5, 5),
          },
        });

        if (markerRef.current) {
          markerRef.current &&
            markerRef.current.length > 0 &&
            markerRef.current.forEach((marker) => {
              marker.setIcon({
                url: markerPoint,
                size: new naver.maps.Size(8, 8),
                anchor: new naver.maps.Point(4, 4),
              });
            });
          markerRef.current.push(marker);
        } else {
          markerRef.current = [];
          markerRef.current.push(marker);
        }
        if (path.length > 3) {
          path.pop();
          path.push(point);
          path.push(path._array[0]);
        } else if (path.length === 3) {
          path.push(point);
          path.push(path._array[0]);
        } else if (path.length === 2) {
          path.push(point);
        } else {
          path.push(point);
        }
      }),
    [polyRef.current]
  );

  const markerRightClickHandler = useCallback(
    (marker: any) =>
      naver.maps.Event?.addListener(marker, "rightclick", () => {
        if (markerRef.current) {
          const marker = markerRef.current[markerRef.current.length - 1];
          marker.setMap(null);

          if (eventRef.current) {
            naver.maps.Event.removeListener(eventRef.current);
            eventRef.current = null;
          }
          onInfoClose();
          onConOpen();
        }
      }),
    []
  );

  useEffect(() => {
    if (!addr.address) return;
    markerAddrRef.current && markerAddrRef.current?.setMap(null);

    const marker = new naver.maps.Marker({
      map: state.map,
      position: new naver.maps.LatLng(addr.point),
      icon: {
        url: markerIcon,
        size: new naver.maps.Size(21, 31),
        anchor: new naver.maps.Point(9, 22),
      },
    });

    markerAddrRef.current = marker;

    return () => {
      markerAddrRef.current?.setMap(null);
      markerAddrRef.current = null;
    };
  }, [addr, markerAddrRef]);

  useEffect(() => {
    if (!addr?.address || activeIdx !== 2 || !markerAddrRef?.current) return;
    const center = markerAddrRef.current.getPosition();
    circleRef.current?.setCenter(center);
    circleRef.current?.setRadius(distance);
    const tmp = naver.maps.Event?.addListener(state.map, "rightclick", () => {
      naver.maps.Event.removeListener(moveEventRef.current);
      naver.maps.Event.removeListener(tmp);
      onInfoClose();
      onConOpen();
    });
    return () => {
      naver.maps.Event.removeListener(tmp);
    };
  }, [addr, activeIdx, distance, markerAddrRef]);

  useEffect(() => {
    onConClose();
    setCursorPo(null);
  }, [activeIdx]);

  useEffect(() => {
    if (activeIdx === 0) {
      const path: any = polyRef.current?.getPath();
      if (path?.length && path.length > 3) {
        path?.splice(path.length - 2, 1);
      }
    }
  }, [isInfoOpen]);

  useEffect(() => {
    if (state.map === undefined) return;
    const circle = new naver.maps.Circle({
      map: state.map,
      center: new naver.maps.LatLng(0, 0),
      radius: 0,
      strokeOpacity: 0,
      strokeWeight: 0,
      fillColor: "#000000",
      fillOpacity: 0.5,
    });
    const polyline = new naver.maps.Polyline({
      map: state.map,
      path: [],
      strokeColor: "#000000",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      clickable: false,
    });
    circleRef.current = circle;
    polyRef.current = polyline;
    markerRef.current = [];
    resetSlctCustom();

    return () => {
      resetAllElement();
    };
  }, [state.map]);

  useEffect(() => {
    onOpen();

    return () => {
      onClose();
      resetAllElement();
    };
  }, []);

  return (
    <Fragment>
      <Flex
        pos="absolute"
        top="1rem"
        left="50%"
        transform="translateX(-50%)"
        direction="column"
      >
        {/* ------------------------------ 모달 ------------------------------*/}
        <ModalDaumAddr
          isOpen={isOpen}
          isCentered={true}
          onClose={() => {
            onClose();
            if (addr.address && !isAddrOpen) onAddrOpen();
          }}
          onComplete={addrSlctHandler}
        />
        {isConOpen && cursorPo && activeIdx !== -1 && (
          <OverlayView id={`confirmBox`} position={cursorPo} pane="floatPane">
            <Flex
              as={motion.div}
              animation={alertAnimation}
              pos="relative"
              top="0.5rem"
              left="0.5rem"
              p="1rem"
              w={distance <= 1000 ? "13rem" : "20rem"}
              direction="column"
              gap="0.5rem"
              bgColor="#FFFFFFD9"
              border="1px solid"
              borderColor="neutral.gray6"
              borderRadius="base"
            >
              <Flex gap="0.5rem">
                <Flex pt="0.25rem">
                  {activeIdx === 0 && !addr?.address ? (
                    <IcoPolyline
                      width="0.875rem"
                      height="0.875rem"
                      color="primary.type8"
                    />
                  ) : activeIdx === 1 && !addr?.address ? (
                    <IcoLineCurve
                      width="0.875rem"
                      height="0.875rem"
                      color="primary.type8"
                    />
                  ) : (
                    <IcoDistance
                      width="0.875rem"
                      height="0.875rem"
                      color="primary.type8"
                    />
                  )}
                </Flex>
                <Flex
                  p="0"
                  direction="column"
                  justify="flex-start"
                  align="flex-start"
                >
                  <Text
                    textStyle="base"
                    fontSize="sm"
                    fontWeight="strong"
                    color="font.primary"
                    lineHeight="normal"
                  >
                    {activeIdx === 0 ? "그리기" : "반경"}
                  </Text>
                  {distance <= 2000 ? (
                    <Text
                      textStyle="base"
                      fontSize="sm"
                      fontWeight="regular"
                      color="font.primary"
                      lineHeight="normal"
                    >
                      영역을 지정하시겠습니까?
                    </Text>
                  ) : (
                    <Text
                      textStyle="base"
                      fontSize="sm"
                      fontWeight="regular"
                      color="font.primary"
                      lineHeight="normal"
                    >
                      제한범위를 초과하셨습니다. 다시 그려주세요.
                    </Text>
                  )}
                </Flex>
              </Flex>
              <Flex justify="flex-end" align="center" gap="0.5rem">
                <Button
                  variant="infoBox"
                  aria-label="다시 그리기"
                  onClick={() => {
                    if (activeIdx === 2 || addr.address) {
                      onAddrOpen();
                      // resetDraw();
                      activeEvent(-1, true);
                      onConClose();
                    } else {
                      resetDraw();
                      onConClose();
                    }
                  }}
                >
                  <Text>다시 그리기</Text>
                </Button>
                {distance <= 2000 && (
                  <Button
                    variant="infoBox"
                    aria-label="영역확정"
                    isActive
                    onClick={() => {
                      if (activeIdx === 0) {
                        const path: any = polyRef.current?.getPath();
                        const bounds: any = polyRef.current?.getBounds();
                        const center: any = bounds?.getCenter();
                        // @ts-ignore
                        const geocoder = new kakao.maps.services.Geocoder();

                        if (!path || path.length - 1 <= 2) {
                          alert("영역을 제대로 설정해주세요");
                          return;
                        }

                        geocoder.coord2RegionCode(
                          center?._lng,
                          center?._lat,
                          (result: any) => {
                            setSlceCustom({
                              areaType: "polygon",
                              slctName: result[0].address_name || "",
                              slctPath: path._array,
                              range: undefined,
                              center: center,
                              pathType: "polygon",
                            });
                            onConClose();
                            resetAllElement();
                            setFlow("custom");
                          }
                        );
                      } else if (activeIdx === 1) {
                        if (!circleRef.current) {
                          alert("범위를 설정해주세요");
                          return;
                        }
                        const bounds: any = circleRef.current?.getBounds();
                        const range = circleRef.current?.getRadius();
                        const center: any = circleRef.current?.getCenter();
                        // @ts-ignore
                        const geocoder = new kakao.maps.services.Geocoder();

                        geocoder.coord2RegionCode(
                          center?._lng,
                          center?._lat,
                          (result: any) => {
                            setSlceCustom({
                              areaType: "circle",
                              slctName: result[0].address_name || "",
                              slctPath: bounds,
                              range: range,
                              center: center,
                              pathType: "circle",
                            });
                            onConClose();
                            resetAllElement();
                            setFlow("custom");
                          }
                        );
                      } else if (activeIdx === 2) {
                        if (!circleRef.current) {
                          alert("범위를 설정해주세요");
                          return;
                        }
                        const bounds: any = circleRef.current?.getBounds();
                        const range = circleRef.current?.getRadius();
                        const center: any = circleRef.current?.getCenter();

                        setSlceCustom({
                          areaType: "circle",
                          slctName: addr.address,
                          slctPath: bounds,
                          range: range,
                          center: center,
                          pathType: "circle",
                        });

                        onConClose();
                        resetAllElement();
                        setFlow("custom");
                      }
                    }}
                  >
                    <Text>영역지정</Text>
                  </Button>
                )}
              </Flex>
            </Flex>
          </OverlayView>
        )}
        {isInfoOpen && cursorPo && activeIdx !== -1 && (
          <OverlayView
            id={`infoBox`}
            position={cursorPo}
            pane="floatPane"
            anchorPoint={{ x: 16, y: 16 }}
          >
            <Flex
              as={motion.div}
              pos="relative"
              p="1rem"
              w="18.6rem"
              justify="flex-start"
              align="flex-start"
              bgColor="#FFFFFFD9"
              gap="0.5rem"
              border="1px solid"
              borderColor="neutral.gray6"
              borderRadius="base"
              transition="0.3s"
            >
              <Flex pt="0.25rem">
                <IcoDistance
                  width="0.875rem"
                  height="0.875rem"
                  color="#000000"
                />
              </Flex>
              <Flex
                p="0"
                direction="column"
                justify="flex-start"
                align="flex-start"
              >
                <Text
                  textStyle="base"
                  fontSize="sm"
                  fontWeight="strong"
                  lineHeight="normal"
                  transition="0.3s"
                  color={
                    distance > 2000 ? "system.default.red" : "font.primary"
                  }
                >
                  {activeIdx === 0
                    ? `그리기 (반경: ${distance?.toFixed(2)}m)`
                    : `반경 ${distance}m`}
                </Text>
                {distance > 2000 && (
                  <Text
                    textStyle="base"
                    fontSize="sm"
                    fontWeight="regular"
                    lineHeight="normal"
                    transition="0.3s"
                    color={
                      distance > 2000 ? "system.default.red" : "font.primary"
                    }
                  >
                    반경 2000m를 넘기실 수 없습니다.
                  </Text>
                )}
                <Text
                  textStyle="base"
                  fontSize="sm"
                  fontWeight="regular"
                  color="font.primary"
                  lineHeight="normal"
                >
                  마우스 오른쪽 버튼으로 마칠 수 있습니다.
                </Text>
              </Flex>
            </Flex>
          </OverlayView>
        )}
        {isAddrOpen && addr?.address && (
          <OverlayView
            id={`infoBox`}
            position={{ x: addr.point.lng, y: addr.point.lat }}
            pane="floatPane"
            anchorPoint={{ x: 16, y: -30 }}
          >
            <Flex
              as={motion.div}
              animation={alertAnimation}
              pos="relative"
              p="1rem"
              w="22rem"
              direction="column"
              bgColor="#FFFFFFD9"
              justify="center"
              align="flex-start"
              gap="0.5rem"
              border="1px solid"
              borderColor="neutral.gray6"
              borderRadius="base"
            >
              <Flex align="center" gap="0.5rem">
                <IcoDistance
                  width="0.875rem"
                  height="0.875rem"
                  color="primary.type7"
                />
                <Text
                  textStyle="base"
                  fontSize="sm"
                  fontWeight="strong"
                  color="font.primary"
                >
                  현재 주소지: {addr.address}
                </Text>
              </Flex>
              <Flex gap="0.5rem" ml="0.5rem">
                <Button
                  variant="infoBox"
                  aria-label="주소 재지정"
                  onClick={() => {
                    onAddrClose();
                    isOpen ? onClose() : onOpen();
                  }}
                >
                  <Text>주소지 재지정</Text>
                </Button>
                <Button
                  variant="infoBox"
                  isActive
                  aria-label="주소위치 영역그리기"
                  onClick={() => {
                    onAddrClose();
                    activeEvent(0, true);
                  }}
                >
                  <Text>영역그리기</Text>
                </Button>
                <Button
                  variant="infoBox"
                  isActive
                  aria-label="주소반경 그리기"
                  onClick={() => {
                    onAddrClose();
                    activeEvent(2, true);
                  }}
                >
                  <Text>주소지 반경 설정</Text>
                </Button>
              </Flex>
            </Flex>
          </OverlayView>
        )}
      </Flex>
    </Fragment>
  );
};

export default DrawAddr;
