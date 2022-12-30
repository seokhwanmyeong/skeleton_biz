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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
//  Components
import { InputFile } from "@components/common/Input";
//  Services
import { autoAddressCreator } from "@services/address/autoAddressCreator";
//  Util
import { exportFormCsv } from "@util/file/manageFile";
//  Data
import { csvStoreInfo } from "@util/data/fileCSV";

const ModalStoreXlsx = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileData, setFileData] = useState([]);

  const createStore = () => {
    autoAddressCreator(fileData)
      .then((res) => {
        // onClose();
      })
      .catch((e) => console.log(e));
  };

  return (
    <Fragment>
      <Button variant="reverse" onClick={onOpen}>
        엑셀파일
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>엑셀파일</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column" gap={5}>
              <Flex flexDirection="column" gap={2}>
                <Text>양식 다운로드</Text>
                <Button onClick={() => exportFormCsv(csvStoreInfo)}>
                  양식 다운로드
                </Button>
              </Flex>
              <Flex flexDirection="column" gap={2}>
                <Text>파일 업로드</Text>
                <InputFile
                  accept={".xlsx, .csv"}
                  addonProps={{ width: "auto" }}
                  _onChange={setFileData}
                />
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="base" onClick={createStore}>
              Import Data
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default ModalStoreXlsx;
