//  Lib
import { useContext, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
//  Component
import UpjonListBox from "@components/sementicMapLayer/sementicFilter/UpjongListBox";
import NiceFilterDepth from "@components/sementicMapLayer/sementicFilter/NiceFilterDepth";
import ErpFilter from "@components/sementicMapLayer/sementicFilter/ErpFilter";
import BtnReset from "@components/sementicMapLayer/sementicFilter/BtnReset";
import BtnFlowCustom from "@components/sementicMapLayer/sementicFilter/BtnFlowCustom";
import BtnBack from "@components/sementicMapLayer/sementicFilter/BtnBack";
import DecoTop from "@components/sementicMapLayer/sementicFilter/DecoTop";
import DrawTools from "@components/sementicMapLayer/sementicFilter/DrawTools";
//  State
import { atomFilterFlow } from "@states/sementicMap/filterState";
import { atomFlowEnterArea, atomSlctDong } from "@states/sementicMap/mapState";
import { sementicViewState } from "@states/sementicMap/viewState";
//  Icon
import { IcoBarChart, IcoErp, IcoFilter } from "@assets/icons/icon";

type Props = {};

const FlowDong = (props: Props) => {
  const { state } = useContext(NaverMapContext);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const setSv = useSetRecoilState(sementicViewState);
  const { sigungu } = useRecoilValue(atomFlowEnterArea);
  const dong = useRecoilValue(atomSlctDong);
  const [isToolOpen, toolOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterType, setType] = useState("");

  return (
    <>
      {!isToolOpen && (
        <Flex
          pos="absolute"
          top="1%"
          left="50%"
          zIndex={999}
          transform="translateX(-50%)"
          gap={"4rem"}
        >
          <UpjonListBox />
          <Flex
            pos="relative"
            pt="0.3rem"
            direction="column"
            justify="flex-start"
            color="#000000"
            gap="0.5rem"
          >
            <Flex pos="relative" direction="column">
              <BtnBack
                onClick={() => {
                  state.map?.setOptions({
                    minZoom: 0,
                    maxZoom: 16,
                    scrollWheel: false,
                  });
                  setFlow(1);
                }}
              />
              <Button
                variant="filterTopMain"
                onClick={() => {
                  isOpen ? onClose() : onOpen();
                }}
              >
                {dong.slctName.replace(sigungu?.slctName, "")}
              </Button>
              <DecoTop width={"13rem"} />
            </Flex>
            {sigungu?.slctName && (
              <Text variant="filterTopArea">{sigungu?.slctName}</Text>
            )}
          </Flex>
          <BtnFlowCustom />
        </Flex>
      )}
      {/* ------------------------------ 하단 ------------------------------*/}
      <Flex
        pos="absolute"
        bottom="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        gap="1.25rem"
      >
        <Button
          variant="filterTop"
          isActive={filterType === "anal"}
          onClick={() => {
            if (filterType === "anal") {
              setType("");
            } else {
              setType("anal");
            }
          }}
        >
          <Box>
            <IcoFilter />
          </Box>
          분석필터
        </Button>
        <Button
          variant="filterTop"
          isActive={filterType === "erp"}
          onClick={() => {
            if (filterType === "erp") {
              setType("");
            } else {
              setType("erp");
            }
          }}
        >
          <Box>
            <IcoErp />
          </Box>
          ERP 필터
        </Button>
        <BtnReset />
        <Button
          variant="filterTop"
          onClick={() => {
            setSv({ props: null, viewId: "eval" });
          }}
        >
          <Box>
            <IcoBarChart />
          </Box>
          리포트
        </Button>
      </Flex>
      {filterType === "anal" && <NiceFilterDepth areaCode={dong?.slctCode} />}
      {filterType === "erp" && (
        <ErpFilter toolOpen={toolOpen} areaCode={sigungu?.slctCode} />
      )}
      {isToolOpen && <DrawTools />}
    </>
  );
};

export default FlowDong;
