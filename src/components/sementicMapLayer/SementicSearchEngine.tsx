//  Lib
import { useEffect, useState, useRef, useLayoutEffect } from "react";
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
  const [offsetW, setOffsetW] = useState(0);
  const ref = useRef<any>();

  const onToggle = (e: any) => {
    setOffsetW(offsetW === 0 ? -ref.current.clientWidth : 0);
  };

  return (
    <Flex
      position="absolute"
      left={`${offsetW}px`}
      top="0"
      zIndex="100"
      flexDirection="row-reverse"
      transition="0.3s"
      backgroundColor="transparent"
    >
      <Button
        w="auto"
        borderRadius={offsetW === 0 ? "0px 0px 5px 5px" : "0px 0px 5px 0px"}
        bgColor="primary.main.bg"
        onClick={(e) => onToggle(e)}
        transition="0.3s"
        color="primary.main.font"
        _hover={{
          bgColor: "primary.main.hover",
        }}
      >
        SementicSearchEngine
      </Button>
      <Flex
        w={"auto"}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        transition="0.5s"
        backgroundColor="transparent"
        ref={ref}
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
          bgColor="primary.main.bg"
          color="primary.main.font"
          transition="0.3s"
          _hover={{
            bgColor: "primary.main.hover",
          }}
          onClick={() => resetState()}
        >
          RESET
        </Button>
      </Flex>
    </Flex>
  );
};

export default SementicSearchEngine;
