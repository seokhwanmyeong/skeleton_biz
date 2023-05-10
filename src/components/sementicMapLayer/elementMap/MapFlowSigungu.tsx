//  Lib
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { NaverMapContext } from "@src/lib/src";
//  Components
import GuPanel from "./GuPanel";
import InteractArea from "./InteractArea";
//  Atom
import { atomFilterFlow, dataCollector } from "@states/sementicMap/stateFilter";
import {
  atomDongLi,
  atomFlowEnterArea,
  atomSlctDong,
} from "@states/sementicMap/stateMap";
import { Flex, useDisclosure } from "@chakra-ui/react";

type Props = {};

const MapFlowSigungu = (props: Props) => {
  const { state } = useContext(NaverMapContext);
  const { sigungu } = useRecoilValue(atomFlowEnterArea);
  const filterData = useRecoilValue(dataCollector);
  const dongLi = useRecoilValue(atomDongLi);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const setDong = useSetRecoilState(atomSlctDong);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [slctDong, setSlctDong] = useState(-1);
  const [cursorPo, setCursorPo] = useState<any>(null);
  const [infoArea, setInfoArea] = useState<string>("");
  const geoRef = useRef<any>(null);
  const [range, setRange] = useState({
    latMax: 0,
    latMin: 0,
    lngMax: 0,
    lngMin: 0,
  });

  useEffect(() => {
    if (
      sigungu?.slctCode &&
      sigungu?.slctName &&
      sigungu?.slctPath &&
      state.map
    ) {
      if (sigungu.slctZoom) {
        state.map?.setZoom(Number(sigungu.slctZoom));
      }

      let latLngRange = {
        latMax: 0,
        latMin: 0,
        lngMax: 0,
        lngMin: 0,
      };

      sigungu.slctPath[0].map((lngLat: any) => {
        if (lngLat[1] > latLngRange.latMax || latLngRange.latMax === 0) {
          latLngRange.latMax = lngLat[1];
        } else if (lngLat[1] < latLngRange.latMin || latLngRange.latMin === 0) {
          latLngRange.latMin = lngLat[1];
        }

        if (lngLat[0] > latLngRange.lngMax || latLngRange.lngMax === 0) {
          latLngRange.lngMax = lngLat[0];
        } else if (lngLat[0] < latLngRange.lngMin || latLngRange.lngMin === 0) {
          latLngRange.lngMin = lngLat[0];
        }
      });

      if (geoRef.current && geoRef.current.length > 0) {
        geoRef.current.map((geo: any) => state.map?.data.removeGeoJson(geo));
      }

      const geo = dongLi.map((dong: any) => {
        // @ts-ignore
        state.map.data.addGeoJson(dong.feature);

        return dong.feature;
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
        setSlctDong(e.feature.getProperty("idx"));
        setInfoArea(e.feature.getProperty("name"));
        onOpen();
      });

      // @ts-ignore
      state.map.data.addListener("mouseout", (e) => {
        if (!state.map) return;

        state.map.data.revertStyle(e.feature);
        window.removeEventListener("mousemove", cursorHandler);
        setSlctDong(-1);
        setInfoArea("");
        onClose();
      });

      // @ts-ignore
      state.map.data.addListener("click", (e) => {
        if (!state.map) return;
        state.map.data.revertStyle(e.feature);

        setDong({
          slctName: e.feature.getProperty("name"),
          slctCode: e.feature.getProperty("code"),
          slctIdx: e.feature.getProperty("idx"),
          slctPath: e.feature.getProperty("feature"),
          slctLat: e.feature.getProperty("lat"),
          slctLng: e.feature.getProperty("lng"),
          slctZoom: e.feature.getProperty("zoomLevel"),
          slctData: filterData || [],
          slctRank: e.feature.getProperty("idx"),
        });
        setFlow("dong");
      });

      geoRef.current = geo;

      setRange(latLngRange);
    }
  }, [state.map, dongLi]);

  const onClickArea = (areaIdx: number) => {
    setDong({
      slctName: dongLi[areaIdx].name,
      slctCode: dongLi[areaIdx].code,
      slctIdx: `area${dongLi[areaIdx].code}`,
      slctPath: dongLi[areaIdx].path,
      slctData: filterData || [],
      slctRank: areaIdx,
    });
    setFlow("dong");
  };

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
      {/* {dongli.length !== 0 &&
        dongli.map(
          (
            dong: {
              name: string;
              code: string;
              num: number;
              path: never[];
            },
            idx: number
          ) => {
            return (
              <InteractArea
                key={dong.name}
                onClick={() => {
                  setDong({
                    slctName: dong.name,
                    slctCode: dong.code,
                    slctIdx: `area${dong.code}`,
                    slctNum: idx,
                    slctPath: dong.path,
                    slctData: filterData || [],
                    slctRank: idx,
                  });
                  setFlow("dong");
                }}
                onMouse={() => {
                  setSlctDong(idx);
                }}
                onMouseOut={() => {
                  setSlctDong(-1);
                }}
                name={dong.name}
                num={idx}
                path={dong.path}
                style={{
                  fillColor: "#FF7A45",
                  fillOpacity: 0.35,
                  strokeWeight: 1,
                  strokeColor: "#FFFFFF",
                }}
                hoverStyle={{
                  fillColor: "#FF7A45",
                  fillOpacity: 0.5,
                  strokeWeight: 1,
                  strokeColor: "#FFFFFF",
                }}
              />
            );
          }
        )} */}
      {/* {sigungu && dongli.length !== 0 ? (
        <GuPanel
          range={range}
          dongList={dongli}
          onClickArea={onClickArea}
          selectDong={slctDong}
        />
      ) : null} */}
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

export default MapFlowSigungu;
