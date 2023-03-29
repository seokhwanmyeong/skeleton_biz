//  Lib
import React, { useContext, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Button, Flex } from "@chakra-ui/react";
//  Atom
import { atomFilterFlow } from "@states/sementicMap/filterState";
import { atomSlctDong } from "@states/sementicMap/mapState";
//  Component
import BtnReset from "@components/sementicMapLayer/mapElement/BtnReset";
import BtnFlowCustom from "@components/sementicMapLayer/mapElement/BtnFlowCustom";
import BtnBack from "@components/sementicMapLayer/mapElement/BtnBack";

type Props = {};

const FlowDong = (props: Props) => {
  const setFlow = useSetRecoilState(atomFilterFlow);
  const [dong, setDong] = useRecoilState(atomSlctDong);

  return (
    <>
      <Flex
        pos="absolute"
        top="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
      >
        <Button color="#000000">업종</Button>
        <BtnBack
          onClick={() => {
            setFlow(1);
          }}
        />
        <Flex color="#000000">{dong.slctName}</Flex>
        <BtnFlowCustom />
      </Flex>
      <Flex
        pos="absolute"
        bottom="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
      >
        <Button onClick={() => {}} color="#000000">
          분석필터
        </Button>
        <Button onClick={() => {}} color="#000000">
          ERP 필터
        </Button>
        <BtnReset />
        <Button onClick={() => {}} color="#000000">
          리포트
        </Button>
      </Flex>
    </>
  );
};

export default FlowDong;
