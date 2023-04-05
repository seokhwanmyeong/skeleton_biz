//  LIB
import { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Button,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
//  Components
import Form from "@components/form/Form";
import { IcoBtnClose, BtnEditor, IcoBtnUpdate } from "@components/common/Btn";
//  Form
import FormRentEditor from "@src/components/form/map/FormRentEditor";
import DaumPostcodeEmbed from "react-daum-postcode";

type Props = {};

const ModalRentEditor = ({ isOpen, onOpen, onClose }: any) => {
  const [addr, setAddr] = useState({
    address: "",
    point: {
      lat: 0,
      lng: 0,
    },
  });
  const [initData, setInitData] = useState({
    storeName: "",
    storeCode: "",
    storeStatus: "",
    storeRank: "",
    phone: "",
    biz_number: "",
    owner_name: "",
    owner_phone: "",
    addr: "",
    addrDetail: "",
    linkBsns: [],
  });
  const {
    isOpen: depthOpen,
    onOpen: onDepthOpen,
    onClose: onDepthClose,
  } = useDisclosure();

  const submitHandler = (val: any) => {
    console.log("click");
    console.log(val);
  };

  const addrSlctHandler = (val: any) => {
    console.log(val.address);
    setInitData({ ...initData, addr: val.address });
    onClose();
    onDepthOpen();
  };

  return (
    <>
      <Button
        variant="filterTopMain"
        onClick={() => {
          isOpen ? onClose() : onOpen();
        }}
      >
        {addr.address || "주소를 검색하세요."}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent w="50vw">
          <ModalBody
            p="0"
            w="100%"
            h="40vh"
            borderRadius="base"
            overflow="hidden"
          >
            <DaumPostcodeEmbed onComplete={addrSlctHandler} />
          </ModalBody>
        </ModalContent>
      </Modal>
      {depthOpen && (
        <Drawer isOpen={depthOpen} onClose={onDepthClose} placement="right">
          {/* <DrawerOverlay /> */}
          <DrawerContent maxW="fit-content">
            <DrawerBody pos="relative" p="0" width="18.5rem">
              <Button
                variant="search"
                position="absolute"
                top="0rem"
                right="1rem"
                zIndex={1}
                onClick={onDepthClose}
              >
                매물생성
              </Button>
              <FormRentEditor
                fixMode={true}
                initVal={initData}
                setValues={submitHandler}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default ModalRentEditor;
