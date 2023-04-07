//  Lib
import { useRecoilValue } from "recoil";
import { Flex } from "@chakra-ui/react";
//  Components
import FlowEnter from "@src/components/sementicMapLayer/elementFilter/FlowEnter";
import FlowSigungu from "@src/components/sementicMapLayer/elementFilter/FlowSigungu";
import FlowDong from "@src/components/sementicMapLayer/elementFilter/FlowDong";
import FlowCustom from "@src/components/sementicMapLayer/elementFilter/FlowCustom";
import FlowFind from "@src/components/sementicMapLayer/elementFilter/FlowFind";
//  States
import { atomFilterFlow } from "@states/sementicMap/stateFilter";

const SementicSearchEngine = () => {
  const flow = useRecoilValue(atomFilterFlow);

  return (
    <Flex pos="absolute" w="100%" h="100%">
      {flow === "init" ? null : flow === "enter" ? (
        <FlowEnter />
      ) : flow === "sigungu" ? (
        <FlowSigungu />
      ) : flow === "dong" ? (
        <FlowDong />
      ) : flow === "find" ? (
        <FlowFind />
      ) : flow === "custom" ? (
        <FlowCustom />
      ) : flow === "erp" ? null : null}
    </Flex>
  );
};

export default SementicSearchEngine;
