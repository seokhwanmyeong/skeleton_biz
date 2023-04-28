import {
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
import { Deco01 } from "@src/assets/deco/DecoSvg";
import { IcoBuildingList, IcoVillage } from "@src/assets/icons/icon";
import ModalBuilding from "@src/components/modal/map/ModalBuilding";

type Props = {};

const DepthListBox = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      pos="relative"
      m="0.1875rem 0"
      p="1rem 1.375rem 1rem"
      w="19.25rem"
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
                  onOpen();
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
                  <IcoVillage width="1.5rem" height="1.5rem" color="#FFFFFF" />
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
      <ModalBuilding onClose={onClose} isOpen={isOpen} />
    </Flex>
  );
};

export default DepthListBox;
