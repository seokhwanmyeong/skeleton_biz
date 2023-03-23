//  LIB
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

type PropsModal = {
  variant?: string;
  title: string;
  cancelText: string;
  botBtnComponent?: JSX.Element;
  children: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({
  variant,
  title,
  cancelText = "취소",
  botBtnComponent,
  children,
  isOpen,
  onClose,
}: PropsModal) => {
  return (
    <ChakraModal variant={variant} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w="auto" maxW="auto">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          maxH="75vh"
          overflowY="auto"
          __css={{
            "::-webkit-scrollbar": {
              w: "3px",
            },
            "::-webkit-scrollbar-thumb": {
              borderRadius: "5",
              bg: `bg.primary`,
            },
          }}
        >
          {children}
        </ModalBody>
        <ModalFooter>
          <Button variant="cancel" mr={3} onClick={onClose}>
            {cancelText}
          </Button>
          {botBtnComponent}
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
