//  LIB
import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
  Tabs,
  TabPanels,
  TabPanel,
  Flex,
  TabList,
  Text,
  Tab,
  Divider,
} from "@chakra-ui/react";
//  Components
import { InputFile } from "@components/common/Input";
//  Util
import { csvStoreSale } from "@util/data/fileCSV";
import { exportFormCsv } from "@util/file/manageFile";
//  Icon
import { IcoDownload, IcoUpdateChk } from "@assets/icons/icon";

const ModalStoreUpload = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileData, setFileData] = useState([]);

  return (
    <Fragment>
      <Button variant="editor" onClick={onOpen}>
        <IcoUpdateChk />
        엑셀 업로드
      </Button>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent w="auto" maxW="auto">
            <ModalBody maxH="75vh">
              <Tabs variant="detailPage" index={0}>
                <Flex
                  pos="relative"
                  p="0.75rem 0 0"
                  w="100%"
                  justify="center"
                  align="center"
                  direction="column"
                >
                  <TabList>
                    <Tab key="tab-create">
                      <IcoDownload />
                      <Text>매장 등록</Text>
                    </Tab>
                  </TabList>
                  <Divider
                    mb="1rem"
                    borderBottomWidth="2px"
                    color="font.title"
                  />
                </Flex>
                <TabPanels>
                  <TabPanel key="panel-area" overflow={"visible"}>
                    <Flex mb="0.75rem" w="100%" justify="flex-end">
                      <Button
                        onClick={() => exportFormCsv(csvStoreSale)}
                        p={0}
                        w="fit-content"
                        h="fit-content"
                        bg="transparent"
                        fontWeight="regular"
                        fontSize="xs"
                        lineHeight="1.375rem"
                        color="#1890FF"
                        textDecoration="underline"
                      >
                        매장 등록 양식 다운로드 (CSV)
                      </Button>
                    </Flex>
                    <InputFile
                      accept={".xlsx, .csv"}
                      form={csvStoreSale}
                      addonProps={{ width: "auto" }}
                      onChange={setFileData}
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalBody>
            <ModalFooter w="100%" justifyContent="center" gap="1rem">
              <Button
                w="6.25rem"
                bg="#ffffff"
                border="1px solid"
                borderColor="neutral.gray5"
                color="font.title"
                fontWeight="regular"
                fontSize="sm"
                lineHeight="1.375rem"
                onClick={onClose}
              >
                취소
              </Button>
              <Button
                w="6.25rem"
                bg="primary.type7"
                border="1px solid"
                borderColor="primary.type7"
                color="#ffffff"
                fontWeight="strong"
                fontSize="sm"
                lineHeight="1.375rem"
                onClick={() => {
                  onClose();
                  navigate("/erp/store");
                }}
              >
                업로드
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Fragment>
  );
};

export default ModalStoreUpload;
