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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
//  Components
import { CheckBox } from "@components/common/CheckBox";
//  States
import {
  atomSearchBaseOption,
  atomInfoCom,
  selectorInfoCom,
} from "@states/searchState/stateSearch";
import { useSetRecoilState, useRecoilValue } from "recoil";

type Props = {};

const SementicSearchEngine = (props: Props) => {
  //  Option Handler
  const optionBase = useRecoilValue(atomSearchBaseOption);
  const infocomList = useRecoilValue(atomInfoCom);
  const setInfoCom = useSetRecoilState(selectorInfoCom);
  const [mapBlock, setMapBlock] = useState({
    blockCode: "",
    isCheck: true,
  });
  const [area, setArea] = useState({
    polygon: "",
    isCheck: true,
  });
  const [sector, setSector] = useState({
    mainSector: {
      key: "",
      isCheck: false,
    },
    midSector: {
      key: "",
      isCheck: false,
    },
    subSector: {
      key: "",
      isCheck: false,
    },
  });

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
        <Accordion defaultIndex={[0]} variant={"searchEngine"} allowMultiple>
          <AccordionItem key={`Item-Map-Select`}>
            <AccordionButton>
              Set Base State
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel
              display="flex"
              flexDirection="column"
              backgroundColor="#ededed"
              color="#555555"
              fontSize="0.8rem"
              fontWeight="bold"
            >
              <Tabs>
                <TabList>
                  <Tab flexDirection="column">
                    <Text>POINTER</Text>
                    <Text>주소 데이터</Text>
                  </Tab>
                  <Tab flexDirection="column">
                    <Text>SECTOR</Text>
                    <Text>대/중/소분류</Text>
                  </Tab>
                  <Tab flexDirection="column">
                    <Text>AREA</Text>
                    <Text>설정 Boolean</Text>
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Text>지도화면에서 원하시는 지역을 클릭해주세요</Text>
                  </TabPanel>
                  <TabPanel>test</TabPanel>
                  <TabPanel>test</TabPanel>
                </TabPanels>
              </Tabs>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem key={`Item-Option-Select`} isDisabled={false}>
            <AccordionButton>
              {optionBase.infoCom.title}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel
              display="flex"
              flexDirection="column"
              backgroundColor="#ededed"
              color="#555555"
            >
              {optionBase.infoCom.list.map(
                (option: { [key: string]: string }) => {
                  const { title, key } = option;

                  return (
                    <CheckBox
                      isChecked={infocomList.includes(key)}
                      key={key}
                      value={key}
                      title={title}
                      onChange={(e: any) => {
                        setInfoCom({
                          method: infocomList.includes(key) ? "remove" : "add",
                          infoCom: key,
                        });
                      }}
                    />
                  );
                }
              )}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </Flex>
  );
};

export default SementicSearchEngine;
