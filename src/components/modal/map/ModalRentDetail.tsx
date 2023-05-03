//  LIB
import { useState, useEffect } from "react";
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
//  Component
import RentBasicInfo from "@components/modal/map/elementRent/RentBasicInfo";
import ElementHistory from "@components/modal/map/elementCommon/ElementHistory";
//  Api
import { apiErpMap } from "@api/biz/config";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
//  Icon
import { IcoBars, IcoHistory, IcoLeft } from "@assets/icons/icon";
//  Type
import type { TypeMapRentInfo } from "@api/biz/type";

type Props = {
  id: string;
  name: string;
  isOpen: boolean;
  onClose: (props?: any) => any;
};

const ModalRentDetail = ({ id, name, isOpen, onClose }: Props) => {
  const { getRentInfo } = apiErpMap;
  const [infoData, setInfoData] = useState<TypeMapRentInfo["res"] | null>(null);
  const [tabIdx, setTabIdx] = useState<number>(0);

  useEffect(() => {
    if (id && name) {
      getRentInfo({ id: id }).then((res) => {
        if (res) {
          setInfoData(res);
        }
      });
    }
  }, [id]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerContent p="0" maxW="fit-content">
        <DrawerBody pos="relative" p="1rem 1.5rem" width="fit-content">
          <Flex
            pos="relative"
            direction="column"
            justify="center"
            align="center"
            gap="1.125rem"
          >
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
              top="0rem"
              left="0rem"
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
              {name}
            </Heading>
            <Deco01 w="100%" h="auto" />
            <Tabs
              variant="detailPage"
              index={tabIdx}
              onChange={(index) => setTabIdx(index)}
            >
              <TabList>
                <Tab key="tab-info">
                  <IcoBars />
                  <Text>기본 정보</Text>
                </Tab>
                <Tab key="tab-history" isDisabled={false}>
                  <IcoHistory />
                  <Text>히스토리 데이터</Text>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {tabIdx === 0 && infoData !== null && (
                    <RentBasicInfo info={infoData} />
                  )}
                </TabPanel>
                <TabPanel>
                  {tabIdx === 1 && <ElementHistory id={id} title={name} />}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ModalRentDetail;
