//  Lib
import { Modal, ModalContent, ModalBody } from "@chakra-ui/react";
import DaumPostcodeEmbed from "react-daum-postcode";

type DaumAddrProps = {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (props: any) => any;
  style?: any;
};

const ModalDaumAddr = ({ isOpen, onClose, onComplete }: DaumAddrProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
