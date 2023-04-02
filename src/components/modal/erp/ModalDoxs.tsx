//  LIB
import { useState, Fragment } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
  FormLabel,
  FormControl,
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
import { Input, InputFile } from "@components/common/Input";
//  Util
import { csvStoreSale } from "@util/data/fileCSV";
//  Icon
import { IcoBtnEditor } from "@src/components/common/Btn";
import { IcoDownload } from "@src/assets/icons/icon";

const ModalSaleEditor = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileData, setFileData] = useState([]);

  return (
    <Fragment>
      <IcoBtnEditor onClick={onOpen} />
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent w="auto" maxW="auto">
            <ModalBody maxH="75vh">
              <Tabs variant="detailPage" index={0}>
                <Flex
                  pos="relative"
                  p={0}
                  w="100%"
                  justify="center"
                  align="center"
                  direction="column"
                >
                  <TabList>
                    <Tab key="tab-create">
                      <IcoDownload />
                      <Text>문서등록</Text>
                    </Tab>
                  </TabList>
                  <Divider
                    m="0 0 1.25rem"
                    borderBottomWidth="2px"
                    color="font.title"
                  />
                </Flex>
                <TabPanels>
                  <TabPanel key="panel-area" overflow={"visible"}>
                    <FormControl
                      mb="0.5rem"
                      variant="search"
                      flexDirection="column"
                      gap="0.5rem"
                    >
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        w="5rem"
                        flex="none"
                        fontWeight="strong"
                        fontSize="15px"
                      >
                        문서 이름
                      </FormLabel>
                      <Input
                        inputProps={{
                          w: "100%",
                          h: "1.375rem",
                          fontSize: "sm",
                        }}
                        placeholder="문서 이름을 입력하세요"
                        _placeholder={{
                          color: "#D9D9D9",
                          fontSize: "sm",
                        }}
                        onChange={(val: any) => console.log(val)}
                      />
                    </FormControl>
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
                onClick={onClose}
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

export default ModalSaleEditor;
