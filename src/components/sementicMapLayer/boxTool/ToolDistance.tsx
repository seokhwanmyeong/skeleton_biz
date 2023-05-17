// Lib
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { NaverMapContext } from "@src/lib/src";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
//  Icon
import markerPointRed from "@assets/icons/marker_point_red.png";
import { IcoLineCurve, IcoPolyline } from "@assets/icons/icon";
import cursorDis from "@assets/icons/cursorDistance.png";
//  Ani
import { alertAnimation } from "@styles/animation/keyFremes";

type Props = {
  exitHandler: any;
};

const ToolDistance = ({ exitHandler }: Props) => {
  const { state } = useContext(NaverMapContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isConOpen,
    onOpen: onConOpen,
    onClose: onConClose,
  } = useDisclosure();
  const [cursorPo, setCursorPo] = useState<any>(null);
  const [distance, setDistance] = useState<any>(null);
  const polyRef = useRef<naver.maps.Polyline | undefined>();
  const markerRef = useRef<any[]>([]);
  const eventRef = useRef<any[]>([]);
  const mouseEventRef = useRef<any>(null);

  const activeEvent = () => {
    markerRef.current.map((marker: any) => marker.setMap(null));
    markerRef.current = [];
    eventRef.current.map((event) => {
      naver.maps.Event.removeListener(event);
    });
    eventRef.current = [];

    polyRef.current?.setMap(null);

    const polyline = new naver.maps.Polyline({
      map: state.map,
      path: [],
      strokeColor: "#D4380D",
      strokeOpacity: 1,
      strokeWeight: 2,
      clickable: true,
    });

    polyRef.current = polyline;

    const polyEvent = naver.maps.Event.addListener(
      state.map,
      "click",
      OnDrawPolygon
    );

    eventRef.current.push(polyEvent);
  };

  const resetDraw = () => {
    eventRef.current.map((event) => {
      naver.maps.Event.removeListener(event);
    });
    eventRef.current = [];
    markerRef.current.map((marker: any) => marker.setMap(null));
    markerRef.current = [];
    polyRef.current?.setMap(null);
    polyRef.current = undefined;
    setDistance(0);
  };

  const OnDrawPolygon = (e: any) => {
    if (polyRef.current === undefined) return;

    const point: naver.maps.LatLng = e.coord;
    const path: any = polyRef.current?.getPath();
    setCursorPo(point);
    onOpen();

    const marker = new naver.maps.Marker({
      map: state.map,
      position: point,
      icon: {
        url: markerPointRed,
        size: new naver.maps.Size(14, 14),
        anchor: new naver.maps.Point(7, 7),
      },
    });

    const markerEvent = markerClickHandler(marker);
    const markerRightEvent = markerRightClickHandler(marker);
    markerRef.current.push(marker);
    path.push(point);

    const polyMoveEvent = naver.maps.Event.addListener(
      state.map,
      "mousemove",
      (e) => {
        if (e.latlng) setCursorPo(e.latlng);

        if (polyRef?.current) {
          let distance = polyRef?.current.getDistance();
          setDistance(distance);
        }

        if (path.length === 1) {
          const marker = new naver.maps.Marker({
            map: state.map,
            position: e.latlng,
            icon: {
              url: markerPointRed,
              size: new naver.maps.Size(14, 14),
              anchor: new naver.maps.Point(7, 7),
            },
          });
          const markerEvent = markerClickHandler(marker);
          const markerRightEvent = markerRightClickHandler(marker);

          path.push(e.latlng);
          markerRef.current.push(marker);
          eventRef.current.push(markerEvent);
          eventRef.current.push(markerRightEvent);
        } else if (path.length > 1) {
          path.splice(path.length - 1, 1, e.latlng);
          const marker = markerRef.current[markerRef.current.length - 1];
          if (!marker?.__event_relations__?.click) {
            const markerEvent = markerClickHandler(marker);
            const markerRightEvent = markerRightClickHandler(marker);

            eventRef.current.push(markerEvent);
            eventRef.current.push(markerRightEvent);
          }
          marker.setPosition(e.latlng);
        }
      }
    );

    eventRef.current.push(polyMoveEvent);
    eventRef.current.push(markerEvent);
    eventRef.current.push(markerRightEvent);
  };

  const markerClickHandler = useCallback(
    (marker: any) =>
      naver.maps.Event?.addListener(marker, "click", (e) => {
        const path: any = polyRef.current?.getPath();
        const point: naver.maps.LatLng = e.coord;
        path.push(point);
        const marker = new naver.maps.Marker({
          map: state.map,
          position: point,
          icon: {
            url: markerPointRed,
            size: new naver.maps.Size(14, 14),
            anchor: new naver.maps.Point(7, 7),
          },
        });
        markerRef.current.push(marker);
      }),
    []
  );

  const markerRightClickHandler = useCallback(
    (marker: any) =>
      naver.maps.Event?.addListener(marker, "rightclick", () => {
        const marker = markerRef.current[markerRef.current.length - 1];
        marker.setMap(null);
        eventRef.current.map((event) => {
          naver.maps.Event.removeListener(event);
        });
        eventRef.current = [];
        onClose();
        onConOpen();
      }),
    []
  );

  useEffect(() => {
    if (isConOpen) {
      const path: any = polyRef.current?.getPath();
      if (path?.length && path.length > 3) {
        path?.splice(path.length - 1, 1);
      }
    }
  }, [isConOpen]);

  useEffect(() => {
    if (state.map === undefined) return;
    const doc = document
      ?.getElementsByClassName("map")[0]
      ?.getElementsByTagName("div")[0];

    const cursorPoint = naver.maps.Event.addListener(
      state?.map,
      "mousemove",
      (e) => {
        if (doc) doc.style.cursor = `url(${cursorDis}) 2 2, auto`;
      }
    );
    mouseEventRef.current = cursorPoint;

    const polyline = new naver.maps.Polyline({
      map: state.map,
      path: [],
      strokeColor: "#000000",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      clickable: false,
    });

    polyRef.current = polyline;
    markerRef.current = [];
    activeEvent();

    return () => {
      resetDraw();
      naver.maps.Event.removeListener(cursorPoint);
      mouseEventRef.current = null;
      const doc = document
        ?.getElementsByClassName("map")[0]
        ?.getElementsByTagName("div")[0];
      if (doc) doc.style.cursor = `auto`;
    };
  }, [state.map]);

  useEffect(() => {
    return () => {
      resetDraw();
    };
  }, []);

  return (
    <Fragment>
      {isOpen && cursorPo && (
        <OverlayView
          id={`infoBox`}
          position={cursorPo}
          pane="floatPane"
          anchorPoint={{ x: 16, y: 16 }}
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
                총 거리 : {distance?.toFixed(2)}m
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
        <OverlayView id={`toolConfirmBox`} position={cursorPo} pane="floatPane">
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
                  총 거리 : {distance?.toFixed(2)}m
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

export default ToolDistance;
