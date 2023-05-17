// Lib
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { NaverMapContext } from "@src/lib/src";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
//  State
import { atomCreateArea } from "@states/sementicMap/stateMap";
//  Util
import { calDist } from "@util/map/distance";
//  Icon
import markerPoint from "@assets/icons/marker_point.png";
import markerRange from "@assets/icons/marker_range.png";
import { IcoLineCurve } from "@assets/icons/icon";
//  Ani
import { toolAnimation } from "@styles/animation/keyFremes";

type Props = {
  exitHandler: any;
};

const DrawRange = ({ modalOpen, setActiveIdx }: any) => {
  const { state } = useContext(NaverMapContext);
  const setCreateArea = useSetRecoilState(atomCreateArea);
  const circleRef = useRef<naver.maps.Circle | undefined>();
  const markerRangeRef = useRef<any>();
  const polyRef = useRef<naver.maps.Polyline | undefined>();
  const markerCurRef = useRef<any>(null);
  const moveEventRef = useRef<any>(null);
  const rangeEventRef = useRef<any>(null);
  const rightEventRef = useRef<any>(null);
  const mouseEventRef = useRef<any>(null);
  const [cursorPo, setCursorPo] = useState<any>(null);
  const [distance, setDistance] = useState<any>(null);
  const [rangeCenter, setRangeCenter] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isConOpen,
    onOpen: onConOpen,
    onClose: onConClose,
  } = useDisclosure();

  const activeEvent = () => {
    markerRangeRef.current?.setMap(null);
    markerRangeRef.current = null;
    circleRef.current?.setRadius(0);
    naver.maps.Event.removeListener(rangeEventRef.current);
    naver.maps.Event.removeListener(moveEventRef.current);
    naver.maps.Event.removeListener(rightEventRef.current);
    rangeEventRef.current = null;
    moveEventRef.current = null;
    rightEventRef.current = null;

    const rangeEvent = naver.maps.Event.addListener(
      state.map,
      "click",
      OnRangePolygon
    );

    rangeEventRef.current = rangeEvent;
  };

  const resetDraw = () => {
    naver.maps.Event.removeListener(rangeEventRef.current);
    naver.maps.Event.removeListener(moveEventRef.current);
    naver.maps.Event.removeListener(rightEventRef.current);
    naver.maps.Event.removeListener(mouseEventRef.current);
    rangeEventRef.current = null;
    moveEventRef.current = null;
    rightEventRef.current = null;
    mouseEventRef.current = null;
    markerRangeRef.current?.setMap(null);
    markerRangeRef.current = null;
    markerCurRef.current?.setMap(null);
    markerCurRef.current = null;
    polyRef.current?.setMap(null);
    circleRef.current?.setMap(null);
    const polyline = new naver.maps.Polyline({
      map: state.map,
      path: [],
      strokeColor: "#D9D9D9",
      strokeOpacity: 1,
      strokeWeight: 1,
      clickable: false,
      zIndex: 1,
    });

    const circle = new naver.maps.Circle({
      map: state.map,
      center: new naver.maps.LatLng(0, 0),
      radius: 0,
      strokeOpacity: 0,
      strokeWeight: 0,
      fillColor: "#000000",
      fillOpacity: 0.5,
      clickable: false,
    });
    polyRef.current = polyline;
    circleRef.current = circle;
    setCursorPo(null);
    setDistance(0);
    activeEvent();
  };

  const resetAllElement = () => {
    naver.maps.Event.removeListener(rangeEventRef.current);
    naver.maps.Event.removeListener(moveEventRef.current);
    naver.maps.Event.removeListener(rightEventRef.current);
    naver.maps.Event.removeListener(mouseEventRef.current);
    rangeEventRef.current = null;
    moveEventRef.current = null;
    rightEventRef.current = null;
    mouseEventRef.current = null;
    markerRangeRef.current?.setMap(null);
    markerRangeRef.current = null;
    markerCurRef.current?.setMap(null);
    markerCurRef.current = null;
    polyRef.current?.setMap(null);
    polyRef.current = undefined;
    circleRef.current?.setMap(null);
    circleRef.current = undefined;
    setCursorPo(null);
    setDistance(0);
  };

  const OnRangePolygon = (e: any) => {
    if (!markerRangeRef.current) {
      const point: naver.maps.LatLng = e.coord;
      const marker = new naver.maps.Marker({
        map: state.map,
        position: point,
        icon: {
          url: markerRange,
          size: new naver.maps.Size(30, 38),
          anchor: new naver.maps.Point(15, 15),
        },
      });
      const center = marker.getPosition();
      setRangeCenter(center);
      markerRangeRef.current = marker;
      naver.maps.Event.removeListener(mouseEventRef.current);
      mouseEventRef.current = null;
    }
  };

  useEffect(() => {
    if (!markerRangeRef.current || !rangeCenter) return;

    circleRef.current?.setCenter(rangeCenter);
    const moveEvent = naver.maps.Event.addListener(
      state.map,
      "mousemove",
      (e) => {
        if (markerRangeRef.current && e.latlng) {
          let centerPoint = markerRangeRef.current.getPosition();
          let distance = calDist(centerPoint, e.latlng);

          if (markerCurRef.current) {
            markerCurRef.current.setPosition(e.latlng);
            const path: any = polyRef.current?.getPath();
            if (!path) {
              return;
            } else if (path.length !== 2 && markerRangeRef.current) {
              let point = markerRangeRef.current.getPosition();
              path.push(point);
              path.push(e.latlng);
            } else {
              path.splice(1, 1, e.latlng);
            }
          } else {
            const marker = new naver.maps.Marker({
              map: state.map,
              position: e.latlng,
              icon: {
                url: markerPoint,
                size: new naver.maps.Size(8, 8),
                anchor: new naver.maps.Point(5, 5),
              },
              draggable: false,
            });

            markerCurRef.current = marker;
          }

          setDistance(distance);
          setCursorPo(e.latlng);
          onOpen();
        }
      }
    );

    moveEventRef.current = moveEvent;

    return () => {
      naver.maps.Event.removeListener(moveEvent);
    };
  }, [markerRangeRef, rangeCenter]);

  useEffect(() => {
    if (
      !(
        markerRangeRef?.current &&
        markerCurRef?.current &&
        moveEventRef.current
      )
    )
      return;

    const center = markerRangeRef.current.getPosition();
    circleRef.current?.setCenter(center);
    circleRef.current?.setRadius(distance);

    const rightHandler = naver.maps.Event?.addListener(
      markerCurRef.current,
      "rightclick",
      () => {
        naver.maps.Event.removeListener(mouseEventRef.current);
        mouseEventRef.current = null;
        const doc = document
          ?.getElementsByClassName("map")[0]
          ?.getElementsByTagName("div")[0];
        doc.style.cursor = `auto`;
        naver.maps.Event.removeListener(rightHandler);
        naver.maps.Event.removeListener(rangeEventRef.current);
        naver.maps.Event.removeListener(moveEventRef.current);
        onClose();
        onConOpen();
      }
    );

    rightEventRef.current = rightHandler;
    return () => {
      naver.maps.Event.removeListener(rightHandler);
    };
  }, [distance, markerRangeRef, markerCurRef, moveEventRef]);

  useEffect(() => {
    if (state.map === undefined) return;
    const doc = document
      ?.getElementsByClassName("map")[0]
      ?.getElementsByTagName("div")[0];

    const cursorPoint = naver.maps.Event.addListener(
      state?.map,
      "mousemove",
      (e) => {
        if (doc) doc.style.cursor = `pointer`;
      }
    );
    mouseEventRef.current = cursorPoint;

    const polyline = new naver.maps.Polyline({
      map: state.map,
      path: [],
      strokeColor: "#D9D9D9",
      strokeOpacity: 1,
      strokeWeight: 1,
      clickable: false,
      zIndex: 1,
    });

    const circle = new naver.maps.Circle({
      map: state.map,
      center: new naver.maps.LatLng(0, 0),
      radius: 0,
      strokeOpacity: 0,
      strokeWeight: 0,
      fillColor: "#000000",
      fillOpacity: 0.5,
      clickable: false,
    });
    polyRef.current = polyline;
    circleRef.current = circle;
    activeEvent();

    return () => {
      if (state.map) {
        naver.maps.Event.removeListener(cursorPoint);
        resetAllElement();
      }
    };
  }, [state.map]);

  return (
    <Fragment>
      {isConOpen && cursorPo && (
        <OverlayView
          id={`createConfirmBox`}
          position={cursorPo}
          pane="floatPane"
        >
          <Flex
            as={motion.div}
            animation={toolAnimation}
            pos="relative"
            top="0.5rem"
            left="0.5rem"
            p="1rem"
            w={distance <= 2000 ? "13rem" : "20rem"}
            direction="column"
            gap="0.5rem"
            bgColor="#FFFFFFD9"
            border="1px solid"
            borderColor="neutral.gray6"
            borderRadius="base"
          >
            <Flex gap="0.5rem">
              <Flex pt="0.25rem">
                <IcoLineCurve
                  width="0.875rem"
                  height="0.875rem"
                  color="primary.type8"
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
                  color="font.primary"
                  lineHeight="normal"
                >
                  반경
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
                  onClose();
                  onConClose();
                  resetDraw();
                }}
              >
                <Text>다시 그리기</Text>
              </Button>
              {distance <= 1000 && (
                <Button
                  variant="infoBox"
                  aria-label="영역확정"
                  isActive
                  onClick={() => {
                    if (!circleRef.current) {
                      alert("범위를 설정해주세요");
                      return;
                    }
                    const bounds: any = circleRef.current?.getBounds();
                    const range = circleRef.current?.getRadius();
                    const center: any = circleRef.current?.getCenter();

                    setCreateArea({
                      path: undefined,
                      center: center,
                      range: range,
                      pathType: "circle",
                    });
                    onConClose();
                    resetAllElement();
                    setActiveIdx(-1);
                    modalOpen();
                  }}
                >
                  <Text>영역지정</Text>
                </Button>
              )}
            </Flex>
          </Flex>
        </OverlayView>
      )}
      {isOpen && cursorPo && (
        <OverlayView
          id={`infoBox`}
          position={cursorPo}
          pane="floatPane"
          anchorPoint={{ x: 32, y: 16 }}
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
              <IcoLineCurve
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
                color={distance > 2000 ? "system.default.red" : "font.primary"}
              >
                반경 {distance}m
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
    </Fragment>
  );
};

export default DrawRange;
