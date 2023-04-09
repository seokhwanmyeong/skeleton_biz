//  LIB
import { useState, useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  Button,
  Flex,
  Heading,
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
  onOpen: (props?: any) => any;
  onClose: (props?: any) => any;
  setOpenIdx: (props?: any) => any;
};
const ModalStoreEditor = ({ isOpen, onOpen, onClose, setOpenIdx }: Props) => {
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

  const createStore = (val?: StoreInfo) => {
    console.log("create start");
    console.log(val);
    onClose();
    setOpenIdx(-1);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerContent maxW="fit-content">
        <DrawerBody pos="relative" p="0" width="18.5rem">
          <Flex justify="space-between">
            <Flex p="0 0.5rem" align="center" gap="1rem">
              <IcoPlusSquare
                width="0.875rem"
                height="0.875rem"
                color="primary.type7"
              />
              <Heading
                as={"h5"}
                fontSize="sm"
                lineHeight="normal"
                color="font.title"
                bg="none"
              >
                매장 등록
              </Heading>
            </Flex>
            <Flex gap="0.5rem">
              <Button variant="filterSearch" zIndex={1} onClick={submitHandler}>
                <IcoCheck />
                매장생성
              </Button>
              <Button
                variant="filterSearch"
                bgColor="#FFFFFF"
                border="1px solid"
                borderColor="primary.type7"
                color="primary.type7"
                _hover={{
                  bgColor: "primary.type7",
                  color: "#FFFFFF",
                }}
                zIndex={1}
                onClick={onClose}
              >
                <IcoCloseCircle />
                취소
              </Button>
            </Flex>
          </Flex>
          <Deco01
            margin="0.25rem 0 1.3125rem"
            p="0"
            width="100%"
            height="auto"
          />
          <FormStoreEditor
            initVal={initData}
            fixMode={true}
            setValues={createStore}
            ref={submitRef}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ModalStoreEditor;
