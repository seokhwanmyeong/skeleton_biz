//  Lib
import React from "react";
import { useSetRecoilState } from "recoil";
import { Button } from "@chakra-ui/react";
//  State
import { atomFilterFlow } from "@states/sementicMap/filterState";
import { resetHandler } from "@states/sementicMap/mapState";

type Props = {};

const BtnFlowCustom = (props: Props) => {
  const setFlow = useSetRecoilState(atomFilterFlow);
  const reset = useSetRecoilState(resetHandler);

  return (
    <Button
      color="#000000"
      onClick={() => {
        reset();
        setFlow(3);
      }}
    >
      위치 지정
    </Button>
  );
};

export default BtnFlowCustom;
