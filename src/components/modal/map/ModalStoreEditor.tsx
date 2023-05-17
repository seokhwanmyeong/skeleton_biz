//  LIB
import { Fragment, useState, useRef, useCallback } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  Button,
  Flex,
  Heading,
  IconButton,
  DrawerHeader,
  DrawerFooter,
  useDisclosure,
} from "@chakra-ui/react";
//  Component
import FormStoreEditor from "@components/form/map/FormStoreEditor";
import { DialogAlertCreateStore } from "@components/dialog/DialogAlertModal";
//  Type
import type { FormikValues } from "formik";
import type { StoreInfo } from "@page/erp/store/ErpStoreCreate";
import { IcoLeft, IcoPlusCircle } from "@src/assets/icons/icon";
import { Deco01 } from "@src/assets/deco/DecoSvg";

type Props = {
  isOpen: boolean;
  onOpen: (props?: any) => any;
  onClose: (props?: any) => any;
  setOpenIdx: (props?: any) => any;
};
const ModalStoreEditor = ({ isOpen, onOpen, onClose, setOpenIdx }: Props) => {
  const submitRef = useRef<FormikValues>(null);
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const [initData, setInitData] = useState({
    storeName: "",
    storeCode: "",
    storeStatus: "",
    storeType: "",
    bsNum: "",
    ownerName: "",
    ownerPhone: "",
    addrNew: "",
    addrOld: "",
    addrDetail: "",
    addrCode: "",
    addrHCode: "",
    openDate: undefined,
    lat: 0,
    lng: 0,
    linkBsDis: [],
  });

  const submitHandler = useCallback(() => {
    console.log("submit start");
    console.log(submitRef.current);
    if (submitRef?.current) {
      const { errors, touched } = submitRef.current;
      if (Object.keys(touched).length > 0 || !errors) {
        submitRef?.current && submitRef.current.handleSubmit();
      } else {
        submitRef?.current && submitRef.current.handleSubmit();
        !isAlertOpen && onAlertOpen();
      }
    }
  }, [submitRef.current]);

  const createStore = (val?: StoreInfo) => {
    console.log("create start");
    console.log(val);
    onClose();
    setOpenIdx(-1);
  };

  return (
    <Fragment>
      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerContent p="1rem 1.5625rem" maxW="25.3125rem" w="25.3125rem">
          <DrawerHeader pos="relative" p="0">
            <Flex direction="column" justify="center" align="center" gap="1rem">
              <IconButton
                aria-label="생성 취소"
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
                매장 등록
              </Heading>
            </Flex>
            <Deco01 margin="0.5rem 0 1.3125rem" width="100%" height="auto" />
          </DrawerHeader>
          <DrawerBody pos="relative" p="0" width="100%">
            <FormStoreEditor
              initVal={initData}
              setValues={createStore}
              ref={submitRef}
            />
          </DrawerBody>
          <DrawerFooter justifyContent="center">
            <Button
              variant="modalSubmit"
              w="80%"
              zIndex={1}
              onClick={submitHandler}
            >
              <IcoPlusCircle />
              매장생성
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <DialogAlertCreateStore isOpen={isAlertOpen} onClose={onAlertClose} />
    </Fragment>
  );
};

export default ModalStoreEditor;
