//  Lib
import {
  Fragment,
  useState,
  useRef,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { useSetRecoilState, useResetRecoilState } from "recoil";
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Marker, NaverMapContext } from "@src/lib/src";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
//  State
import { atomCreateArea } from "@states/sementicMap/stateMap";
//  Util
import { calcPolyDistance } from "@util/map/distance";
//  Icon
import { IcoPolyline } from "@assets/icons/icon";
import markerPoint from "@assets/icons/marker_point.png";
import markerWithPoint from "@assets/icons/marker_pointSet.png";
//  Ani
import { alertAnimation } from "@styles/animation/keyFremes";

type Props = {};

const DrawPolygon = ({ modalOpen, setActiveIdx }: any) => {
  const { state } = useContext(NaverMapContext);
  const setCreateArea = useSetRecoilState(atomCreateArea);
  const polyRef = useRef<naver.maps.Polyline | null>();
  const markerRef = useRef<any[] | null>([]);
  const eventRef = useRef<any[] | null>([]);
  const [cursorPo, setCursorPo] = useState<any>(null);
  const [distance, setDistance] = useState<any>(null);
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

  const resetAllElement = () => {
    markerRef.current &&
      markerRef.current.map((marker: any) => marker.setMap(null));
    markerRef.current = null;
    polyRef.current?.setMap(null);
    polyRef.current = null;
    eventRef.current &&
      eventRef.current.map((event: any) =>
        naver.maps.Event.removeListener(event)
      );
    eventRef.current = null;
  };

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
    setDistance(0);
    activeEvent();
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
            eventRef.current.map((event) => {
              naver.maps.Event.removeListener(event);
            });
            eventRef.current = null;
          }
          onInfoClose();
          onConOpen();
        }
      }),
    []
  );

  const activeEvent = () => {
    markerRef.current &&
      markerRef.current.map((marker: any) => marker.setMap(null));
    markerRef.current = [];
    eventRef.current &&
      eventRef.current.map((event) => {
        naver.maps.Event.removeListener(event);
      });
    eventRef.current = [];
    setDistance(0);

    polyRef.current?.setMap(null);

    const polyline = new naver.maps.Polyline({
      map: state.map,
      path: [],
      strokeColor: "#000000",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      clickable: true,
    });

    polyRef.current = polyline;

    polyRef.current = polyline;
    const polyEvent = naver.maps.Event.addListener(
      state.map,
      "click",
      OnDrawPolygon
    );

    eventRef.current.push(polyEvent);
  };

  const OnDrawPolygon = (e: any) => {
    if (polyRef.current === undefined) return;
    eventRef.current &&
      eventRef.current.map((event) => {
        naver.maps.Event.removeListener(event);
      });
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

  useEffect(() => {
    const path: any = polyRef.current?.getPath();
    if (path?.length && path.length > 3) {
      path?.splice(path.length - 2, 1);
    }
  }, [isInfoOpen]);

  useEffect(() => {
    if (state.map === undefined) return;
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
      resetAllElement();
    };
  }, [state.map]);

  useEffect(() => {
    return () => {
      if (state.map) {
        resetAllElement();
      }
    };
  }, []);

  return (
    <Fragment>
      {isConOpen && cursorPo && (
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
                  그리기
                </Text>
                {distance <= 1000 ? (
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
                  resetDraw();
                  onConClose();
                  onInfoClose();
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
                    const path: any = polyRef.current?.getPath();
                    const bounds: any = polyRef.current?.getBounds();
                    const center: any = bounds?.getCenter();

                    if (!path || path.length - 1 <= 2) {
                      alert("영역을 제대로 설정해주세요");
                      return;
                    }
                    const polygonPath = path._array;
                    polygonPath.pop();

                    setCreateArea({
                      path: polygonPath,
                      center: center,
                      pathType: "polygon",
                      range: undefined,
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
      {isInfoOpen && cursorPo && (
        <Marker
          key={`marker-base`}
          id={`marker-base`}
          opts={{
            position: cursorPo,
            icon: {
              url: markerWithPoint,
              size: new naver.maps.Size(50, 50),
              anchor: new naver.maps.Point(17, 47),
            },
            clickable: false,
          }}
          onClick={() => {}}
        />
      )}
      {isInfoOpen && cursorPo && (
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
              <IcoPolyline width="0.875rem" height="0.875rem" color="#000000" />
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
                color={distance > 1000 ? "system.default.red" : "font.primary"}
              >
                그리기 (반경: {distance?.toFixed(2) * 2}m)
              </Text>
              {distance > 1000 && (
                <Text
                  textStyle="base"
                  fontSize="sm"
                  fontWeight="regular"
                  lineHeight="normal"
                  transition="0.3s"
                  color={
                    distance > 1000 ? "system.default.red" : "font.primary"
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

export default DrawPolygon;
