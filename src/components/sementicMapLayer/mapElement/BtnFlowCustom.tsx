//  Lib
import React from "react";
import { useSetRecoilState } from "recoil";
import { Box, Button } from "@chakra-ui/react";
//  State
import { atomFilterFlow } from "@states/sementicMap/filterState";
import { resetHandler } from "@states/sementicMap/mapState";
import { IcoAim } from "@assets/icons/icon";

type Props = {};

const BtnFlowCustom = (props: Props) => {
  const setFlow = useSetRecoilState(atomFilterFlow);
  const reset = useSetRecoilState(resetHandler);

  return (
    <Button
      variant="filterTop"
      onClick={() => {
        reset();
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
