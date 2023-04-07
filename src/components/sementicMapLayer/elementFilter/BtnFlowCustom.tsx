//  Lib
import React from "react";
import { useSetRecoilState } from "recoil";
import { Box, Button } from "@chakra-ui/react";
//  State
import {
  atomFilterFlow,
  resetNice,
  resetNiceDepth,
  resetErp,
} from "@src/states/sementicMap/stateFilter";
import { resetHandler } from "@src/states/sementicMap/stateMap";
import { IcoAim } from "@assets/icons/icon";

type Props = {};

const BtnFlowCustom = (props: Props) => {
  const setFlow = useSetRecoilState(atomFilterFlow);
  const resetSlctArea = useSetRecoilState(resetHandler);
  const resetNiceFilter = useSetRecoilState(resetNice);
  const resetNiceDepthFilter = useSetRecoilState(resetNiceDepth);
  const resetErpFilter = useSetRecoilState(resetErp);

  return (
    <Button
      variant="filterTop"
      onClick={() => {
        resetSlctArea();
        resetNiceFilter();
        resetNiceDepthFilter();
        resetErpFilter();
        setFlow(3);
      }}
    >
      <Box>
        <IcoAim />
      </Box>
      위치 지정
    </Button>
  );
};

export default BtnFlowCustom;
