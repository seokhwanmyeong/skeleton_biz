//  Lib
import { useState, useEffect } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
//  Component
import UpjonListBox from "@components/sementicMapLayer/elementFilter/UpjongListBox";
import NiceFilterDepth from "@components/sementicMapLayer/elementFilter/NiceFilterDepth";
import BtnReset from "@components/sementicMapLayer/elementFilter/BtnReset";
import BtnFlowCustom from "@components/sementicMapLayer/elementFilter/BtnFlowCustom";
import DecoTop from "@components/sementicMapLayer/elementDeco/DecoTop";
//  State
import { atomSlctCustom } from "@states/sementicMap/stateMap";
//  Icon
import { IcoBarChart, IcoFilter } from "@assets/icons/icon";
import { sementicViewState } from "@states/sementicMap/stateView";

type Props = {};

const FlowCustom = (props: Props) => {
  const cutomArea = useRecoilValue(atomSlctCustom);
  const setSv = useSetRecoilState(sementicViewState);
  const resetSv = useResetRecoilState(sementicViewState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterType, setType] = useState("");

  useEffect(() => {
    return () => {
      resetSv();
    };
  }, []);

  return (
    <>
      <Flex
        pos="absolute"
        top="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        gap={"4rem"}
      >
        <Flex
          pos="relative"
          pt="0.3rem"
          direction="column"
          justify="flex-start"
          color="#000000"
          gap="0.5rem"
        >
          <Flex pos="relative" direction="column">
            <Button variant="filterTopMain" cursor="unset">
              {cutomArea.slctName}
            </Button>
            <DecoTop width={"13rem"} />
          </Flex>
        </Flex>
        <Flex pos="absolute" right="-4rem">
          <UpjonListBox />
        </Flex>
      </Flex>
      {/* ------------------------------ 하단 ------------------------------*/}
      <Flex
        pos="absolute"
        bottom="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        gap="4.25rem"
      >
        <Button
          variant="filterTop"
          isActive={isOpen}
          onClick={() => (isOpen ? onClose() : onOpen())}
        >
          <Box>
            <IcoFilter />
          </Box>
          마켓데이터
        </Button>
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
        <BtnReset />
      </Flex>
      {isOpen && <NiceFilterDepth path={cutomArea.slctPath} />}
    </>
  );
};

export default FlowCustom;
