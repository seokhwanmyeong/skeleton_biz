//  Lib
import React, { ReactNode, useEffect } from "react";
import { Flex, Text, Stack, Button, useColorMode } from "@chakra-ui/react";
//  Components
import Tag from "@components/common/Tag";
//  States
import {
  selectorSearchOption,
  atomSearchOption,
} from "@states/searchState/stateSearch";
import { useRecoilState, useResetRecoilState } from "recoil";

type Props = {};
type FilterGroup = {
  title: string;
  data?: { [key: string]: any };
  dataKey?: string;
};

const SementicFilter = (props: any) => {
  const [option, setOption] = useRecoilState(selectorSearchOption);
  const resetOption = useResetRecoilState(atomSearchOption);
  const mode = useColorMode();

  const FilterGroup = (props: FilterGroup) => {
    const { title = "항목", data = {}, dataKey = "" } = props;

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

    return (
      <Flex
        p="0 1rem"
        alignItems="center"
        justifyContent="center"
        transition="0.5s"
      >
        <Text mr="1rem">{title}</Text>
        <Flex>
          {data[dataKey] !== undefined &&
            data[dataKey].list.length > 0 &&
            data[dataKey].list.map((option: string) => (
              <Tag
                key={`tag-${option}`}
                text={option}
                hasBtn={true}
                onClick={() => optionHandler("remove", dataKey, option)}
              />
            ))}
        </Flex>
      </Flex>
    );
  };

  useEffect(() => {
    console.log(option);
  }, []);

  return (
    <Flex
      w="100%"
      h="100%"
      p="1rem 2rem"
      alignItems="center"
      justifyContent="left"
      borderBottom="1px solid"
      borderColor={mode.colorMode === "dark" ? "#ffffff29" : "#ededed"}
      transition="0.5s"
    >
      <FilterGroup title="OPTION" data={option} dataKey="map" />
      <FilterGroup title="test STATE" data={option} dataKey="test" />
      <Button onClick={resetOption}>Reset Option</Button>
    </Flex>
  );
};

export default SementicFilter;
