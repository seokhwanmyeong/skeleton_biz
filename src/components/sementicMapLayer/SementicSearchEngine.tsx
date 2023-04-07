//  Lib
import { useRecoilValue } from "recoil";
import { Flex } from "@chakra-ui/react";
//  Components
import FlowEnter from "@components/sementicMapLayer/elementFilter/FlowEnter";
import FlowSigungu from "@components/sementicMapLayer/elementFilter/FlowSigungu";
import FlowDong from "@components/sementicMapLayer/elementFilter/FlowDong";
import FlowCustom from "@components/sementicMapLayer/elementFilter/FlowCustom";
import FlowFind from "@components/sementicMapLayer/elementFilter/FlowFind";
import FlowInit from "@components/sementicMapLayer/elementFilter/FlowInit";
import FlowErp from "@components/sementicMapLayer/elementFilter/FlowErp";
//  States
import { atomFilterFlow } from "@states/sementicMap/stateFilter";

const SementicSearchEngine = () => {
  const flow = useRecoilValue(atomFilterFlow);

  return (
    <Flex pos="absolute" w="100%" h="100%">
      {flow === "init" ? (
        <FlowInit />
      ) : flow === "enter" ? (
        <FlowEnter />
      ) : flow === "sigungu" ? (
        <FlowSigungu />
      ) : flow === "dong" ? (
        <FlowDong />
      ) : flow === "find" ? (
        <FlowFind />
      ) : flow === "custom" ? (
        <FlowCustom />
      ) : flow === "erp" ? (
        <FlowErp />
      ) : null}
    </Flex>
  );
};

export default SementicSearchEngine;
