//  Lib
import { Box, Button, Flex } from "@chakra-ui/react";
//  Component
import BtnReset from "@components/sementicMapLayer/elementFilter/BtnReset";
//  Icon
import { IcoBorderOuter } from "@assets/icons/icon";

const FlowFind = () => {
  return (
    <>
      {/* ------------------------------ 하단 ------------------------------*/}
      <Flex
        pos="absolute"
        bottom="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        gap="4.25rem"
      >
        <Button variant="filterTop" disabled={false} isActive={true}>
          <Box>
            <IcoBorderOuter width="1.125rem" height="1.125rem" />
          </Box>
          영역 분석
        </Button>
        <BtnReset />
      </Flex>
    </>
  );
};

export default FlowFind;
