//  Lib
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { NaverMapContext } from "@src/lib/src";
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
  const { state } = useContext(NaverMapContext);
  const [{ sido, sigungu }, setSlctArea] = useRecoilState(atomFlowEnterArea);
  const sidoLi = useRecoilValue(atomSidoLi);
  const sigunguLi = useRecoilValue(atomSigunguLi);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cursorPo, setCursorPo] = useState<any>(null);
  const [infoArea, setInfoArea] = useState<string>("");
  const geoRef = useRef<any>(null);

  useEffect(() => {
    if (!state.map) return;

    if (sido?.slctCode && sido?.slctName && sido?.slctPath) {
      console.log("시 진입");
      if (geoRef.current && geoRef.current.length > 0) {
        geoRef.current.map((geo: any) => state.map?.data.removeGeoJson(geo));
      }

      const geo = sigunguLi.map((sigungu) => {
        // @ts-ignore
        state.map.data.addGeoJson(sigungu.feature);

        return sigungu.feature;
      });

      state.map.data.setStyle({
        fillColor: "#78d6b0",
        fillOpacity: 0.4,
        strokeWeight: 1,
        strokeColor: "#41be72",
      });

      // @ts-ignore
      state.map.data.addListener("mouseover", (e) => {
        if (!state.map) return;

        state.map.data.overrideStyle(e.feature, {
          fillColor: "#78d6b0",
          fillOpacity: 0.65,
          strokeWeight: 1,
          strokeColor: "#41be72",
        });

        window.addEventListener("mousemove", cursorHandler);
        setInfoArea(e.feature.getProperty("name"));
        onOpen();
      });

      // @ts-ignore
      state.map.data.addListener("mouseout", (e) => {
        if (!state.map) return;

        state.map.data.revertStyle(e.feature);
        window.removeEventListener("mousemove", cursorHandler);
        setInfoArea("");
        onClose();
      });

      // @ts-ignore
      state.map.data.addListener("click", (e) => {
        if (!state.map) return;
        state.map.data.revertStyle(e.feature);
        setSlctArea({
          sido: sido,
          sigungu: {
            slctName: e.feature.getProperty("name"),
            slctCode: e.feature.getProperty("code"),
            slctIdx: e.feature.getProperty("idx"),
            slctPath: e.feature.getProperty("feature"),
            slctLat: e.feature.getProperty("lat"),
            slctLng: e.feature.getProperty("lng"),
            slctZoom: e.feature.getProperty("zoomLevel"),
          },
        });
        setFlow("sigungu");
      });

      geoRef.current = geo;

      sido.slctLat &&
        sido.slctLng &&
        state.map?.setCenter(new naver.maps.LatLng(sido.slctLat, sido.slctLng));
      sido.slctZoom && state.map?.setZoom(Number(sido.slctZoom));
      state.map?.setOptions({
        draggable: false,
      });
    } else {
      if (geoRef.current && geoRef.current.length > 0) {
        geoRef.current.map((geo: any) => state.map?.data.removeGeoJson(geo));
      }

      state.map?.setOptions({
        center: {
          lat: 35.9223291,
          lng: 127.9101228,
        },
        zoom: 8,
        minZoom: 0,
        maxZoom: 22,
        scrollWheel: false,
        draggable: true,
        disableDoubleClickZoom: true,
        disableDoubleTapZoom: true,
        disableTwoFingerTapZoom: true,
      });

      const geo = sidoLi.map((sido) => {
        // @ts-ignore
        state.map.data.addGeoJson(sido.feature);

        return sido.feature;
      });

      state.map.data.setStyle({
        fillColor: "#78d6b0",
        fillOpacity: 0.4,
        strokeWeight: 1,
        strokeColor: "#41be72",
      });

      // @ts-ignore
      state.map.data.addListener("mouseover", (e) => {
        if (!state.map) return;

        state.map.data.overrideStyle(e.feature, {
          fillColor: "#78d6b0",
          fillOpacity: 0.65,
          strokeWeight: 1,
          strokeColor: "#41be72",
        });
      });

      // @ts-ignore
      state.map.data.addListener("mouseout", (e) => {
        if (!state.map) return;

        state.map.data.revertStyle(e.feature);
      });

      // @ts-ignore
      state.map.data.addListener("click", (e) => {
        if (!state.map) return;
        state.map.data.revertStyle(e.feature);
        setSlctArea({
          sido: {
            slctName: e.feature.getProperty("name"),
            slctCode: e.feature.getProperty("code"),
            slctIdx: e.feature.getProperty("idx"),
            slctPath: e.feature.getProperty("feature"),
            slctLat: e.feature.getProperty("lat"),
            slctLng: e.feature.getProperty("lng"),
            slctZoom: e.feature.getProperty("zoomLevel"),
          },
          sigungu,
        });
      });

      geoRef.current = geo;
    }

    return () => {
      if (state.map && geoRef.current && geoRef.current.length > 0) {
        geoRef.current.map((geo: any) => state.map?.data.removeGeoJson(geo));
      }
    };
  }, [state.map, sido, sigungu, sidoLi, sigunguLi]);

  const cursorHandler = useCallback(
    (e: any) => {
      setCursorPo({ x: e?.clientX, y: e?.clientY });

      return () => {
        setCursorPo(null);
      };
    },
    [state.map]
  );

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", cursorHandler);
    };
  }, []);

  return (
    <>
      {/* {!sido?.slctCode
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
                  zIndex: sido.code === "24" ? 1 : 0,
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
                  state.map?.setOptions({
                    minZoom: 0,
                    maxZoom: 22,
                    scrollWheel: false,
                    draggable: false,
                    disableDoubleClickZoom: false,
                    disableDoubleTapZoom: false,
                    disableTwoFingerTapZoom: false,
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
                  fillColor: "#fadb14",
                  fillOpacity: 0.4,
                  strokeWeight: 1,
                  strokeColor: "#FFFFFF",
                }}
                hoverStyle={{
                  fillColor: "#fadb14",
                  fillOpacity: 0.75,
                  strokeWeight: 1,
                  strokeColor: "#FFFFFF",
                }}
              />
            );
          })
        : null} */}
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
