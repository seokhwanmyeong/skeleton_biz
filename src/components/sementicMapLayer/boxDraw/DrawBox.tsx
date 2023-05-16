//  Lib
import { Fragment, useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
//  Component
import DrawPolygon from "@components/sementicMapLayer/boxDraw/DrawPolygon";
import DrawRange from "@components/sementicMapLayer/boxDraw/DrawRange";
import DrawAddr from "@components/sementicMapLayer/boxDraw/DrawAddr";
//  Icon
import { IcoPolyline, IcoLineCurve, IcoDistance } from "@assets/icons/icon";
import { motion } from "framer-motion";

const DrawBox = () => {
  const [activeIdx, setActiveIdx] = useState<number>(-1);

  return (
    <Fragment>
      <Flex
        as={motion.div}
        pos="absolute"
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
        transition="0.2s 0.1s linear"
        initial={{
          opacity: 0,
          bottom: "-5rem",
        }}
        animate={{
          opacity: 1,
          bottom: "6.15rem",
        }}
        exit={{
          opacity: 1,
          bottom: "6.15rem",
        }}
      >
        <Button
          variant="filterTop02"
          isActive={activeIdx === 0}
          onClick={() => (activeIdx === 0 ? setActiveIdx(-1) : setActiveIdx(0))}
        >
          <Box>
            <IcoPolyline />
          </Box>
          그리기
        </Button>
        <Button
          variant="filterTop02"
          isActive={activeIdx === 1}
          onClick={() => (activeIdx === 1 ? setActiveIdx(-1) : setActiveIdx(1))}
        >
          <Box>
            <IcoLineCurve />
          </Box>
          반경
        </Button>
        <Button
          variant="filterTop02"
          isActive={activeIdx === 2}
          onClick={() => (activeIdx === 2 ? setActiveIdx(-1) : setActiveIdx(2))}
        >
          <Box>
            <IcoDistance />
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
