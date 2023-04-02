//  Lib
import React from "react";
import { useSetRecoilState } from "recoil";
import { Box, Button } from "@chakra-ui/react";
//  State
import { atomFilterFlow } from "@states/sementicMap/filterState";
import { resetHandler } from "@states/sementicMap/mapState";
import { IcoReset } from "@assets/icons/icon";

type Props = {
  activeReset?: boolean;
  onClick?: (props?: any) => any;
};

const BtnReset = ({ activeReset = true, onClick }: Props) => {
  const setFlow = useSetRecoilState(atomFilterFlow);
  const reset = useSetRecoilState(resetHandler);

  return (
    <Button
      variant="filterTop"
      onClick={() => {
        if (activeReset) {
          reset();
          setFlow(0);
        }
        onClick && onClick();
      }}
    >
      <Box>
        <IcoReset />
      </Box>
      전체 초기화
    </Button>
  );
};

export default BtnReset;
