//  Lib
import React, { useContext, useState, useEffect } from "react";
import { NaverMapContext } from "@src/lib/src";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
} from "@chakra-ui/react";
import Map from "@src/lib/src/components/Map";
import DrawingManager from "@src/lib/src/components/Drawing/DrawingManager";
//  Components
import AreaPanel from "@components/sementicMapLayer/mapElement/AreaPanel";
import GuPanel from "@components/sementicMapLayer/mapElement/GuPanel";
import DrawPolygon from "@components/sementicMapLayer/mapElement/DrawPolygon";
import InteractArea from "./mapElement/InteractArea";
import MapFlowEnter from "@components/sementicMapLayer/mapElement/MapFlowEnter";
import MapFlowSigungu from "@components/sementicMapLayer/mapElement/MapFlowSigungu";
import MapFlowDong from "@components/sementicMapLayer/mapElement/MapFlowDong";
import MapFlowCustom from "@components/sementicMapLayer/mapElement/MapFlowCustom";
import MapFlowFind from "@components/sementicMapLayer/mapElement/MapFlowFind";
//  Atom
import { useRecoilState, useRecoilValue } from "recoil";
import {
  atomFlowEnterArea,
  atomSidoLi,
  atomSigunguLi,
  atomCurrentMapOption,
} from "@states/sementicMap/mapState";
import { atomFilterFlow } from "@src/states/sementicMap/filterState";

type Props = {};

const SementicMap = (props: Props) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sigungu, setSigungu] = useState(false);
  const [selectDong, setSelectDong] = useState(-1);
  const [dongnum, setDongnum] = useState(-1);
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

  const onSigungu = (sido: boolean) => {
    setSigungu(sido);
  };
  const OnClickArea = (num: number) => {
    setDongnum(num);
  };
  const OverSelectDong = (num: number) => {
    setSelectDong(num);
  };

  const flow = useRecoilValue(atomFilterFlow);
  const [] = useRecoilState(atomFlowEnterArea);
  const sidoLi = useRecoilValue(atomSidoLi);
  const sigunguLi = useRecoilValue(atomSigunguLi);

  return (
    <Box position="relative" w="100vw" h="100%">
      {/* {sigungu ? (
        <GuPanel onClickArea={OnClickArea} selectDong={selectDong} />
      ) : null} */}
      {/* <AreaPanel
        localEvent={onSigungu}
        num={dongnum}
        selectDong={OverSelectDong}
      /> */}
      {/* <DrawPolygon />
      <DrawingManager opts={{}} /> */}
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
        {/* {sido.length !== 0 &&
          sido.map((sido: { code: string; name: string; path: any[] }) => {
            return (
              <InteractArea
                key={sido.code}
                onClick={(val) => {
                  console.log("click");
                  console.log(val);
                }}
                name={sido.name}
                num={Number(sido.code)}
                path={sido.path}
              />
            );
          })} */}
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
