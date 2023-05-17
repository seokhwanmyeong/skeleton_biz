//  Lib
import { useState, Fragment, useEffect, useContext } from "react";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
//  Component
import ToolRound from "@components/sementicMapLayer/boxTool/ToolRound";
import ToolDistance from "@components/sementicMapLayer/boxTool/ToolDistance";
import ToolRoadView from "@components/sementicMapLayer/boxTool/ToolRoadView";
//  Icon
import icoDistance from "@assets/icons/ico_Distance.png";
import icoRoadview from "@assets/icons/ico_Roadview.png";
import icoRuler from "@assets/icons/ico_Ruler.png";
import { NaverMapContext } from "@src/lib/src";

type Props = {};

const ToolBox = ({ list, toolOpen }: any) => {
  const { state } = useContext(NaverMapContext);
  const [activeIdx, setActiveIdx] = useState<number>(-1);

  useEffect(() => {
    if (!state.map && activeIdx === -1) return;
    if (state.objects && state.objects.size > 0 && list.length > 0) {
      state.objects.forEach((li: any) => li.setOptions("clickable", false));
    }

    let timer: any;
    const zoomEvent = naver.maps.Event.addListener(
      state.map,
      "bounds_changed",
      (e) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
          if (state.map && state.objects && state.objects.size > 0) {
            state.objects.forEach((li: any) => {
              if (
                li.OVERLAY_TYPE === "Polygon" ||
                li.OVERLAY_TYPE === "Circle" ||
                li.OVERLAY_TYPE === "Marker"
              )
                li.setOptions("clickable", false);
            });
          }
        }, 300);
      }
    );

    return () => {
      naver.maps.Event.removeListener(zoomEvent);
      if (state.map && state.objects && state.objects.size > 0) {
        state.objects.forEach((li: any) => {
          if (
            li.OVERLAY_TYPE === "Polygon" ||
            li.OVERLAY_TYPE === "Circle" ||
            li.OVERLAY_TYPE === "Marker"
          )
            li.setOptions("clickable", false);
        });
      }
    };
  }, [state, list, toolOpen]);

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
