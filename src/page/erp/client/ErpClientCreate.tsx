//  LIB
import { useEffect, useRef, useState } from "react";
import { FormikValues } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
} from "@chakra-ui/react";
//  Component
import FormClientEditor from "@components/form/erp/FormClientEditor";
import Section from "@components/common/Section";
import ModalStoreUpload from "@components/modal/erp/ModalStoreUpload";
import { IcoBtnBack } from "@components/common/Btn";
//  Api & Query
import { IcoAppStore, IcoPlusSquare } from "@src/assets/icons/icon";

type ClientInfo = {
  clientName: string;
  clientPhone: string;
  clientStatus: string;
  clientPath: string;
  age: number | undefined;
  job: string;
  resident: string;
  exp: boolean;
  hopeArea: string;
  startFund: number | undefined;
  favorRent: string;
  manager: string;
};

const ErpClientCreate = () => {
  const navitate = useNavigate();
  const submitRef = useRef<FormikValues>(null);
  const [clientData, setClientData] = useState<ClientInfo | undefined>({
    clientName: "",
    clientPhone: "",
    clientStatus: "",
    clientPath: "",
    age: undefined,
    job: "",
    resident: "",
    hopeArea: "",
    exp: false,
    startFund: undefined,
    favorRent: "",
    manager: "",
  });

  const createClient = (value: ClientInfo) => {
    console.log("update click");
    submitRef?.current && submitRef.current.handleSubmit();
    navitate("/erp/client");
  };

  return (
    <Section p="0.625rem 0.75rem 3.75rem">
      <Tabs variant="detailPage" index={0}>
        <Flex
          pos="relative"
          p="0"
          w="100%"
          justify="center"
          align="center"
          direction="column"
        >
          <IcoBtnBack
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              w: "max-content",
            }}
            w="max-content"
          />
          <TabList>
            <Tab key="tab-info">
              <IcoPlusSquare />
              <Text>고객 등록</Text>
            </Tab>
          </TabList>
          <Flex position="absolute" top="0" right="0" gap="0.5rem">
            <Button
              w="100px"
              variant="search"
              onClick={() => {
                clientData && createClient(clientData);
              }}
            >
              <IcoAppStore w="0.875rem" h="0.875rem" />
              <Text variant="search" color="#ffffff">
                완료
              </Text>
            </Button>
          </Flex>
          <Divider m="0 0 1.25rem" borderBottomWidth="2px" color="font.title" />
        </Flex>
        <TabPanels>
          <TabPanel key="panel-pointer">
            <Flex p="0 3vw" h="100%" flexDirection="column" gap="1rem">
              <FormClientEditor
                initVal={clientData}
                fixMode={true}
                setValues={setClientData}
                update={true}
                ref={submitRef}
              ></FormClientEditor>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Section>
  );
};

export default ErpClientCreate;
