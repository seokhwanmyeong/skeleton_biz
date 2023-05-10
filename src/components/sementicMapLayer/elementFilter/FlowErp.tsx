//  Lib
import { Fragment, useContext, useState, useEffect } from "react";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Marker, NaverMapContext } from "@src/lib/src";
//  Component
import ErpFilter from "@components/sementicMapLayer/elementFilter/ErpFilter";
import ToolBox from "@components/sementicMapLayer/boxTool/ToolBox";
import BtnReset from "@components/sementicMapLayer/common/BtnReset";
import ModalDaumAddr from "@components/modal/common/ModalDaumAddr";
//  Icon
import { IcoDoubleSquere } from "@assets/icons/icon";
import marker from "@assets/icons/marker.png";
//  Deco
import {
  DecoBotHightBox,
  DecoFilterBg,
  DecoFilterDivider,
  DecoTop,
} from "@components/sementicMapLayer/elementDeco/Deco";
import { erpHistoryApi } from "@api/biz/config";

const FlowErp = () => {
  const { state } = useContext(NaverMapContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editorOpen, setEditorOpen] = useState<boolean>(false);
  const [addr, setAddr] = useState<{
    name: string;
    point: [number, number] | null;
  }>({
    name: "",
    point: null,
  });

  const setAddrCenter = (val: any) => {
    // @ts-ignore
    const geocoder = new kakao.maps.services.Geocoder();
    const { address } = val;

    geocoder.addressSearch(address, (result: any, status: any) => {
      if (status === "OK") {
        const { x, y, address_name } = result[0];
        console.log(result[0]);
        state.map?.setOptions({
          zoom: 15,
          center: {
            lat: y,
            lng: x,
          },
        });

        setAddr({ name: address_name, point: [y, x] });
        onClose();
      }
    });
  };

  return (
    <Fragment>
      {/* ------------------------------ 상단 ------------------------------*/}
      {!editorOpen && (
        <DecoFilterBg top="4px" left="50%" transform="translateX(-50%)" />
      )}
      {!editorOpen && (
        <Flex
          pos="absolute"
          top="1%"
          left="50%"
          zIndex={2}
          transform="translateX(-50%)"
          gap="4rem"
        >
          <Flex
            pos="relative"
            pt="0.3rem"
            direction="column"
            justify="flex-start"
            color="#000000"
            gap="0.5rem"
          >
            <Flex pos="relative" direction="column">
              <Button
                variant="filterTopMain"
                onClick={() => {
                  isOpen ? onClose() : onOpen();
                }}
              >
                {addr?.name || "주소를 검색하세요"}
              </Button>
              <ModalDaumAddr
                isOpen={isOpen}
                onClose={onClose}
                onComplete={setAddrCenter}
              />
              <DecoTop width={"10rem"} />
            </Flex>
          </Flex>
        </Flex>
      )}
      {/* ------------------------------ 하단 ------------------------------*/}
      <DecoBotHightBox>
        <Button
          variant="filterTop"
          isActive={true}
          onClick={() => {
            isOpen ? onOpen() : onClose();
          }}
        >
          <Box>
            <IcoDoubleSquere width="1.125rem" height="1.125rem" />
          </Box>
          브랜드 데이터
        </Button>
        <DecoFilterDivider />
        <BtnReset />
      </DecoBotHightBox>
      <ErpFilter editorOpen={editorOpen} setEditorOpen={setEditorOpen} />
      <ToolBox />
      {!editorOpen && addr?.point && (
        <Marker
          key={`markerAddr`}
          id={`markerAddr`}
          opts={{
            position: new naver.maps.LatLng(addr.point[0], addr.point[1]),
            icon: {
              url: marker,
              size: new naver.maps.Size(18, 26),
              anchor: new naver.maps.Point(9, 26),
            },
          }}
        />
      )}
    </Fragment>
  );
};

export default FlowErp;
