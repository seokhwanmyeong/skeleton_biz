//  Lib
import { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
//  Component
import ToolRound from "@components/sementicMapLayer/toolBox/ToolRound";
import ToolDistance from "@components/sementicMapLayer/toolBox/ToolDistance";
//  Icon
import icoDistance from "@assets/icons/ico_Distance.png";
import icoRoadview from "@assets/icons/ico_Roadview.png";
import icoRuler from "@assets/icons/ico_Ruler.png";
import cursorDis from "@assets/icons/cursorDistance.png";
import cursorRoad from "@assets/icons/cursorRoadview.png";
import cursorRound from "@assets/icons/cursorRound.png";

type Props = {};

const ToolBox = (props: Props) => {
  const { state } = useContext(NaverMapContext);
  const [activeIdx, setActiveIdx] = useState<number>(-1);
  const mouseEventRef = useRef<any>(null);

  useEffect(() => {
    if (!state?.map) return;
    const doc = document
      ?.getElementsByClassName("map")[0]
      ?.getElementsByTagName("div")[0];

    const cursorPoint = naver.maps.Event.addListener(
      state?.map,
      "mousemove",
      (e) => {
        if (activeIdx === 0) {
          if (doc) doc.style.cursor = `url(${cursorDis}) 2 2, auto`;
        } else if (activeIdx === 1) {
          if (doc) doc.style.cursor = `url(${cursorRound}), auto`;
        } else if (activeIdx === 2) {
          if (doc) doc.style.cursor = `url(${cursorRoad}), auto`;
        } else {
          if (doc) doc.style.cursor = `auto`;
          naver.maps.Event.removeListener(cursorPoint);
        }
      }
    );
    mouseEventRef.current = cursorPoint;

    return () => {
      naver.maps.Event.removeListener(cursorPoint);
      mouseEventRef.current = null;
      const doc = document
        ?.getElementsByClassName("map")[0]
        ?.getElementsByTagName("div")[0];
      if (doc) doc.style.cursor = `auto`;
    };
  }, [state?.map, activeIdx]);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Flex
      pos="absolute"
      bottom="1%"
      left="10%"
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
        isActive={activeIdx === 1}
        onClick={() => (activeIdx === 1 ? setActiveIdx(-1) : setActiveIdx(1))}
      >
        <Box>
          <Image src={icoRuler} />
        </Box>
        반경재기
      </Button>
      <Button
        variant="filterTop"
        isActive={activeIdx === 2}
        onClick={() => (activeIdx === 2 ? setActiveIdx(-1) : setActiveIdx(2))}
      >
        <Box>
          <Image src={icoRoadview} />
        </Box>
        로드뷰
      </Button>
      {activeIdx === 0 && <ToolDistance exitHandler={() => setActiveIdx(-1)} />}
      {activeIdx === 1 && (
        <ToolRound
          exitHandler={() => setActiveIdx(-1)}
          mouseEvent={mouseEventRef.current}
        />
      )}
    </Flex>
  );
};

export default ToolBox;
