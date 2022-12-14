//  Lib
import { useState, memo } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
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
  atomSementicMapState,
  mapControllHandler,
  atomSementicUpjong,
  selectorSementicUpjong,
} from "@states/searchState/stateSearch";

const FilterBaseState = memo(() => {
  const baseList = useRecoilValue(atomSementicBaseList);
  const mapState = useRecoilValue(atomSementicMapState);
  const [currentEvent, setMapControll] = useRecoilState(mapControllHandler);
  const upjongState = useRecoilValue(atomSementicUpjong);
  const updateUpjong = useSetRecoilState(selectorSementicUpjong);
  const [selectUpjong, setSelectUpjong] = useState({
    mainUpjong: {
      title: "Total",
      code: "total",
    },
    midUpjong: {
      title: "",
      code: "",
    },
    subUpjong: {
      title: "",
      code: "",
    },
    currentCode: "",
    allCheck: false,
  });
  console.log("render FilterBaseState");

  const selectUpjongHandler = (step: "main" | "mid", main: any, mid?: any) => {
    let upjongData;

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
            {mapState.pointer.address}
          </Text>
        </Tab>
        <Tab key="tab-sector" flexDirection="column" w="30%">
          <Text>??????</Text>
          <Text fontSize="12px">
            {upjongState.mainUpjong.title}
            {upjongState.midUpjong.title}
          </Text>
        </Tab>
        <Tab key="tab-area" flexDirection="column" w="30%">
          <Text>AREA</Text>
          <Text fontSize="12px">?????? Boolean</Text>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel key="panel-pointer">
          <Stack>
            <Text>?????????????????? ???????????? ????????? ??????????????????</Text>
            <Text>?????? ??????: {mapState.pointer.address}</Text>
            <Button
              variant="reverse"
              onClick={() => {
                currentEvent !== "activePoint" && setMapControll("activePoint");
              }}
            >
              ????????????
            </Button>
          </Stack>
        </TabPanel>
        <TabPanel key="panel-upjong">
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
              ?????? ??????: {selectUpjong.mainUpjong.title}
              {selectUpjong.midUpjong.title}
            </Text>
            <Button
              variant="reverse"
              onClick={() => {
                updateUpjong(selectUpjong);
              }}
            >
              ????????????
            </Button>
          </Stack>
        </TabPanel>
        <TabPanel key="panel-area">
          <Button
            variant="reverse"
            onClick={() => {
              currentEvent !== "activePolygon" &&
                setMapControll("activePolygon");
            }}
          >
            ????????????
          </Button>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
});

export default FilterBaseState;
