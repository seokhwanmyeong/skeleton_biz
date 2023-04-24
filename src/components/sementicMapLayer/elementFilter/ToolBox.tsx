//  Lib
import { useEffect, useState } from "react";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
//  Component
import ToolRound from "@components/sementicMapLayer/toolBox/ToolRound";
import ToolDistance from "@components/sementicMapLayer/toolBox/ToolDistance";
//  Icon
import icoDistance from "@assets/icons/ico_Distance.png";
import icoRoadview from "@assets/icons/ico_Roadview.png";
import icoRuler from "@assets/icons/ico_Ruler.png";

type Props = {};

const ToolBox = (props: Props) => {
  const [activeIdx, setActiveIdx] = useState<number>(-1);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Flex
      pos="absolute"
      bottom="1%"
      left="5%"
      zIndex={999}
      transform="translateX(-50%)"
      gap="2.625rem"
    >
      <Button
        variant="filterTop"
        isActive={activeIdx === 0}
        onClick={() => (activeIdx === 0 ? setActiveIdx(-1) : setActiveIdx(0))}
      >
        <Box>
          <Image src={icoDistance} />
        </Box>
        거리재기
      </Button>
      <Button
        variant="filterTop"
        onClick={() => (activeIdx === 1 ? setActiveIdx(-1) : setActiveIdx(1))}
      >
        <Box>
          <Image src={icoRuler} />
        </Box>
        반경재기
      </Button>
      <Button
        variant="filterTop"
        onClick={() => (activeIdx === 2 ? setActiveIdx(-1) : setActiveIdx(2))}
      >
        <Box>
          <Image src={icoRoadview} />
        </Box>
        로드뷰
      </Button>
      {activeIdx === 0 && <ToolDistance exitHandler={() => setActiveIdx(-1)} />}
      {activeIdx === 1 && <ToolRound exitHandler={() => setActiveIdx(-1)} />}
    </Flex>
  );
};

export default ToolBox;
