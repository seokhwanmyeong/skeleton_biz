import React from "react";
import { Button, Flex } from "@chakra-ui/react";
//  Component
import BtnReset from "@components/sementicMapLayer/mapElement/BtnReset";

type Props = {};

const FlowCustom = (props: Props) => {
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
        <Flex color="#000000">FlowCustom</Flex>
        <Button color="#000000">위치지정</Button>
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

export default FlowCustom;
