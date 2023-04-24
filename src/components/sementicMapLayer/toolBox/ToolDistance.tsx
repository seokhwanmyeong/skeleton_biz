// Lib
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
//  Util
import { calDist } from "@util/map/distance";
//  Icon
import markerPoint from "@assets/icons/markerPoint.png";
import { IcoLineCurve } from "@src/assets/icons/icon";

type Props = {
  exitHandler: any;
};

const ToolDistance = ({ exitHandler }: Props) => {
  const { state } = useContext(NaverMapContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [event, setEvent] = useState<any>(null);
  const [moveEvent, setMoveEvent] = useState<any>(null);
  const [cursorPo, setCursorPo] = useState<any>(null);
  const [distance, setDistance] = useState<any>(null);
  const polyRef = useRef<naver.maps.Polyline | undefined>();
  const markerRef = useRef<any[]>([]);

  const activeEvent = () => {
    markerRef.current.map((marker: any) => marker.setMap(null));
    markerRef.current = [];
    naver.maps.Event.removeListener(event);
    naver.maps.Event.removeListener(moveEvent);

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

    const polyEvent = naver.maps.Event.addListener(
      state.map,
      "click",
      OnDrawPolygon
    );

    setEvent(polyEvent);
  };

  const resetDraw = () => {
    naver.maps.Event.removeListener(event);
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

    path.push(point);

    const marker = new naver.maps.Marker({
      map: state.map,
      position: point,
      icon: {
        url: markerPoint,
        size: new naver.maps.Size(8, 8),
        anchor: new naver.maps.Point(4, 4),
      },
    });
    markerRef.current.push(marker);

    const moveEvent = naver.maps.Event.addListener(
      state.map,
      "mousemove",
      (e) => {
        if (e.latlng) setCursorPo(e.latlng);

        if (polyRef?.current) {
          let distance = polyRef?.current.getDistance();

          setDistance(distance);
        }
      }
    );

    setMoveEvent(moveEvent);

    const tmp = naver.maps.Event?.addListener(state.map, "rightclick", () => {
      naver.maps.Event.removeListener(event);
      naver.maps.Event.removeListener(moveEvent);
      naver.maps.Event.removeListener(tmp);
      resetDraw();
      exitHandler();
    });
  };

  useEffect(() => {
    if (state.map === undefined) return;

    const polyline = new naver.maps.Polyline({
      map: state.map,
      path: [],
      strokeColor: "#000000",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      clickable: true,
    });

    polyRef.current = polyline;
    markerRef.current = [];
    activeEvent();

    return () => {
      resetDraw();
      naver.maps.Event.removeListener(event);
      naver.maps.Event.removeListener(moveEvent);
    };
  }, [state.map]);

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
                총 거리 : {distance}m
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
    </Fragment>
  );
};

export default ToolDistance;
