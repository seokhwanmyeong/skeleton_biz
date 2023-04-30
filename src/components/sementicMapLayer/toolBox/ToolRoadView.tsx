//  Lib
import { useEffect, useContext, useState, useRef } from "react";
import { Flex } from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
//  Icon
import markerRoadView from "@assets/icons/ico_roadview.png";
import cursorRoad from "@assets/icons/cursorRoadview.png";

const ToolRoadView = () => {
  const { state } = useContext(NaverMapContext);
  const [active, setActive] = useState(false);
  const mouseEventRef = useRef<any>(null);

  useEffect(() => {
    if (!state.map) return;
    const streetLayer = new naver.maps.StreetLayer();
    streetLayer.setMap(state.map);
    const pano = new naver.maps.Panorama("pano", {
      position: new naver.maps.LatLng(37.3599605, 127.1058814),
      visible: false,
      pov: {
        pan: -133,
        tilt: 0,
        fov: 100,
      },
    });

    const marker = new naver.maps.Marker({
      map: state.map,
      position: new naver.maps.LatLng(37.3599605, 127.1058814),
      visible: false,
      icon: {
        url: markerRoadView,
        size: new naver.maps.Size(20, 24),
      },
    });

    const event = naver.maps.Event.addListener(state.map, "click", (e) => {
      const latlng = e.coord;
      const panoVisible = pano.getVisible();
      pano.setPosition(latlng);
      !panoVisible && pano.setVisible(true);
      !active && setActive(true);
    });

    const markerEvent = naver.maps.Event.addListener(
      pano,
      "pano_status",
      () => {
        const markerVisible = marker.getVisible();
        const panoPos = pano.getPosition();
        !markerVisible && marker.setVisible(true);
        marker.setPosition(panoPos);
      }
    );

    const doc = document
      ?.getElementsByClassName("map")[0]
      ?.getElementsByTagName("div")[0];

    const cursorPoint = naver.maps.Event.addListener(
      state?.map,
      "mousemove",
      (e) => {
        if (doc) doc.style.cursor = `url(${cursorRoad}) 2 2, auto`;
      }
    );
    mouseEventRef.current = cursorPoint;

    return () => {
      if (state.map) {
        streetLayer && streetLayer.setMap(null);
        marker && marker.setMap(null);
        event && naver.maps.Event.removeListener(event);
        markerEvent && naver.maps.Event.removeListener(markerEvent);
        naver.maps.Event.removeListener(cursorPoint);
        mouseEventRef.current = null;
        const doc = document
          ?.getElementsByClassName("map")[0]
          ?.getElementsByTagName("div")[0];
        if (doc) doc.style.cursor = `auto`;
      }
    };
  }, [state.map]);

  return (
    <Flex
      pos="absolute"
      top="50%"
      right="2rem"
      transform="translateY(-50%)"
      opacity={active ? "1" : "0"}
      zIndex={999}
      w="20rem"
      h="20rem"
      borderRadius="base"
      border="1px solid"
      borderColor="neutral.gray6"
      overflow="hidden"
      pointerEvents={active ? "auto" : "none"}
    >
      <div id="pano" style={{ width: "100%", height: "100%" }} />
    </Flex>
  );
};

export default ToolRoadView;
