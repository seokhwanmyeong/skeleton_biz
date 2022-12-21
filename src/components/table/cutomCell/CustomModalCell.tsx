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
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const CustomModalCell = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // console.log(props);

  return (
    <Fragment>
      <Button variant="reverse" onClick={onOpen}>
        Modal
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column">
              {Object.entries(props.row.original).map((list, idx) => {
                return (
                  <Fragment key={`${props.column.id}${props.row.id}-${idx}`}>
                    <Text>{`Data Key: ${list[0]}`}</Text>
                    <Text>{`Data Val : ${list[1]}`}</Text>
                  </Fragment>
                );
              })}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default CustomModalCell;
