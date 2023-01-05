//  LIB
import { Fragment } from "react";
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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
//  Components
import ModalStoreEditor from "@components/modal/erp/ModalStoreEditor";

const ModalStoreDetail = ({ info }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <Button variant="reverse" onClick={onOpen}>
        상세보기
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>매장: {info?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column">
              {info &&
                Object.entries(info)?.map((list: any, idx: number) => {
                  return (
                    <Fragment key={`${idx}`}>
                      <Text>{`${list[0]}: ${list[1]}`}</Text>
                    </Fragment>
                  );
                })}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <ModalStoreEditor info={info} update={true} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default ModalStoreDetail;
