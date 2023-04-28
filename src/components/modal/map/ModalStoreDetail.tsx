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
} from "@chakra-ui/react";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
//  Type
import { IcoLeft } from "@assets/icons/icon";

type Props = {
  isOpen: boolean;
  onClose: (props?: any) => any;
};

const ModalStoreDetail = ({ isOpen, onClose }: Props) => {
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
            <Tabs>
              <TabList mb="1rem" border="none">
                <Tab>매장</Tab>
                <Tab>상권</Tab>
                <Tab>매물</Tab>
              </TabList>
              <TabPanels>
                <TabPanel bg="#000000"></TabPanel>
                <TabPanel bg="#000000"></TabPanel>
                <TabPanel bg="#000000"></TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ModalStoreDetail;
