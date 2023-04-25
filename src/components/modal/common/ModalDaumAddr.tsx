//  Lib
import { Modal, ModalContent, ModalBody } from "@chakra-ui/react";
import DaumPostcodeEmbed from "react-daum-postcode";

type DaumAddrProps = {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (props: any) => any;
  isCentered?: boolean;
  style?: any;
};

const ModalDaumAddr = ({
  isOpen,
  onClose,
  onComplete,
  isCentered = false,
}: DaumAddrProps) => {
  return (
    <Modal isOpen={isOpen} isCentered={isCentered} onClose={onClose}>
      <ModalContent w="50vw">
        <ModalBody
          p="0"
          w="100%"
          h="40vh"
          borderRadius="base"
          overflow="hidden"
        >
          <DaumPostcodeEmbed onComplete={onComplete} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalDaumAddr;
