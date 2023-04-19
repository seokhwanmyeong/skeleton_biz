//  Lib
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { NaverMapContext } from "@src/lib/src";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
import { Flex, useDisclosure } from "@chakra-ui/react";
//  Components
import InteractArea from "./InteractArea";
//  Atom
import { atomFilterFlow } from "@states/sementicMap/stateFilter";
import {
  atomFlowEnterArea,
  atomSidoLi,
  atomSigunguLi,
} from "@states/sementicMap/stateMap";
//  Type
import type { AreaProps } from "@states/sementicMap/stateMap";

type Props = {};

const MapFlowEnter = (props: Props) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const [{ sido, sigungu }, setSlctArea] = useRecoilState(atomFlowEnterArea);
  const sidoLi = useRecoilValue(atomSidoLi);
  const sigunguLi = useRecoilValue(atomSigunguLi);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cursorPo, setCursorPo] = useState<any>(null);
  const [infoArea, setInfoArea] = useState<string>("");
  const [moveEvent, setMoveEvent] = useState<any>(null);

  useEffect(() => {
    if (sido?.slctCode && sido?.slctName && sido?.slctPath) {
      console.log("진입 1");
      state.map?.fitBounds(sido.slctPath[0]);
      sido.slctLat &&
        sido.slctLng &&
        state.map?.setCenter(new naver.maps.LatLng(sido.slctLat, sido.slctLng));
      state.map?.setOptions({
        draggable: false,
      });
    } else {
      console.log("진입 2");
      state.map?.setOptions({
        center: {
          lat: 35.9223291,
          lng: 127.9101228,
        },
        zoom: 8,
        minZoom: 0,
        maxZoom: 16,
        scrollWheel: false,
        draggable: true,
        disableDoubleClickZoom: true,
        disableDoubleTapZoom: true,
        disableTwoFingerTapZoom: true,
      });
    }
  }, [sido, sigungu]);

  const cursorHandler = useCallback((e: any) => {
    setCursorPo({ x: e?.clientX, y: e?.clientY });

    return () => {
      setCursorPo(null);
    };
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", cursorHandler);
    };
  }, []);

  return (
    <>
      {!sido?.slctCode
        ? sidoLi.map((sido: AreaProps) => {
            return (
              <InteractArea
                key={sido.code}
                onClick={() => {
                  setSlctArea({
                    sido: {
                      slctName: sido.name,
                      slctCode: sido.code,
                      slctIdx: `area${sido.code}`,
                      slctPath: sido.path,
                      slctLat: sido.lat,
                      slctLng: sido.lng,
                      slctZoom: sido.zoomLev,
                    },
                    sigungu,
                  });
                }}
                name={sido.name}
                num={Number(sido.code)}
                path={sido.path}
                style={{
                  fillColor: "#78d6b0",
                  fillOpacity: 0.4,
                  strokeWeight: 1,
                  strokeColor: "#41be72",
                }}
                hoverStyle={{
                  fillColor: "#78d6b0",
                  fillOpacity: 0.65,
                  strokeWeight: 1,
                  strokeColor: "#41be72",
                }}
              />
            );
          })
        : !sigungu?.slctCode
        ? sigunguLi.map((sigungu: AreaProps) => {
            return (
              <InteractArea
                key={sigungu.code}
                onClick={() => {
                  setSlctArea({
                    sido,
                    sigungu: {
                      slctName: sigungu.name,
                      slctCode: sigungu.code,
                      slctIdx: `area${sigungu.code}`,
                      slctPath: sigungu.path,
                      slctLat: sigungu.lat,
                      slctLng: sigungu.lng,
                      slctZoom: sigungu.zoomLev,
                    },
                  });
                  setFlow("sigungu");
                }}
                onMouse={() => {
                  setInfoArea(sigungu.name.split(" ")[1]);
                  onOpen();

                  window.addEventListener("mousemove", cursorHandler);
                }}
                onMouseOut={() => {
                  setInfoArea("");
                  onClose();

                  window.removeEventListener("mousemove", cursorHandler);
                }}
                name={sigungu.name}
                num={Number(sigungu.code)}
                path={sigungu.path}
                style={{
                  fillColor: "#36CFC9",
                  fillOpacity: 0.5,
                  strokeWeight: 1,
                  strokeColor: "#FFFFFF",
                }}
                hoverStyle={{
                  fillColor: "#36CFC9",
                  fillOpacity: 0.75,
                  strokeWeight: 1,
                  strokeColor: "#FFFFFF",
                }}
              />
            );
          })
        : null}
      {isOpen && cursorPo && (
        <Flex
          pos="relative"
          top={cursorPo.y - 10}
          left={cursorPo.x + 10}
          p="0 0.75rem"
          w="-webkit-fit-content"
          h="1.875rem"
          boxSizing="border-box"
          justify="center"
          align="center"
          bgColor="neutral.gray1"
          border="1px solid"
          borderRadius="base"
          borderColor="neutral.gray6"
          pointerEvents="none"
          textStyle="base"
          fontSize="xs"
          fontWeight="strong"
          lineHeight="1.875rem"
        >
          {infoArea}
        </Flex>
      )}
    </>
  );
};

export default MapFlowEnter;
