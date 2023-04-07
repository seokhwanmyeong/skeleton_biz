//  Lib
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
//  Component
import UpjonListBox from "@src/components/sementicMapLayer/elementFilter/UpjongListBox";
import NiceFilterDepth from "@src/components/sementicMapLayer/elementFilter/NiceFilterDepth";
import ErpFilter from "@src/components/sementicMapLayer/elementFilter/ErpFilter";
import BtnReset from "@src/components/sementicMapLayer/elementFilter/BtnReset";
import BtnFlowCustom from "@src/components/sementicMapLayer/elementFilter/BtnFlowCustom";
import DecoTop from "@src/components/sementicMapLayer/elementFilter/DecoTop";
import DrawTools from "@src/components/sementicMapLayer/elementFilter/DrawTools";
//  State
import { atomSlctCustom } from "@src/states/sementicMap/stateMap";
//  Icon
import { IcoBarChart, IcoErp, IcoFilter } from "@src/assets/icons/icon";

type Props = {};

const FlowCustom = (props: Props) => {
  const cutomArea = useRecoilValue(atomSlctCustom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterType, setType] = useState("");
  const [isToolOpen, toolOpen] = useState(false);

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
              <Button
                variant="filterTopMain"
                onClick={() => {
                  isOpen ? onClose() : onOpen();
                }}
              >
                {cutomArea.slctName}
              </Button>
              <DecoTop width={"13rem"} />
            </Flex>
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
        <Button variant="filterTop" onClick={() => {}}>
          <Box>
            <IcoBarChart />
          </Box>
          리포트
        </Button>
      </Flex>
      {filterType === "anal" && <NiceFilterDepth path={cutomArea.slctPath} />}
      {filterType === "erp" && <ErpFilter toolOpen={toolOpen} />}
      {isToolOpen && <DrawTools />}
    </>
  );
};

export default FlowCustom;
