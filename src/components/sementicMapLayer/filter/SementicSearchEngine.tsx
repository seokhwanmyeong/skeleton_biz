//  Lib
import React, { Fragment, ReactNode, useEffect, useState } from "react";
import {
  Flex,
  Button,
  Text,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  useColorMode,
} from "@chakra-ui/react";
//  Components
import Tag from "@components/common/Tag";
//  States
import {
  selectorSearchOption,
  atomOptionList,
} from "@states/searchState/stateSearch";
import { useRecoilState, useRecoilValue } from "recoil";

type Props = {};

const SementicSearchEngine = (props: Props) => {
  const optionList = useRecoilValue(atomOptionList);
  const [options, setOption] = useRecoilState(selectorSearchOption);
  const [isOpen, setOpen] = useState(true);
  const mode = useColorMode();

  const onToggle = () => {
    setOpen(!isOpen);
  };

  const optionAddHandler = (optionType: string, layerName: string) => {
    console.log(optionType, layerName);
    setOption({
      optionCate: optionType,
      eventType: "add",
      optionVal: layerName,
    });
  };

  const optionHandler = (
    eventType: "add" | "remove",
    optionCate: string,
    optionName: string
  ) => {
    setOption({
      eventType: eventType,
      optionCate: optionCate,
      optionVal: optionName,
    });
    return;
  };

  useEffect(() => {
    console.log("searchEngin Option State\n", options);
  }, [options]);

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
        Filter
      </Button>
      <Flex
        w={isOpen ? "auto" : "0"}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        transition="0.5s"
      >
        <Accordion variant={"searchEngine"} allowMultiple>
          {optionList.optionKey.map((key: string) => {
            const optionData = optionList[key];

            return (
              <AccordionItem key={`Item-${key}`}>
                <AccordionButton>
                  {optionData.title}
                  <AccordionIcon />
                </AccordionButton>
                {optionData.list.length > 0 && (
                  <AccordionPanel>
                    <Accordion variant={"searchEngineSub"} allowMultiple>
                      {optionData.list.map((option: string) => {
                        return (
                          <AccordionItem key={`option-${option}`}>
                            <Tag
                              key={`search-tag-${option}`}
                              text={option}
                              variant="filterOption"
                              hasBtn={true}
                              onClick={() => optionHandler("add", key, option)}
                            />
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </AccordionPanel>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>
      </Flex>
    </Flex>
  );
};

export default SementicSearchEngine;
