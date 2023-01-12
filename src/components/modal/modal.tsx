//  LIB
import { Fragment } from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

type PropsModal = {
  variant?: string;
  title: string;
  openBtnText: string;
  cancelBtnText: string;
  botBtnComponent?: JSX.Element;
  children: JSX.Element;
};

const Modal = ({
  variant,
  title,
  openBtnText,
  cancelBtnText = "Cancel",
  botBtnComponent,
  children,
}: PropsModal) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <Button variant="reverse" onClick={onOpen}>
        {openBtnText}
      </Button>
      <ChakraModal variant={variant} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="auto" maxW="">
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              {cancelBtnText}
            </Button>
            {botBtnComponent}
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </Fragment>
  );
};

export default Modal;
