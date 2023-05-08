//  Lib
import { Fragment, useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
//  Component
import DrawPolygon from "@components/sementicMapLayer/drawBox/DrawPolygon";
import DrawRange from "@components/sementicMapLayer/drawBox/DrawRange";
import DrawAddr from "@components/sementicMapLayer/drawBox/DrawAddr";
//  Icon
import { IcoAppStore } from "@assets/icons/icon";

const DrawBox = () => {
  const [activeIdx, setActiveIdx] = useState<number>(-1);

  return (
    <Fragment>
      <Flex
        pos="absolute"
        bottom="6rem"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        p="0.5rem 0"
        w="29.5rem"
        justify="center"
        gap="1.5rem"
        bgColor="#FFFFFFBF"
        border="1px solid"
        borderColor="neutral.gray6"
        borderRadius="34px"
      >
        <Button
          variant="filterTop02"
          isActive={activeIdx === 0}
          onClick={() => (activeIdx === 0 ? setActiveIdx(-1) : setActiveIdx(0))}
        >
          <Box>
            <IcoAppStore />
          </Box>
          그리기
        </Button>
        <Button
          variant="filterTop02"
          isActive={activeIdx === 1}
          onClick={() => (activeIdx === 1 ? setActiveIdx(-1) : setActiveIdx(1))}
        >
          <Box>
            <IcoAppStore />
          </Box>
          반경
        </Button>
        <Button
          variant="filterTop02"
          isActive={activeIdx === 2}
          onClick={() => (activeIdx === 2 ? setActiveIdx(-1) : setActiveIdx(2))}
        >
          <Box>
            <IcoAppStore />
          </Box>
          주소지
        </Button>
      </Flex>
      {activeIdx === 0 && <DrawPolygon />}
      {activeIdx === 1 && <DrawRange />}
      {activeIdx === 2 && <DrawAddr />}
    </Fragment>
  );
};

export default DrawBox;
