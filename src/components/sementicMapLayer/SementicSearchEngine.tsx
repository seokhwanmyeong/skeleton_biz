//  Lib
import { useState, useRef, useEffect, useContext } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { Flex, Button, Text } from "@chakra-ui/react";
//  Components
import FlowEnter from "@components/sementicMapLayer/sementicFilter/FlowEnter";
import FlowSigungu from "@components/sementicMapLayer/sementicFilter/FlowSigungu";
import FlowDong from "@components/sementicMapLayer/sementicFilter/FlowDong";
import FlowCustom from "@components/sementicMapLayer/sementicFilter/FlowCustom";
//  States
import {
  checkBaseState,
  resetSementicAtom,
  areaSelectActivator,
  atomArea,
  atomMapController,
} from "@states/searchState/stateSearch";
import { BaseAreaContext } from "./filter/BaseAreaProvider";
import { atomAreaState, atomSidoLi } from "@src/states/sementicMap/mapState";
import { atomFilterFlow } from "@states/sementicMap/filterState";

const SementicSearchEngine = () => {
  const flow = useRecoilValue(atomFilterFlow);

  return (
    <Flex pos="absolute" w="100%" h="100%">
      {flow === 0 ? (
        <FlowEnter />
      ) : flow === 1 ? (
        <FlowSigungu />
      ) : flow === 2 ? (
        <FlowDong />
      ) : flow === 3 ? (
        <FlowCustom />
      ) : null}
    </Flex>
  );
};

export default SementicSearchEngine;
