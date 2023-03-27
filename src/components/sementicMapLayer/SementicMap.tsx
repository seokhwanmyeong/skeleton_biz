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
import EnterModal from "@components/sementicMapLayer/mapElement/EnterModal";

type Props = {};

const SementicMap = (props: Props) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sigungu, SetSigungu] = useState(false);
  const [selectDong, SetSelectDong] = useState(-1);
  const [dongnum, SetDongnum] = useState(-1);

  const [enter, setEnter] = useState<boolean>(true);

  const onSigungu = (sido: boolean) => {
    SetSigungu(sido);
  };
  const OnClickArea = (num: number) => {
    SetDongnum(num);
  };
  const OverSelectDong = (num: number) => {
    SetSelectDong(num);
  };

  useEffect(() => {}, []);

  return (
    <Box position="relative" w="100vw" h="100vh">
      {/* {sigungu ? (
        <GuPanel onClickArea={OnClickArea} selectDong={selectDong} />
      ) : null}
      <AreaPanel
        localEvent={onSigungu}
        num={dongnum}
        selectDong={OverSelectDong}
      /> */}
      {/* <DrawPolygon />
      <DrawingManager opts={{}} /> */}
      <Map
        ncpClientId="etl68eqfll"
        className="map"
        opts={{
          center: {
            lat: 36.1223291,
            lng: 127.9101228,
          },
          minZoom: 8,
          maxZoom: 8,
        }}
        style={{
          width: "inherit",
          height: "inherit",
        }}
      >
        <EnterModal isEnter={enter} enterHandler={setEnter} />
        <div style={{ zIndex: 100, position: "relative" }}>
          {" "}
          <button
            style={{
              color: "blue",
              height: "50px",
              left: "150px",
              top: "150px",
              position: "inherit",
            }}
            onClick={onOpen}
          >
            좌클릭
          </button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent w="auto" maxW="auto">
              <ModalHeader>메인 다이얼로그</ModalHeader>
              <ModalCloseButton />
              <ModalBody
                maxH="75vh"
                overflowY="auto"
                __css={{
                  "::-webkit-scrollbar": {
                    w: "3px",
                  },
                  "::-webkit-scrollbar-thumb": {
                    borderRadius: "5",
                    bg: `bg.primary`,
                  },
                }}
              >
                메인 다이얼로그
              </ModalBody>
              <ModalFooter>
                <Button variant="cancel" mr={3} onClick={onClose}>
                  취소
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </Map>
    </Box>
  );
};

export default SementicMap;
