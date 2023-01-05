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
//  Util
import { exportFormCsv } from "@util/file/manageFile";
//  Data
import { csvStoreInfo } from "@util/data/fileCSV";

const ModalXlsxSampleCode = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileData, setFileData] = useState([]);

  const createStore = () => {
    console.log(`\nimport Api Start`);
    console.log(fileData);
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
                  form={csvStoreInfo}
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

export default ModalXlsxSampleCode;
