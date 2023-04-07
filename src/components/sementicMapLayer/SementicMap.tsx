//  Lib
import { useContext, useState, useEffect } from "react";
import { NaverMapContext } from "@src/lib/src";
import Map from "@src/lib/src/components/Map";
import { Box } from "@chakra-ui/react";
//  Components
import MapFlowEnter from "@components/sementicMapLayer/elementMap/MapFlowEnter";
import MapFlowSigungu from "@components/sementicMapLayer/elementMap/MapFlowSigungu";
import MapFlowDong from "@components/sementicMapLayer/elementMap/MapFlowDong";
import MapFlowCustom from "@components/sementicMapLayer/elementMap/MapFlowCustom";
import MapFlowFind from "@components/sementicMapLayer/elementMap/MapFlowFind";
import DecoFilterBg from "@components/sementicMapLayer/elementDeco/DecoFilterBg";
//  AtomZ
import { useRecoilValue } from "recoil";
import { atomCurrentMapOption } from "@states/sementicMap/stateMap";
import { atomFilterFlow } from "@states/sementicMap/stateFilter";
import MapFlowInit from "./elementMap/MapFlowInit";

type Props = {};

const SementicMap = (props: Props) => {
  const flow = useRecoilValue(atomFilterFlow);

  return (
    <Box position="relative" w="100vw" h="100%">
      <DecoFilterBg position={{ top: 0, left: 0, right: 0 }} />
      <DecoFilterBg position={{ bottom: 0, left: 0, right: 0 }} />
      <Map
        ncpClientId="ypiwp561ux"
        className="map"
        opts={{
          center: {
            lat: 35.9223291,
            lng: 127.9101228,
          },
          zoom: 8,
          minZoom: 0,
          maxZoom: 16,
        }}
        style={{
          position: "relative",
          width: "inherit",
          height: "inherit",
        }}
      >
        {flow === "init" ? (
          <MapFlowInit />
        ) : flow === "enter" ? (
          <MapFlowEnter />
        ) : flow === "sigungu" ? (
          <MapFlowSigungu />
        ) : flow === "dong" ? (
          <MapFlowDong />
        ) : flow === "find" ? (
          <MapFlowFind />
        ) : flow === "custom" ? (
          <MapFlowCustom />
        ) : flow === "erp" ? (
          <MapFlowCustom />
        ) : null}
      </Map>
    </Box>
  );
};

export default SementicMap;
