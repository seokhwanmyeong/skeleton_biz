//  Lib
import { useState, useEffect, Fragment } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
//  Component
import UpjonListBox from "@components/sementicMapLayer/elementFilter/UpjongListBox";
import NiceFilterDepth from "@components/sementicMapLayer/elementFilter/NiceFilterDepth";
import BtnReset from "@components/sementicMapLayer/elementFilter/BtnReset";
import ModalBuilding from "@components/modal/map/ModalBuilding";
//  State
import { atomSlctCustom } from "@states/sementicMap/stateMap";
import { sementicViewState } from "@states/sementicMap/stateView";
//  Icon
import {
  IcoBarChart,
  IcoFilter,
  IcoBuildingList,
  IcoVillage,
} from "@assets/icons/icon";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
import {
  DecoTop,
  DecoFrameCenter,
  DecoFrameL,
  DecoFrameR,
} from "@components/sementicMapLayer/elementDeco/Deco";
import { BoxRankingDong } from "./BoxRanking";

type Props = {};

const FlowCustom = (props: Props) => {
  const cutomArea = useRecoilValue(atomSlctCustom);
  const setSv = useSetRecoilState(sementicViewState);
  const resetSv = useResetRecoilState(sementicViewState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const [filterType, setType] = useState("");

  useEffect(() => {
    return () => {
      resetSv();
    };
  }, []);

  return (
    <Fragment>
      {/* ------------------------------ 상단 ------------------------------*/}
      <Flex
        pos="absolute"
        top="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        gap={"4rem"}
      >
        <Flex
          pos="relative"
          pt="0.3rem"
          direction="column"
          justify="flex-start"
          color="#000000"
          gap="0.5rem"
        >
          <Flex pos="relative" direction="column">
            <Button variant="filterTopMain" cursor="unset">
              {cutomArea.slctName}
            </Button>
            <DecoTop width={"13rem"} />
          </Flex>
        </Flex>
        <Flex pos="absolute" right="-4rem">
          <UpjonListBox />
        </Flex>
      </Flex>
      {/* --------------------------- 중단 Frame ---------------------------*/}
      <Flex w="100%" h="100%" zIndex={1} gap="0.625rem" pointerEvents="none">
        <DecoFrameL pl="1rem">
          <BoxRankingDong />
          <Flex
            pos="relative"
            m="0.1875rem 0"
            p="1rem 1.375rem 1rem"
            w="100%"
            h="50%"
            direction="column"
            border="1px solid"
            borderColor="neutral.gray6"
            borderLeft="none"
            bg="linear-gradient(270deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 100%)"
            backdropFilter="blur(2px)"
          >
            <Flex
              w="100%"
              h="fit-content"
              justify="center"
              align="center"
              gap="0.75rem"
            >
              <Heading
                as={"h5"}
                bg="none"
                fontSize="sm"
                lineHeight="1px"
                color="font.title"
                textAlign="center"
                letterSpacing="2.66667px"
              >
                일평균 유동인구
              </Heading>
            </Flex>
            <Deco01 margin="0.75rem 0 0.25rem" width="100%" height="auto" />
            <Flex direction="column">
              <Text
                mb="0.25rem"
                w="100%"
                textStyle="base"
                fontSize="0.5rem"
                textAlign="end"
                color="font.gray"
              >
                (명)
              </Text>
              <Flex mb="2rem" align="flex-end" gap="2px">
                <Box
                  w="20%"
                  h="0.75rem"
                  borderRadius="base"
                  bgColor="system.default.indigo"
                />
                <Box
                  pos="relative"
                  bgColor="font.secondary"
                  w="1px"
                  h="0.375rem"
                  _after={{
                    content: '"6,000"',
                    display: "inline-block",
                    pos: "absolute",
                    top: "0.5rem",
                    transform: "translateX(-50%)",
                    textStyle: "base",
                    fontSize: "0.5rem",
                    textAlign: "end",
                    color: "font.gray",
                  }}
                />
                <Box
                  w="20%"
                  h="0.75rem"
                  borderRadius="base"
                  bgColor="system.default.blue"
                />
                <Box
                  pos="relative"
                  bgColor="font.secondary"
                  w="1px"
                  h="0.375rem"
                  _after={{
                    content: '"10,000"',
                    display: "inline-block",
                    pos: "absolute",
                    top: "0.5rem",
                    transform: "translateX(-50%)",
                    textStyle: "base",
                    fontSize: "0.5rem",
                    textAlign: "end",
                    color: "font.gray",
                  }}
                />
                <Box
                  w="20%"
                  h="0.75rem"
                  borderRadius="base"
                  bgColor="system.default.yellow"
                />
                <Box
                  pos="relative"
                  bgColor="font.secondary"
                  w="1px"
                  h="0.375rem"
                  _after={{
                    content: '"13,000"',
                    display: "inline-block",
                    pos: "absolute",
                    top: "0.5rem",
                    transform: "translateX(-50%)",
                    textStyle: "base",
                    fontSize: "0.5rem",
                    textAlign: "end",
                    color: "font.gray",
                  }}
                />
                <Box
                  w="20%"
                  h="0.75rem"
                  borderRadius="base"
                  bgColor="system.default.orange"
                />
                <Box
                  pos="relative"
                  bgColor="font.secondary"
                  w="1px"
                  h="0.375rem"
                  _after={{
                    content: '"16,000"',
                    display: "inline-block",
                    pos: "absolute",
                    top: "0.5rem",
                    transform: "translateX(-50%)",
                    textStyle: "base",
                    fontSize: "0.5rem",
                    textAlign: "end",
                    color: "font.gray",
                  }}
                />
                <Box
                  w="20%"
                  h="0.75rem"
                  borderRadius="base"
                  bgColor="system.default.red"
                />
              </Flex>
              <List display="flex" flexDirection="column" gap="0.75rem">
                <ListItem
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  gap="0.75rem"
                >
                  <Text textStyle="base" fontSize="sm">
                    18,000 명 이상
                  </Text>
                  <Text textStyle="base" fontSize="md" fontWeight="strong">
                    1 등급
                  </Text>
                  <Box
                    w="0.75rem"
                    h="0.75rem"
                    borderRadius="50%"
                    bgColor="system.default.red"
                  />
                </ListItem>
                <ListItem
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  gap="0.75rem"
                >
                  <Text textStyle="base" fontSize="sm">
                    13,000 ~ 18,000 명
                  </Text>
                  <Text textStyle="base" fontSize="md" fontWeight="strong">
                    2 등급
                  </Text>
                  <Box
                    w="0.75rem"
                    h="0.75rem"
                    borderRadius="50%"
                    bgColor="system.default.orange"
                  />
                </ListItem>
                <ListItem
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  gap="0.75rem"
                >
                  <Text textStyle="base" fontSize="sm">
                    10,000 ~ 13,000 명
                  </Text>
                  <Text textStyle="base" fontSize="md" fontWeight="strong">
                    3 등급
                  </Text>
                  <Box
                    w="0.75rem"
                    h="0.75rem"
                    borderRadius="50%"
                    bgColor="system.default.yellow"
                  />
                </ListItem>
                <ListItem
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  gap="0.75rem"
                >
                  <Text textStyle="base" fontSize="sm">
                    6,000 ~ 10,000 명
                  </Text>
                  <Text textStyle="base" fontSize="md" fontWeight="strong">
                    4 등급
                  </Text>
                  <Box
                    w="0.75rem"
                    h="0.75rem"
                    borderRadius="50%"
                    bgColor="system.default.blue"
                  />
                </ListItem>
                <ListItem
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  gap="0.75rem"
                >
                  <Text textStyle="base" fontSize="sm">
                    6,000 명 이하
                  </Text>
                  <Text textStyle="base" fontSize="md" fontWeight="strong">
                    5 등급
                  </Text>
                  <Box
                    w="0.75rem"
                    h="0.75rem"
                    borderRadius="50%"
                    bgColor="system.default.indigo"
                  />
                </ListItem>
              </List>
            </Flex>
          </Flex>
        </DecoFrameL>
        <DecoFrameCenter />
        <DecoFrameR pr="0.25rem">
          <Flex
            pos="relative"
            m="0.1875rem 0"
            p="1rem 1.375rem 1rem"
            w="100%"
            h="100%"
            direction="column"
            border="1px solid"
            borderColor="neutral.gray6"
            bg="linear-gradient(90deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 100%)"
            backdropFilter="blur(2px)"
          >
            <Flex
              w="100%"
              h="fit-content"
              justify="center"
              align="center"
              gap="0.75rem"
            >
              <Heading
                as={"h5"}
                bg="none"
                fontSize="sm"
                lineHeight="1px"
                color="font.title"
                textAlign="center"
              >
                사업체 데이터
              </Heading>
            </Flex>
            <Deco01 margin="0.75rem 0 0.5rem" width="100%" height="auto" />
            <Tabs variant="depthListBox">
              <TabList mb="1rem" border="none">
                <Tab>사업체</Tab>
                <Tab>건물</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <List display="flex" flexDirection="column" gap="1rem">
                    <ListItem
                      p="0rem 0rem 0.75rem"
                      display="flex"
                      alignItems="center"
                      gap="0.75rem"
                      borderBottom="1px solid"
                      borderColor="neutral.gray8"
                      _hover={{
                        fontWeight: "strong",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        console.log("click");
                      }}
                    >
                      <Flex
                        justify="center"
                        align="center"
                        w="2.5rem"
                        h="2rem"
                        bgColor="secondary.third.type5"
                        border="1px solid"
                        borderColor="neutral.gray8"
                        borderRadius="2px"
                      >
                        <IcoBuildingList color="#FFFFFFD9" />
                      </Flex>
                      <Text
                        textStyle="base"
                        fontSize="md"
                        fontWeight="strong"
                        color="font.primary"
                      >
                        스타벅스 강남점
                      </Text>
                    </ListItem>
                  </List>
                </TabPanel>
                <TabPanel>
                  <List display="flex" flexDirection="column" gap="1rem">
                    <ListItem
                      p="0rem 0.25rem 1rem"
                      display="flex"
                      alignItems="center"
                      gap="1rem"
                      borderBottom="1px solid"
                      borderColor="neutral.gray8"
                      _hover={{
                        fontWeight: "strong",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        console.log("click");
                        onModalOpen();
                      }}
                    >
                      <Flex
                        w="2rem"
                        h="2rem"
                        justify="center"
                        align="center"
                        bgColor="secondary.second.type5"
                        border="1px solid"
                        borderColor="neutral.gray8"
                        borderRadius="50%"
                      >
                        <IcoVillage
                          width="1.5rem"
                          height="1.5rem"
                          color="#FFFFFF"
                        />
                      </Flex>
                      <Flex direction="column">
                        <Text
                          textStyle="base"
                          fontSize="md"
                          fontWeight="strong"
                          color="font.primary"
                        >
                          대성빌딩
                        </Text>
                        <Text
                          textStyle="base"
                          fontSize="xs"
                          fontWeight="regular"
                          color="font.primary"
                        >
                          서울 종로구 평창동 7-249
                        </Text>
                      </Flex>
                    </ListItem>
                  </List>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </DecoFrameR>
        <ModalBuilding onClose={onModalClose} isOpen={isModalOpen} />
      </Flex>
      {/* ------------------------------ 하단 ------------------------------*/}
      <Flex
        pos="absolute"
        bottom="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        gap="4.25rem"
      >
        <Button
          variant="filterTop"
          isActive={isOpen}
          onClick={() => (isOpen ? onClose() : onOpen())}
        >
          <Box>
            <IcoFilter />
          </Box>
          마켓데이터
        </Button>
        <Button
          variant="filterTop"
          onClick={() => {
            setSv({ props: null, viewId: "eval" });
          }}
        >
          <Box>
            <IcoBarChart />
          </Box>
          리포트
        </Button>
        <BtnReset />
      </Flex>
      {isOpen && <NiceFilterDepth path={cutomArea.slctPath} />}
    </Fragment>
  );
};

export default FlowCustom;
