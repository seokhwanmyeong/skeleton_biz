//  LIB
import { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
//  Components
import Form from "@components/form/Form";
import { IcoBtnClose, BtnEditor, IcoBtnUpdate } from "@components/common/Btn";
//  Form
import { formHistoryInfo } from "@page/erp/history/form";
import FormHistoryEditor from "@components/form/erp/FormHistoryEditor";

const ModalHistoryEditor = ({
  initVal,
  update = false,
}: {
  initVal?: any;
  update?: boolean;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [initData, setInitData] = useState({
    title: "",
    img: [],
    writer: "홍길동",
    type: "작성",
    createAt: "2023-03-31",
    location: "서울특별시 용산구 한강대로 405",
    content: "",
  });

  const submitHandler = (val: any) => {
    console.log("click");
    console.log(val);
  };

  // const bottomBtn = () => {
  //   const RentInfoHandler = (val: any) => {
  //     console.log(val);
  //   };

  //   return (
  //     <Button colorScheme="blue" onClick={() => RentInfoHandler(formData)}>
  //       {update ? "수정하기" : "등록하기"}
  //     </Button>
  //   );
  // };

  return (
    <>
      <BtnEditor onClick={onOpen} />
      {isOpen && (
        <Drawer isOpen={isOpen} onClose={onClose} placement="right">
          <DrawerOverlay />
          <DrawerContent maxW="fit-content">
            <DrawerBody pos="relative" p="0" width="18.5rem">
              <IcoBtnClose
                style={{
                  position: "absolute",
                  top: "0.2rem",
                  right: "2rem",
                  zIndex: 1,
                  w: "max-content",
                }}
                onClick={() => {
                  onClose();
                }}
              />
              <IcoBtnUpdate
                style={{
                  position: "absolute",
                  top: "0.2rem",
                  right: "0rem",
                  zIndex: 1,
                  w: "max-content",
                }}
                onClick={() => {
                  onClose();
                }}
              />
              <FormHistoryEditor
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

export default ModalHistoryEditor;
