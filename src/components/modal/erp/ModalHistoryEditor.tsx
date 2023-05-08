//  LIB
import { useState, Fragment } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  Flex,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
//  Components
import { BtnEditor } from "@components/common/Btn";
//  Form
import FormHistoryEditor from "@components/form/erp/FormHistoryEditor";
import { IcoCheckCircle, IcoCloseCircle } from "@src/assets/icons/icon";

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

  return (
    <Fragment>
      <BtnEditor
        onClick={onOpen}
        text="히스토리 추가하기"
        variant="search"
        lineHeight="-1px"
      />
      {isOpen && (
        <Drawer isOpen={isOpen} onClose={onClose} placement="right">
          <DrawerOverlay
            top="auto"
            bottom="0"
            h="calc(100vh - 2.875rem - 1px)"
            zIndex={999}
          />
          <DrawerContent
            maxW="fit-content"
            borderRadius="12px 0 0 12px"
            sx={{
              top: "auto!important",
              bottom: "0!important",
              h: "calc(100% - 2.875rem - 2px)",
            }}
          >
            <DrawerBody pos="relative" p="0" width="18.5rem">
              <FormHistoryEditor
                fixMode={true}
                initVal={initData}
                setValues={submitHandler}
              />
            </DrawerBody>
            <DrawerFooter justifyContent="center" alignItems="center">
              <Flex w="100%" justify="space-around">
                <Button
                  variant="editor"
                  onClick={() => {
                    onClose();
                  }}
                >
                  <IcoCloseCircle w="0.875rem" h="0.875rem" />
                  취소
                </Button>
                <Button
                  variant="editor"
                  onClick={() => {
                    console.log("submit");
                    onClose();
                  }}
                >
                  <IcoCheckCircle w="0.875rem" h="0.875rem" />
                  완료
                </Button>
              </Flex>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </Fragment>
  );
};

export default ModalHistoryEditor;
