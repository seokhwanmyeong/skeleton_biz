//  Lib
import { useRecoilValue } from "recoil";
import { Flex } from "@chakra-ui/react";
//  Components
import FlowEnter from "@components/sementicMapLayer/sementicFilter/FlowEnter";
import FlowSigungu from "@components/sementicMapLayer/sementicFilter/FlowSigungu";
import FlowDong from "@components/sementicMapLayer/sementicFilter/FlowDong";
import FlowCustom from "@components/sementicMapLayer/sementicFilter/FlowCustom";
import FlowFind from "@components/sementicMapLayer/sementicFilter/FlowFind";
//  States
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
        <FlowFind />
      ) : flow === 4 ? (
        <FlowCustom />
      ) : null}
    </Flex>
  );
};

export default SementicSearchEngine;
