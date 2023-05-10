//  Lib
import { useState, Fragment } from "react";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
//  Component
import ToolRound from "@components/sementicMapLayer/boxTool/ToolRound";
import ToolDistance from "@components/sementicMapLayer/boxTool/ToolDistance";
import ToolRoadView from "@components/sementicMapLayer/boxTool/ToolRoadView";
//  Icon
import icoDistance from "@assets/icons/ico_Distance.png";
import icoRoadview from "@assets/icons/ico_Roadview.png";
import icoRuler from "@assets/icons/ico_Ruler.png";

type Props = {};

const ToolBox = (props: Props) => {
  const [activeIdx, setActiveIdx] = useState<number>(-1);

  return (
    <Fragment>
      <Flex
        pos="absolute"
        bottom="1.125rem"
        left="1.25rem"
        zIndex={999}
        gap="1.375rem"
      >
        <Button
          variant="filterTop02"
          isActive={activeIdx === 0}
          onClick={() => (activeIdx === 0 ? setActiveIdx(-1) : setActiveIdx(0))}
        >
          <Box>
            <Image width="1rem" height="1rem" src={icoDistance} />
          </Box>
          거리재기
        </Button>
        <Button
          variant="filterTop02"
          isActive={activeIdx === 1}
          onClick={() => (activeIdx === 1 ? setActiveIdx(-1) : setActiveIdx(1))}
        >
          <Box>
            <Image width="1.25rem" height="1.25rem" src={icoRuler} />
          </Box>
          반경재기
        </Button>
        <Button
          variant="filterTop02"
          isActive={activeIdx === 2}
          onClick={() => (activeIdx === 2 ? setActiveIdx(-1) : setActiveIdx(2))}
        >
          <Box>
            <Image width="0.875rem" height="1rem" src={icoRoadview} />
          </Box>
          로드뷰
        </Button>
      </Flex>
      {activeIdx === 0 && <ToolDistance exitHandler={() => setActiveIdx(-1)} />}
      {activeIdx === 1 && <ToolRound exitHandler={() => setActiveIdx(-1)} />}
      {activeIdx === 2 && <ToolRoadView />}
    </Fragment>
  );
};

export default ToolBox;
