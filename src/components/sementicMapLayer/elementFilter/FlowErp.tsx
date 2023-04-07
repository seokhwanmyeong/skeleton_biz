//  Lib
import { Fragment, useState } from "react";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
//  Component
import ErpFilter from "@components/sementicMapLayer/elementFilter/ErpFilter";
import DrawTools from "@components/sementicMapLayer/elementFilter/DrawTools";
import BtnReset from "@components/sementicMapLayer/elementFilter/BtnReset";
import DecoTop from "@components/sementicMapLayer/elementDeco/DecoTop";
//  Icon
import { IcoDoubleSquere } from "@assets/icons/icon";

const FlowErp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isToolOpen, toolOpen] = useState(false);

  return (
    <Fragment>
      {/* ------------------------------ 상단 ------------------------------*/}
      {!isToolOpen && (
        <Flex
          pos="absolute"
          top="1%"
          left="50%"
          zIndex={999}
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
                주소 검색
              </Button>
              <DecoTop width={"13rem"} />
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
      <ErpFilter toolOpen={toolOpen} />
      {isToolOpen && <DrawTools />}
    </Fragment>
  );
};

export default FlowErp;
