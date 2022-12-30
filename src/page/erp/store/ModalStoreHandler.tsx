//  LIB
import { Fragment, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
//  Components
import FormSample from "@components/form/FormSample";
//  Form
import { formStoreInfo } from "./form";

const ModalStoreHandler = ({
  info,
  update,
}: {
  info?: any;
  update: boolean;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const StoreInfoHandler = (val: any) => {
    console.log(val);
  };

  return (
    <Fragment>
      <Button variant="reverse" onClick={onOpen}>
        {update ? "매장수정" : "매장생성"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        {/* <ModalOverlay /> */}
        <ModalContent>
          <ModalHeader>{update ? "매장수정" : "매장생성"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column">
              <FormSample
                form={
                  update ? { ...formStoreInfo, initVal: info } : formStoreInfo
                }
                onSubmit={StoreInfoHandler}
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="ghost" onClick={StoreInfoHandler}>
              Complete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default ModalStoreHandler;
