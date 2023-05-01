//  Lib
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  Flex,
  Heading,
  Image,
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
import ModalStoreDetail from "@components/modal/map/ModalStoreDetail";
import ModalBsDisDetail from "@components/modal/map/ModalBsDisDetail";
import ModalRentDetail from "@components/modal/map/ModalRentDetail";
import ModalBuilding from "@components/modal/map/ModalBuilding";
//  State
import { atomSlctErp } from "@states/sementicMap/stateMap";
import { sementicViewState } from "@states/sementicMap/stateView";
//  Util
import { bsDisColor } from "@util/define/bsDis";
//  Icon
import markerStore from "@assets/icons/marker_store.png";
import markerRent from "@assets/icons/marker_rent.png";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";

type Props = { store: any[]; rent: any[]; bsDis: any[] };

const BrandListBox = ({ store, rent, bsDis }: Props) => {
  const setSv = useSetRecoilState(sementicViewState);
  const [slctErp, setSlctErp] = useRecoilState(atomSlctErp);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openIdx, setOpenIdx] = useState(-1);

  return (
    <Flex
      pos="relative"
      m="0.1875rem 0"
      p="1rem 1.375rem 1rem"
      w="100%"
      h="100%"
      direction="column"
      border="1px solid"
      borderColor="neutral.gray6"
      borderRight="none"
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
          매장 조회
        </Heading>
      </Flex>
      <Deco01 margin="0.75rem 0 0.5rem" width="100%" height="auto" />
      <Tabs variant="depthListBox">
        <TabList border="none">
          {store && store.length > 0 && <Tab>매장</Tab>}
          {bsDis && bsDis.length > 0 && <Tab>상권</Tab>}
          {rent && rent.length > 0 && <Tab>매물</Tab>}
        </TabList>
        <TabPanels>
          {store && store.length > 0 && (
            <TabPanel>
              <List display="flex" flexDirection="column">
                {store.map((li: any, idx: number) => {
                  const { storeName, addr, storePhone } = li;

                  return (
                    <ListItem
                      key={`storeList-${idx}`}
                      p="1rem 0rem 0.75rem"
                      display="flex"
                      alignItems="center"
                      gap="1.25rem"
                      borderBottom="1px solid"
                      borderColor="neutral.gray8"
                      bg={
                        `markerStore-${idx}` === slctErp?.hoverId
                          ? "linear-gradient(90deg, rgba(255, 236, 61, 0) 0%, #FFEC3D 36.2%, rgba(255, 236, 61, 0) 92.66%)"
                          : "transparent"
                      }
                      _hover={{
                        fontWeight: "strong",
                        cursor: "pointer",
                        bg: "linear-gradient(90deg, rgba(255, 236, 61, 0) 0%, #FFEC3D 36.2%, rgba(255, 236, 61, 0) 92.66%)",
                      }}
                      onClick={() => {
                        console.log("click");
                        // setOpenIdx(0);
                        // onOpen();
                        setSv({
                          viewId: "storeInfo",
                          props: {
                            id: "test",
                          },
                        });
                      }}
                      onMouseEnter={() => {
                        setSlctErp({
                          ...slctErp,
                          name: storeName,
                          hoverId: `markerStore-${idx}`,
                        });
                      }}
                      onMouseLeave={() => {
                        setSlctErp({ ...slctErp, name: "", hoverId: "" });
                      }}
                    >
                      <Flex justify="center" align="center" flex="none">
                        <Image
                          src={markerStore}
                          w="auto"
                          bg="transparent"
                          border="0"
                        />
                      </Flex>
                      <Flex direction="column">
                        <Text
                          textStyle="base"
                          fontSize="md"
                          fontWeight="strong"
                          lineHeight="1"
                          color="font.primary"
                        >
                          {storeName}
                        </Text>
                        <Text
                          mt="0.3rem"
                          textStyle="base"
                          fontSize="xs"
                          fontWeight="regular"
                          lineHeight="1"
                          color="font.primary"
                          noOfLines={1}
                        >
                          {addr}
                        </Text>
                        <Text
                          mt="0.3rem"
                          textStyle="base"
                          fontSize="xs"
                          fontWeight="regular"
                          lineHeight="1"
                          color="font.primary"
                        >
                          {storePhone}
                        </Text>
                      </Flex>
                    </ListItem>
                  );
                })}
              </List>
            </TabPanel>
          )}
          {bsDis && bsDis.length > 0 && (
            <TabPanel>
              <List display="flex" flexDirection="column" gap="1rem">
                {bsDis.map((dis: any, idx: number) => {
                  const { bisName, bsDisType } = dis;

                  return (
                    <ListItem
                      key={`bsDisList=${idx}`}
                      p="0rem 0.25rem 1rem"
                      display="flex"
                      alignItems="center"
                      gap="1rem"
                      borderBottom="1px solid"
                      borderColor="neutral.gray8"
                      bgColor={
                        `bsDisArea-${idx}` === slctErp?.hoverId
                          ? "#EEEEEE"
                          : "transparent"
                      }
                      _hover={{
                        fontWeight: "strong",
                        cursor: "pointer",
                        bgColor: "#EEEEEE",
                      }}
                      onClick={() => {
                        console.log("click");
                        setOpenIdx(1);
                        onOpen();
                      }}
                    >
                      <Flex
                        w="20px"
                        h="20px"
                        flex="none"
                        justify="center"
                        align="center"
                        bgColor={bsDisColor[bsDisType]}
                        borderRadius="50%"
                      />
                      <Flex direction="column">
                        <Text
                          textStyle="base"
                          fontSize="md"
                          fontWeight="strong"
                          color="font.primary"
                          noOfLines={1}
                        >
                          {bisName}
                        </Text>
                        <Text
                          textStyle="base"
                          fontSize="xs"
                          fontWeight="regular"
                          color="font.primary"
                        >
                          {bsDisType}
                        </Text>
                      </Flex>
                    </ListItem>
                  );
                })}
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
                  }}
                >
                  <Flex
                    w="20px"
                    h="20px"
                    flex="none"
                    justify="center"
                    align="center"
                    bgColor="#DE9F9F"
                    borderRadius="50%"
                  />
                  <Flex direction="column">
                    <Text
                      textStyle="base"
                      fontSize="md"
                      fontWeight="strong"
                      color="font.primary"
                    >
                      영역2
                    </Text>
                    <Text
                      textStyle="base"
                      fontSize="xs"
                      fontWeight="regular"
                      color="font.primary"
                    >
                      상권2
                    </Text>
                  </Flex>
                </ListItem>
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
                  }}
                >
                  <Flex
                    w="20px"
                    h="20px"
                    flex="none"
                    justify="center"
                    align="center"
                    bgColor="#74D8D2"
                    borderRadius="50%"
                  />
                  <Flex direction="column">
                    <Text
                      textStyle="base"
                      fontSize="md"
                      fontWeight="strong"
                      color="font.primary"
                    >
                      영역3
                    </Text>
                    <Text
                      textStyle="base"
                      fontSize="xs"
                      fontWeight="regular"
                      color="font.primary"
                    >
                      상권3
                    </Text>
                  </Flex>
                </ListItem>
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
                  }}
                >
                  <Flex
                    w="20px"
                    h="20px"
                    flex="none"
                    justify="center"
                    align="center"
                    bgColor="#B3FFB1"
                    borderRadius="50%"
                  />
                  <Flex direction="column">
                    <Text
                      textStyle="base"
                      fontSize="md"
                      fontWeight="strong"
                      color="font.primary"
                    >
                      영역4
                    </Text>
                    <Text
                      textStyle="base"
                      fontSize="xs"
                      fontWeight="regular"
                      color="font.primary"
                    >
                      상권4
                    </Text>
                  </Flex>
                </ListItem>
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
                  }}
                >
                  <Flex
                    w="20px"
                    h="20px"
                    flex="none"
                    justify="center"
                    align="center"
                    bgColor="#EFAEE1"
                    borderRadius="50%"
                  />
                  <Flex direction="column">
                    <Text
                      textStyle="base"
                      fontSize="md"
                      fontWeight="strong"
                      color="font.primary"
                    >
                      영역5
                    </Text>
                    <Text
                      textStyle="base"
                      fontSize="xs"
                      fontWeight="regular"
                      color="font.primary"
                    >
                      상권5
                    </Text>
                  </Flex>
                </ListItem>
              </List>
            </TabPanel>
          )}
          {rent && rent.length > 0 && (
            <TabPanel>
              <List display="flex" flexDirection="column">
                {rent.map((li: any, idx: number) => {
                  const { rentName, addr } = li;

                  return (
                    <ListItem
                      key={`rentList-${idx}`}
                      p="1rem 0rem 0.75rem"
                      display="flex"
                      alignItems="center"
                      gap="0.75rem"
                      borderBottom="1px solid"
                      borderColor="neutral.gray8"
                      bg={
                        `markerRent-${idx}` === slctErp?.hoverId
                          ? "linear-gradient(90deg, rgba(255, 236, 61, 0) 0%, #FFEC3D 36.2%, rgba(255, 236, 61, 0) 92.66%)"
                          : "transparent"
                      }
                      _hover={{
                        fontWeight: "strong",
                        cursor: "pointer",
                        bg: "linear-gradient(90deg, rgba(255, 236, 61, 0) 0%, #FFEC3D 36.2%, rgba(255, 236, 61, 0) 92.66%)",
                      }}
                      onClick={() => {
                        console.log("click");
                        setOpenIdx(2);
                        onOpen();
                      }}
                      onMouseEnter={() => {
                        setSlctErp({
                          ...slctErp,
                          name: rentName,
                          hoverId: `markerRent-${idx}`,
                        });
                      }}
                      onMouseLeave={() => {
                        setSlctErp({ ...slctErp, name: "", hoverId: "" });
                      }}
                    >
                      <Flex justify="center" align="center" flex="none">
                        <Image
                          src={markerRent}
                          w="auto"
                          bg="transparent"
                          border="0"
                        />
                      </Flex>
                      <Flex direction="column" gap="0.5rem">
                        <Text
                          textStyle="base"
                          fontSize="md"
                          fontWeight="strong"
                          lineHeight="1"
                          color="font.primary"
                        >
                          {rentName}
                        </Text>
                        <Text
                          textStyle="base"
                          fontSize="xs"
                          fontWeight="regular"
                          lineHeight="1"
                          color="font.primary"
                          noOfLines={1}
                        >
                          {addr}
                        </Text>
                      </Flex>
                    </ListItem>
                  );
                })}
              </List>
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
      {/* {openIdx === 0 && (
        <ModalStoreDetail
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setOpenIdx(-1);
          }}
        />
      )} */}
      {openIdx === 1 && (
        <ModalBsDisDetail
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setOpenIdx(-1);
          }}
        />
      )}
      {openIdx === 2 && (
        <ModalBuilding
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setOpenIdx(-1);
          }}
        />
      )}
    </Flex>
  );
};

export default BrandListBox;
