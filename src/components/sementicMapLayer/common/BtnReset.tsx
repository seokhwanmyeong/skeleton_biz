//  Lib
import { useContext } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
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
import { sementicViewState } from "@src/states/sementicMap/stateView";

type Props = {
  activeReset?: boolean;
  onClick?: (props?: any) => any;
};

const BtnReset = ({ activeReset = true, onClick }: Props) => {
  const { state } = useContext(NaverMapContext);
  const [flow, setFlow] = useRecoilState(atomFilterFlow);
  const resetSlctArea = useResetRecoilState(resetHandler);
  const resetNiceFilter = useResetRecoilState(resetNice);
  const resetNiceDepthFilter = useResetRecoilState(resetNiceDepth);
  const resetErpFilter = useResetRecoilState(resetErp);
  const resetSementicView = useResetRecoilState(sementicViewState);

  return (
    <Button
      variant="filterTop"
      onClick={() => {
        onClick && onClick();

        if (activeReset) {
          state.map?.setOptions({
            minZoom: 0,
            maxZoom: 22,
            scrollWheel: true,
            draggable: true,
            disableDoubleClickZoom: false,
            disableDoubleTapZoom: false,
            disableTwoFingerTapZoom: false,
          });

          resetSlctArea();
          resetNiceDepthFilter();
          resetErpFilter();
          (flow === "sigungu" || flow === "dong") && resetNiceFilter();
          resetSementicView();
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
