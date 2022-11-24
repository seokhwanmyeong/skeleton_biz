//  Lib
import { useState } from "react";
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
import FilterInfoCom from "@src/components/sementicMapLayer/sementicSearchFilter/FilterInfoCom";
import FilterBaseState from "@src/components/sementicMapLayer/sementicSearchFilter/FilterBaseState";
//  States
import {
  atomSementicBaseList,
  atomSementicState,
  atomMapControllState,
  resetSementicAtom,
} from "@states/searchState/stateSearch";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";

type Props = {};

const SementicSearchEngine = (props: Props) => {
  //  Option Handler
  const baseList = useRecoilValue(atomSementicBaseList);
  const { baseCheck } = useRecoilValue(atomSementicState);
  const resetState = useSetRecoilState(resetSementicAtom);
  const [controllState, setControllState] =
    useRecoilState(atomMapControllState);
  console.log("render engine");
  //  Toggle Event
  const [isOpen, setOpen] = useState(true);

  const onToggle = () => {
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
      transition="0.3s"
    >
      <Button
        borderRadius={isOpen ? "0px 0px 5px 5px" : "0px 0px 5px 0px"}
        bgColor="#646464"
        onClick={onToggle}
        transition="0.5s"
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
      >
        <Accordion
          defaultIndex={[0]}
          variant={"searchEngine"}
          allowMultiple
          onChange={(e) => {}}
        >
          <AccordionItem key={`Item-Map-Select`}>
            <AccordionButton>
              Set Base State
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel
              display="flex"
              w="30rem"
              flexDirection="column"
              backgroundColor="#ededed"
              color="#555555"
              fontSize="0.8rem"
              fontWeight="bold"
            >
              <FilterBaseState />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem key={`Item-Option-Select`} isDisabled={!baseCheck}>
            <AccordionButton>
              {baseList.infoCom.title}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel
              display="flex"
              flexDirection="column"
              backgroundColor="#ededed"
              color="#555555"
            >
              <FilterInfoCom isDisabled={!baseCheck} />
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
