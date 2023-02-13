//  Lib
import { useState, useRef } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import {
  Flex,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
//  Components
import FilterInfoCom from "@components/sementicMapLayer/sementicSearchFilter/FilterInfoCom";
import FilterBaseState from "@components/sementicMapLayer/sementicSearchFilter/FilterBaseState";
//  States
import {
  atomSementicBaseList,
  checkBaseState,
  resetSementicAtom,
  areaSelectActivator,
} from "@states/searchState/stateSearch";

const SementicSearchEngine = () => {
  //  Option Handler
  const baseList = useRecoilValue(atomSementicBaseList);
  const isCheckbaseOption = useRecoilValue(checkBaseState);
  const [currentEvent, setMapControll] = useRecoilState(areaSelectActivator);
  const [openItem, setOpenItem] = useState<number>(0);
  const resetState = useSetRecoilState(resetSementicAtom);

  const resetHandler = () => {
    setOpenItem(0);
    resetState();
  };

  return (
    <Flex
      position="absolute"
      top="0"
      left="0"
      zIndex="100"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      w={"auto"}
      backgroundColor="transparent"
      transition="0.5s"
    >
      <Accordion
        index={openItem}
        variant={"searchEngine"}
        onChange={(idx: number) => setOpenItem(idx)}
        allowToggle
      >
        <AccordionItem key={`Item-Map-Select`}>
          <AccordionButton>
            필수선택 옵션
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <FilterBaseState />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem
          key={`Item-Option-Select`}
          isDisabled={!isCheckbaseOption || currentEvent === "activePoint"}
        >
          <AccordionButton>
            {baseList.infoCom.title}
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <FilterInfoCom isDisabled={!isCheckbaseOption} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Button
        position="absolute"
        bottom="-4rem"
        left="1rem"
        w="auto"
        bgColor="primary.main.bg"
        color="primary.main.font"
        transition="0.3s"
        _hover={{
          bgColor: "primary.main.hover",
        }}
        onClick={resetHandler}
      >
        초기화
      </Button>
    </Flex>
  );
};

export default SementicSearchEngine;
