//  Lib
import { useContext, useState, useEffect } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
//  Component
import UpjonListBox from "@components/sementicMapLayer/elementFilter/UpjongListBox";
import NiceFilterDepth from "@components/sementicMapLayer/elementFilter/NiceFilterDepth";
import ErpFilter from "@components/sementicMapLayer/elementFilter/ErpFilter";
import BtnReset from "@components/sementicMapLayer/elementFilter/BtnReset";
import BtnBack from "@components/sementicMapLayer/elementFilter/BtnBack";
import DrawTools from "@components/sementicMapLayer/elementFilter/DrawTools";
//  State
import { atomFilterFlow } from "@states/sementicMap/stateFilter";
import { atomFlowEnterArea, atomSlctDong } from "@states/sementicMap/stateMap";
import { sementicViewState } from "@states/sementicMap/stateView";
//  Icon
import { IcoBarChart, IcoErp, IcoFilter } from "@assets/icons/icon";
//  Deco
import { DecoTop } from "@components/sementicMapLayer/elementDeco/Deco";

type Props = {};

const FlowDong = (props: Props) => {
  const { state } = useContext(NaverMapContext);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const setSv = useSetRecoilState(sementicViewState);
  const resetSv = useResetRecoilState(sementicViewState);
  const { sigungu } = useRecoilValue(atomFlowEnterArea);
  const dong = useRecoilValue(atomSlctDong);
  const [isToolOpen, toolOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterType, setType] = useState("");

  useEffect(() => {
    return () => {
      resetSv();
    };
  }, []);

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
                  setFlow("sigungu");
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
        <ErpFilter
          isToolOpen={isToolOpen}
          toolOpen={toolOpen}
          areaCode={sigungu?.slctCode}
        />
      )}
      {isToolOpen && <DrawTools />}
    </>
  );
};

export default FlowDong;
