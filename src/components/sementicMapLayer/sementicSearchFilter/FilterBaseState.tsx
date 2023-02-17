//  Lib
import { Fragment, memo, useContext } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  Flex,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Stack,
} from "@chakra-ui/react";
//  State
import {
  atomAreaOption,
  areaSelectActivator,
  atomArea,
} from "@states/searchState/stateSearch";
import { BaseAreaContext } from "../filter/BaseAreaProvider";

const FilterBaseState = memo(() => {
  const { slctAreaName, slctAreaCode } = useRecoilValue(atomArea);
  const { activeHandler } = useContext(BaseAreaContext);
  const mapState = useRecoilValue(atomAreaOption);
  const [currentEvent, setMapControll] = useRecoilState(areaSelectActivator);
  console.log("render FilterBaseState");

  return (
    <Flex>
      <Button w="100%" variant="reverse" onClick={() => activeHandler(true)}>
        지역변경하기
      </Button>
    </Flex>
  );
});

export default FilterBaseState;
