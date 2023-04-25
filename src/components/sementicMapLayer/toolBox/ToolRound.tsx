// Lib
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
//  Util
import { calDist } from "@util/map/distance";
//  Icon
import markerIcon from "@assets/icons/marker.png";
import { IcoLineCurve } from "@src/assets/icons/icon";

type Props = {
  exitHandler: any;
};

const ToolRound = ({ exitHandler }: Props) => {
  const { state } = useContext(NaverMapContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [event, setEvent] = useState<any>(null);
  const [moveEvent, setMoveEvent] = useState<any>(null);
  const [cursorPo, setCursorPo] = useState<any>(null);
  const [distance, setDistance] = useState<any>(null);
  const [rangeCenter, setRangeCenter] = useState<any>();
  const circleRef = useRef<naver.maps.Circle | undefined>();
  const markerRangeRef = useRef<any>();

  const activeEvent = () => {
    markerRangeRef.current?.setMap(null);
    markerRangeRef.current = null;
    circleRef.current?.setRadius(0);
    naver.maps.Event.removeListener(event);
    naver.maps.Event.removeListener(moveEvent);

    const rangeEvent = naver.maps.Event.addListener(
      state.map,
      "click",
      OnRangePolygon
    );

    setEvent(rangeEvent);
  };

  const resetDraw = () => {
    naver.maps.Event.removeListener(event);
    markerRangeRef.current?.setMap(null);
    markerRangeRef.current = null;
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
          url: markerIcon,
          size: new naver.maps.Size(21, 31),
          anchor: new naver.maps.Point(9, 22),
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
            let point01 = markerRangeRef.current.getPosition();
            let point02 = e.latlng;
            let distance = calDist(point01, point02);

            setDistance(distance);
            setCursorPo(e.latlng);
            onOpen();
          }
        }
      );

      setMoveEvent(moveEvent);
    }
  }, [markerRangeRef, rangeCenter]);

  useEffect(() => {
    if (!(markerRangeRef?.current && moveEvent)) return;

    const center = markerRangeRef.current.getPosition();

    circleRef.current?.setCenter(center);
    circleRef.current?.setRadius(distance);
    const tmp = naver.maps.Event?.addListener(state.map, "rightclick", () => {
      naver.maps.Event.removeListener(event);
      naver.maps.Event.removeListener(moveEvent);
      naver.maps.Event.removeListener(tmp);
      resetDraw();
      exitHandler();
    });
  }, [distance, markerRangeRef, moveEvent]);

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
    circleRef.current = circle;
    activeEvent();

    return () => {
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
                총 반경 : {distance}m
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

export default ToolRound;
