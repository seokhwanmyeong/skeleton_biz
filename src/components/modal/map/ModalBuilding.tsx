//  LIB
import { useState, useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  Button,
  Flex,
  Heading,
  Divider,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
//  Component
import FormStoreEditor from "@components/form/map/FormStoreEditor";
//  Type
import { FormikValues } from "formik";
import type { StoreInfo } from "@page/erp/store/ErpStoreCreate";
import {
  IcoCheck,
  IcoCloseCircle,
  IcoPlusSquare,
} from "@src/assets/icons/icon";
import { Deco01 } from "@src/assets/deco/DecoSvg";

type Props = {
  isOpen: boolean;
  onClose: (props?: any) => any;
};

const ModalBuilding = ({ isOpen, onClose }: Props) => {
  const submitRef = useRef<FormikValues>(null);
  const [initData, setInitData] = useState({
    storeName: "",
    storeCode: "",
    storeStatus: "",
    storeType: "",
    phone: "",
    biz_number: "",
    owner_name: "",
    owner_phone: "",
    addr: "",
    addrDetail: "",
    lat: "",
    lng: "",
    linkBsns: [],
  });

  const submitHandler = () => {
    console.log("submit start");
    submitRef?.current && submitRef.current.handleSubmit();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerContent p="1.25rem 0" maxW="fit-content">
        <DrawerBody pos="relative" p="0" width="24.375rem">
          <Flex justify="center" align="center" gap="1rem">
            <Button onClick={onClose}>test</Button>
            <Heading
              as={"h5"}
              fontSize="md"
              lineHeight="normal"
              color="font.primary"
              bg="none"
            >
              평창점
            </Heading>
          </Flex>
          <Divider mt="0.75rem" borderColor="neutral.gray6" />
          <List
            p="1.875rem 2.375rem"
            display="flex"
            flexDirection="column"
            gap="1.5rem"
          >
            <ListItem w="100%" display="flex" justifyContent="space-between">
              <Text
                textStyle="base"
                fontSize="md"
                fontWeight="strong"
                lineHeight="1.5rem"
              >
                준공기간
              </Text>
              <Text
                textStyle="base"
                fontSize="md"
                fontWeight="medium"
                lineHeight="1.5rem"
              >
                89.11.03 ~ 94.10.25
              </Text>
            </ListItem>
            <ListItem w="100%" display="flex" justifyContent="space-between">
              <Text
                textStyle="base"
                fontSize="md"
                fontWeight="strong"
                lineHeight="1.5rem"
              >
                대장종류
              </Text>
              <Text
                textStyle="base"
                fontSize="md"
                fontWeight="medium"
                lineHeight="1.5rem"
              >
                건축물 대장
              </Text>
            </ListItem>
            <ListItem w="100%" display="flex" justifyContent="space-between">
              <Text
                textStyle="base"
                fontSize="md"
                fontWeight="strong"
                lineHeight="1.5rem"
              >
                지붕구조
              </Text>
              <Text
                textStyle="base"
                fontSize="md"
                fontWeight="medium"
                lineHeight="1.5rem"
              >
                시멘트
              </Text>
            </ListItem>
            <ListItem w="100%" display="flex" justifyContent="space-between">
              <Text
                textStyle="base"
                fontSize="md"
                fontWeight="strong"
                lineHeight="1.5rem"
              >
                용도
              </Text>
              <Text
                textStyle="base"
                fontSize="md"
                fontWeight="medium"
                lineHeight="1.5rem"
              >
                근린생활시설
              </Text>
            </ListItem>
            <ListItem w="100%" display="flex" justifyContent="space-between">
              <Text
                textStyle="base"
                fontSize="md"
                fontWeight="strong"
                lineHeight="1.5rem"
              >
                구조
              </Text>
              <Text
                textStyle="base"
                fontSize="md"
                fontWeight="medium"
                lineHeight="1.5rem"
              >
                철근콘크리트
              </Text>
            </ListItem>
            <ListItem w="100%" display="flex" justifyContent="space-between">
              <Text
                textStyle="base"
                fontSize="md"
                fontWeight="strong"
                lineHeight="1.5rem"
              >
                연면적
              </Text>
              <Text
                textStyle="base"
                fontSize="md"
                fontWeight="medium"
                lineHeight="1.5rem"
              >
                493.77 m
              </Text>
            </ListItem>
            <ListItem w="100%" display="flex" justifyContent="space-between">
              <Text
                textStyle="base"
                fontSize="md"
                fontWeight="strong"
                lineHeight="1.5rem"
              >
                대지위치
              </Text>
              <Text
                textStyle="base"
                fontSize="md"
                fontWeight="medium"
                lineHeight="1.5rem"
              >
                서울시 종로구 평창동
              </Text>
            </ListItem>
          </List>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ModalBuilding;
