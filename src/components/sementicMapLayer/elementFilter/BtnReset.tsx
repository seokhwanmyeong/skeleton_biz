//  Lib
import { useContext } from "react";
import { useSetRecoilState } from "recoil";
import { Box, Button } from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
//  State
import {
  atomFilterFlow,
  resetNice,
  resetNiceDepth,
  resetErp,
} from "@states/sementicMap/stateFilter";
import { resetHandler } from "@states/sementicMap/stateMap";
//  Icon
import { IcoReset } from "@assets/icons/icon";

type Props = {
  activeReset?: boolean;
  onClick?: (props?: any) => any;
};

const BtnReset = ({ activeReset = true, onClick }: Props) => {
  const { state } = useContext(NaverMapContext);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const resetSlctArea = useSetRecoilState(resetHandler);
  const resetNiceFilter = useSetRecoilState(resetNice);
  const resetNiceDepthFilter = useSetRecoilState(resetNiceDepth);
  const resetErpFilter = useSetRecoilState(resetErp);

  return (
    <Button
      variant="filterTop"
      onClick={() => {
        onClick && onClick();

        if (activeReset) {
          state.map?.setOptions({
            minZoom: 0,
            maxZoom: 16,
            scrollWheel: true,
          });

          resetSlctArea();
          resetNiceFilter();
          resetNiceDepthFilter();
          resetErpFilter();
          setFlow("init");
        }
      }}
    >
      <Box>
        <IcoReset width="1.125rem" height="1.125rem" />
      </Box>
      전체 초기화
    </Button>
  );
};

export default BtnReset;