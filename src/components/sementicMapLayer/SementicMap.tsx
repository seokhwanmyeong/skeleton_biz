//  Lib
import { useContext, useState } from "react";
import { NaverMapContext } from "@src/lib/src";
import { Box } from "@chakra-ui/react";
import Map from "@src/lib/src/components/Map";
//  Components
import MapFlowEnter from "@components/sementicMapLayer/mapElement/MapFlowEnter";
import MapFlowSigungu from "@components/sementicMapLayer/mapElement/MapFlowSigungu";
import MapFlowDong from "@components/sementicMapLayer/mapElement/MapFlowDong";
import MapFlowCustom from "@components/sementicMapLayer/mapElement/MapFlowCustom";
import MapFlowFind from "@components/sementicMapLayer/mapElement/MapFlowFind";
//  Atom
import { useRecoilValue } from "recoil";
import { atomCurrentMapOption } from "@states/sementicMap/mapState";
import { atomFilterFlow } from "@states/sementicMap/filterState";

type Props = {};

const SementicMap = (props: Props) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const [mapOption, setMapOption] = useState<any>({
    zoom: {
      minZoom: 8,
      maxZoom: 8,
    },
    center: {
      lat: 35.9223291,
      lng: 127.9101228,
    },
  });
  const currentOption = useRecoilValue(atomCurrentMapOption);

  const flow = useRecoilValue(atomFilterFlow);

  return (
    <Box position="relative" w="100vw" h="100%">
      <Map
        ncpClientId="ypiwp561ux"
        className="map"
        opts={{
          center: mapOption.center,
          minZoom: mapOption.zoom.minZoom,
          maxZoom: mapOption.zoom.maxZoom,
        }}
        style={{
          position: "relative",
          width: "inherit",
          height: "inherit",
        }}
      >
        {/* <Flex
          pos="absolute"
          top="0"
          left="0"
          w="100vw"
          h="5rem"
          bg="linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 50%, rgba(255, 255, 255, 0) 100%)"
          zIndex="1"
        ></Flex>
        <Flex
          pos="absolute"
          bottom="0"
          w="100vw"
          h="5rem"
          bg="linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 50%, rgba(255, 255, 255, 0) 100%)"
          zIndex="1"
        ></Flex> */}
        {flow === 0 ? (
          <MapFlowEnter />
        ) : flow === 1 ? (
          <MapFlowSigungu />
        ) : flow === 2 ? (
          <MapFlowDong />
        ) : flow === 3 ? (
          <MapFlowFind />
        ) : flow === 4 ? (
          <MapFlowCustom />
        ) : null}
      </Map>
    </Box>
  );
};

export default SementicMap;
