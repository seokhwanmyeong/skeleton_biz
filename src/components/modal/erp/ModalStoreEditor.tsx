//  LIB
import { useState, useCallback, useRef } from "react";
import {
  Flex,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
//  Components
import Modal from "@components/modal/Modal";
import Form from "@components/form/Form";
import XlsxController from "@components/modal/XlsxController";
//  Form
import { formStoreInfo } from "@page/erp/store/form";
//  Util
import { csvStoreInfo } from "@util/data/fileCSV";

const ModalStoreEditor = ({
  info,
  update,
}: {
  info?: any;
  update: boolean;
}) => {
  const [tabState, setTabState] = useState("form");
  const [fileData, setFileData] = useState([]);
  const formRef = useRef<any>();

  const storeInfoHandler = useCallback(() => {
    console.log(formRef.current);
  }, [formRef]);

  const bottomBtn = () => {
    return (
      <Button variant="ghost" onClick={storeInfoHandler}>
        등록하기
      </Button>
    );
  };

  return (
    <Modal
      title={update ? "매장수정" : "매장생성"}
      openBtnText={update ? "매장수정" : "매장생성"}
      cancelBtnText={"Cancel"}
      botBtnComponent={bottomBtn()}
    >
      <Flex flexDirection="column" minW="50rem">
        {update ? (
          <Form
            innerRef={formRef}
            form={{ ...formStoreInfo, initVal: info }}
            activeBtn={false}
            // onSubmit={submitFormHandler}
          />
        ) : (
          <Tabs w="100%">
            <TabList w="100%" justifyContent="center">
              <Tab
                onClick={() => tabState !== "form" && setTabState("form")}
                key="tab-direct"
                flexDirection="column"
                w="50%"
              >
                <Text>수동입력</Text>
              </Tab>
              <Tab
                onClick={() => tabState !== "file" && setTabState("file")}
                key="tab-fileInput"
                flexDirection="column"
                w="50%"
              >
                <Text>파일입력</Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel key="panel-direct">
                <Flex justifyContent="flex-end" mb="1rem">
                  <Text fontWeight="bold" color="red.500">
                    필수입력 *
                  </Text>
                </Flex>
                <Form
                  innerRef={formRef}
                  form={formStoreInfo}
                  activeBtn={false}
                />
              </TabPanel>
              <TabPanel key="panel-fileInput">
                <XlsxController csvInfo={csvStoreInfo} onChange={setFileData} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Flex>
    </Modal>
  );
};

export default ModalStoreEditor;
