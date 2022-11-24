//  Lib
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
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
//  Components
import Tag from "@components/common/Tag";
//  State
import {
  atomSementicBaseList,
  atomSementicState,
  collectSementicState,
  atomSementicMapState,
  mapControllHandler,
  atomSementicUpjong,
  selectorSementicUpjong,
} from "@src/states/searchState/stateSearch";

const FilterBaseState = () => {
  const baseList = useRecoilValue(atomSementicBaseList);
  // const { pointer, area, sector } = useRecoilValue(atomSementicState);
  // const determineState = useSetRecoilState(collectSementicState);
  const mapState = useRecoilValue(atomSementicMapState);
  const setMapControll = useSetRecoilState(mapControllHandler);
  const upjongState = useRecoilValue(atomSementicUpjong);
  const updateUpjong = useSetRecoilState(selectorSementicUpjong);
  const [selectUpjong, setSelectUpjong] = useState(upjongState);
  console.log("render FilterBaseState");

  const selectUpjongHandler = (step: "main" | "mid", main: any, mid?: any) => {
    let upjongData: {
      mainUpjong: {
        title: string;
        code: string;
      };
      midUpjong: {
        title: string;
        code: string;
      };
      subUpjong: {
        title: string;
        code: string;
      };
      currentCode: string;
    };

    if (step === "main") {
      upjongData = {
        ...selectUpjong,
        mainUpjong: {
          title: main.title,
          code: main.code,
        },
        midUpjong: {
          title: "",
          code: "",
        },
        currentCode: `${main.code}`,
      };
    } else if (step === "mid") {
      upjongData = {
        ...selectUpjong,
        mainUpjong: {
          title: main.title,
          code: main.code,
        },
        midUpjong: {
          title: mid.title,
          code: mid.code,
        },
        currentCode: `${main.code}${mid.code}`,
      };
    } else {
      console.log("Check Props Step");
      return;
    }

    setSelectUpjong(upjongData);
  };

  return (
    <Tabs>
      <TabList justifyContent="center">
        <Tab key="tab-pointer" flexDirection="column" w="30%">
          <Text>POINTER</Text>
          <Text
            fontSize="12px"
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {/* {pointer.address} */}
          </Text>
        </Tab>
        <Tab key="tab-sector" flexDirection="column" w="30%">
          <Text>업종</Text>
          <Text fontSize="12px">
            {upjongState.mainUpjong.title}
            {upjongState.midUpjong.title}
          </Text>
        </Tab>
        <Tab key="tab-area" flexDirection="column" w="30%">
          <Text>AREA</Text>
          <Text fontSize="12px">설정 Boolean</Text>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel key="panel-pointer">
          <Stack>
            <Text>지도화면에서 원하시는 지역을 클릭해주세요</Text>
            <Text>선택 위치: {mapState.pointer.address}</Text>
            <Button
              onClick={() => {
                setMapControll("activePoint");
              }}
            >
              위치설정
            </Button>
          </Stack>
        </TabPanel>
        <TabPanel key="panel-sector">
          <Stack>
            <Tabs>
              <TabList flexWrap="wrap">
                {baseList.upjong.mainUpjong.list.map((main: any) => {
                  return (
                    <Tab
                      w="90px"
                      m="5px 10px"
                      key={`${main.title}`}
                      onClick={() => {
                        selectUpjongHandler("main", main);
                      }}
                    >
                      <Text>{main.title}</Text>
                    </Tab>
                  );
                })}
              </TabList>
              <TabPanels>
                {baseList.upjong.mainUpjong.list.map(
                  (main: any, idx: number) => {
                    return (
                      <TabPanel key={`panel-sector-${idx}`}>
                        <Flex flexWrap="wrap" gap="1rem" maxWidth="20rem">
                          {main.midUpjong?.list.map((mid: any) => {
                            return (
                              <Tag
                                variant="filterOption"
                                key={`tag-${mid.title}`}
                                text={mid.title}
                                tagBtn={true}
                                onClick={() => {
                                  selectUpjongHandler("mid", main, mid);
                                }}
                              />
                            );
                          })}
                        </Flex>
                      </TabPanel>
                    );
                  }
                )}
              </TabPanels>
            </Tabs>
            <Text>
              선택 업종: {selectUpjong.mainUpjong.title}
              {selectUpjong.midUpjong.title}
            </Text>
            <Button
              onClick={() => {
                updateUpjong(selectUpjong);
              }}
            >
              설정완료
            </Button>
          </Stack>
        </TabPanel>
        <TabPanel key="panel-area">
          <Button onClick={() => {}}>설정완료</Button>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default FilterBaseState;
