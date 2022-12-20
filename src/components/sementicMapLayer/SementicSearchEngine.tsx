//  Lib
import { useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
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
} from "@states/searchState/stateSearch";

const SementicSearchEngine = () => {
  //  Option Handler
  const baseList = useRecoilValue(atomSementicBaseList);
  const isCheckbaseOption = useRecoilValue(checkBaseState);
  const resetState = useSetRecoilState(resetSementicAtom);
  console.log("render engine");

  //  Toggle Event
  const [isOpen, setOpen] = useState(true);

  const onToggle = (e: any) => {
    setOpen(!isOpen);
  };

  return (
    <Flex
      position="absolute"
      left="0"
      top="0"
      zIndex="100"
      flexDirection="row-reverse"
      gap={isOpen ? "10px" : "0"}
      transition="0.5s"
      backgroundColor="transparent"
    >
      <Button
        position="absolute"
        right="-200px"
        top="0"
        w="200px"
        borderRadius={isOpen ? "0px 0px 5px 5px" : "0px 0px 5px 0px"}
        bgColor="#646464"
        onClick={(e) => onToggle(e)}
        transition="0.2s"
        color="#ffffff"
        _hover={{
          bgColor: "#000000",
        }}
      >
        SementicSearchEngine
      </Button>
      <Flex
        w={isOpen ? "auto" : "0"}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        transition="0.5s"
        backgroundColor="transparent"
      >
        <Accordion defaultIndex={[0]} variant={"searchEngine"} allowMultiple>
          <AccordionItem key={`Item-Map-Select`}>
            <AccordionButton>
              Set Base State
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <FilterBaseState />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem
            key={`Item-Option-Select`}
            isDisabled={!isCheckbaseOption}
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
          w="auto"
          bgColor="#555555"
          color="#eeeeee"
          onClick={() => resetState()}
        >
          RESET
        </Button>
      </Flex>
    </Flex>
  );
};

export default SementicSearchEngine;
