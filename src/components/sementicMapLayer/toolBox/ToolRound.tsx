// Lib
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { NaverMapContext } from "@src/lib/src";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
//  Util
import { calDist } from "@util/map/distance";
//  Icon
import markerPointG from "@assets/icons/marker_point_green.png";
import { IcoLineCurve, IcoPolyline } from "@assets/icons/icon";
//  Ani
import { alertAnimation } from "@styles/animation/keyFremes";

type Props = {
  exitHandler: any;
  mouseEvent: any;
};

const ToolRound = ({ exitHandler, mouseEvent }: Props) => {
  const { state } = useContext(NaverMapContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isConOpen,
    onOpen: onConOpen,
    onClose: onConClose,
  } = useDisclosure();
  const [cursorPo, setCursorPo] = useState<any>(null);
  const [distance, setDistance] = useState<any>(null);
  const [rangeCenter, setRangeCenter] = useState<any>();
  const circleRef = useRef<naver.maps.Circle | undefined>();
  const markerRangeRef = useRef<any>();
  const polyRef = useRef<naver.maps.Polyline | undefined>();
  const markerCurRef = useRef<any>();
  const moveEventRef = useRef<any>();
  const eventRef = useRef<any>();
  const rightEventRef = useRef<any>();

  const activeEvent = () => {
    markerRangeRef.current?.setMap(null);
    markerRangeRef.current = null;
    circleRef.current?.setRadius(0);
    naver.maps.Event.removeListener(eventRef.current);
    naver.maps.Event.removeListener(moveEventRef.current);
    naver.maps.Event.removeListener(rightEventRef.current);
    eventRef.current = null;
    moveEventRef.current = null;
    rightEventRef.current = null;

    const rangeEvent = naver.maps.Event.addListener(
      state.map,
      "click",
      OnRangePolygon
    );

    eventRef.current = rangeEvent;
  };

  const resetDraw = () => {
    naver.maps.Event.removeListener(eventRef.current);
    naver.maps.Event.removeListener(moveEventRef.current);
    naver.maps.Event.removeListener(rightEventRef.current);
    eventRef.current = null;
    moveEventRef.current = null;
    rightEventRef.current = null;
    markerRangeRef.current?.setMap(null);
    markerRangeRef.current = null;
    markerCurRef.current?.setMap(null);
    markerCurRef.current = null;
    polyRef.current?.setMap(null);
    polyRef.current = undefined;
    circleRef.current?.setMap(null);
    circleRef.current = undefined;
    setDistance(0);
  };

  const OnRangePolygon = (e: any) => {
    if (!markerRangeRef.current) {
      const point: naver.maps.LatLng = e.coord;
      const marker = new naver.maps.Marker({
        map: state.map,
        position: point,
        icon: {
          url: markerPointG,
          size: new naver.maps.Size(14, 14),
          anchor: new naver.maps.Point(7, 8),
        },
      });
      const center = marker.getPosition();
      setRangeCenter(center);
      markerRangeRef.current = marker;
    }
  };

  useEffect(() => {
    if (markerRangeRef.current && rangeCenter) {
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
                  url: markerPointG,
                  size: new naver.maps.Size(14, 14),
                  anchor: new naver.maps.Point(7, 8),
                },
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
    }
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
        mouseEvent && naver.maps.Event.removeListener(mouseEvent);
        const doc = document
          ?.getElementsByClassName("map")[0]
          ?.getElementsByTagName("div")[0];
        doc.style.cursor = `auto`;
        naver.maps.Event.removeListener(rightHandler);
        naver.maps.Event.removeListener(eventRef.current);
        naver.maps.Event.removeListener(moveEventRef.current);
        onClose();
        onConOpen();
      }
    );

    rightEventRef.current = rightHandler;
  }, [distance, markerRangeRef, markerCurRef, moveEventRef]);

  useEffect(() => {
    if (state.map === undefined) return;
    const polyline = new naver.maps.Polyline({
      map: state.map,
      path: [],
      strokeColor: "#08979C",
      strokeOpacity: 1,
      strokeWeight: 2,
      clickable: false,
    });

    const circle = new naver.maps.Circle({
      map: state.map,
      center: new naver.maps.LatLng(0, 0),
      radius: 0,
      strokeColor: "#08979C",
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: "#08979C",
      fillOpacity: 0.15,
    });
    polyRef.current = polyline;
    circleRef.current = circle;
    activeEvent();

    return () => {
      resetDraw();
    };
  }, [state.map]);

  return (
    <Fragment>
      {isOpen && cursorPo && (
        <OverlayView
          id={`infoBox`}
          position={cursorPo}
          pane="floatPane"
          anchorPoint={{ x: 48, y: 16 }}
        >
          <Flex
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
                color="font.primary"
              >
                총 반경 : {distance * 2}m
              </Text>
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
      {isConOpen && cursorPo && (
        <OverlayView id={`confirmBox`} position={cursorPo} pane="floatPane">
          <Flex
            as={motion.div}
            animation={alertAnimation}
            pos="relative"
            top="0.5rem"
            left="0.5rem"
            p="1rem"
            w="auto"
            minW="13rem"
            direction="column"
            gap="0.5rem"
            bgColor="#FFFFFFD9"
            border="1px solid"
            borderColor="neutral.gray6"
            borderRadius="base"
          >
            <Flex gap="0.5rem">
              <Flex pt="0.25rem">
                <IcoPolyline
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
                  총 반경 : {distance?.toFixed(2)}m
                </Text>
              </Flex>
            </Flex>
            <Flex justify="flex-end" align="center" gap="0.5rem">
              <Button
                variant="infoBox"
                w="100%"
                aria-label="지우기"
                onClick={() => {
                  onConClose();
                  exitHandler();
                }}
              >
                <Text>지우기</Text>
              </Button>
            </Flex>
          </Flex>
        </OverlayView>
      )}
    </Fragment>
  );
};

export default ToolRound;
