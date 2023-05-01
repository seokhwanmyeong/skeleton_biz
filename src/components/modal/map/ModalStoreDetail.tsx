//  LIB
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  Heading,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
//  Type
import {
  IcoAudit,
  IcoBars,
  IcoHistory,
  IcoLeft,
  IcoLineChart,
} from "@assets/icons/icon";
import StoreBasicInfo from "./elementStore/StoreBasicInfo";
import StoreSale from "./elementStore/StoreSale";
import StoreHistory from "./elementStore/StoreHistory";
import StoreDoc from "./elementStore/StoreDoc";

type Props = {
  id: string;
  isOpen: boolean;
  onClose: (props?: any) => any;
};

const ModalStoreDetail = ({ id, isOpen, onClose }: Props) => {
  console.log("iin");
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerContent p="1rem 0" maxW="fit-content">
        <DrawerBody pos="relative" p="0" width="fit-content">
          <Flex direction="column" justify="center" align="center" gap="1rem">
            <IconButton
              aria-label="리스트로 돌아가기"
              onClick={onClose}
              icon={
                <IcoLeft
                  width="1.25rem"
                  height="1.25rem"
                  color="font.primary"
                />
              }
              position="absolute"
              top="0.125rem"
              left="2rem"
              bg="transparent"
              color="font.primary"
              _hover={{
                bg: "transparent",
              }}
            />
            <Heading
              as={"h5"}
              fontSize="md"
              lineHeight="normal"
              color="font.primary"
              bg="none"
            >
              평창점
            </Heading>
            <Deco01 p="0 2rem" w="100%" h="auto" />
            <Tabs variant="detailPage">
              <TabList>
                <Tab key="tab-info">
                  <IcoBars />
                  <Text>기본 정보</Text>
                </Tab>
                <Tab key="tab-sale" isDisabled={false}>
                  <IcoLineChart />
                  <Text>매출</Text>
                </Tab>
                <Tab key="tab-history" isDisabled={false}>
                  <IcoHistory />
                  <Text>히스토리 데이터</Text>
                </Tab>
                <Tab key="tab-doc" isDisabled={false}>
                  <IcoAudit />
                  <Text>문서보관함</Text>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <StoreBasicInfo />
                </TabPanel>
                <TabPanel w="800px">
                  <StoreSale />
                </TabPanel>
                <TabPanel>
                  <StoreHistory id="test" title="test" />
                </TabPanel>
                <TabPanel>
                  <StoreDoc />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ModalStoreDetail;
