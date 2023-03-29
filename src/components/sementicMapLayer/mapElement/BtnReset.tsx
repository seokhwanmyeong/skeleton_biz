//  Lib
import React from "react";
import { useSetRecoilState } from "recoil";
import { Button } from "@chakra-ui/react";
//  State
import { atomFilterFlow } from "@states/sementicMap/filterState";
import { resetHandler } from "@states/sementicMap/mapState";

type Props = {};

const BtnReset = (props: Props) => {
  const setFlow = useSetRecoilState(atomFilterFlow);
  const reset = useSetRecoilState(resetHandler);

  return (
    <Button
      color="#000000"
      onClick={() => {
        reset();
        setFlow(0);
      }}
    >
      전체 초기화
    </Button>
  );
};

export default BtnReset;
