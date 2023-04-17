//  Lib
import { Fragment, useContext, useState } from "react";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
//  Component
import ErpFilter from "@components/sementicMapLayer/elementFilter/ErpFilter";
import BtnReset from "@components/sementicMapLayer/elementFilter/BtnReset";
import ModalDaumAddr from "@components/modal/common/ModalDaumAddr";
//  Icon
import { IcoDoubleSquere } from "@assets/icons/icon";
//  Deco
import { DecoTop } from "@components/sementicMapLayer/elementDeco/Deco";

const FlowErp = () => {
  const { state, dispatch } = useContext(NaverMapContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isToolOpen, toolOpen] = useState(false);

  const setAddrCenter = (val: any) => {
    // @ts-ignore
    const geocoder = new kakao.maps.services.Geocoder();
    const { address } = val;

    geocoder.addressSearch(address, (result: any, status: any) => {
      if (status === "OK") {
        const { x, y } = result[0];

        state.map?.setOptions({
          zoom: 15,
          center: {
            lat: y,
            lng: x,
          },
        });
      }
    });
  };

  return (
    <Fragment>
      {/* ------------------------------ 상단 ------------------------------*/}
      {!isToolOpen && (
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
                주소를 검색하세요
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
      <Flex
        pos="absolute"
        bottom="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        gap="4.25rem"
      >
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
          ERP 필터
        </Button>
        <BtnReset />
      </Flex>
      <ErpFilter isToolOpen={isToolOpen} toolOpen={toolOpen} />
    </Fragment>
  );
};

export default FlowErp;
