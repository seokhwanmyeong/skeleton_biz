//  LIB
import { useRef, useState } from "react";
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
import Section from "@components/common/Section";
import { IcoBtnBack } from "@components/common/Btn";
import FormStoreEditor from "@components/form/erp/FormStoreEditor";
import ModalStoreUpload from "@components/modal/erp/ModalStoreUpload";
//  Api & Query
import { IcoCheckCircle, IcoPlusSquare } from "@assets/icons/icon";
import { FormikValues } from "formik";
import { useNavigate } from "react-router-dom";

export type StoreInfo = {
  storeName: string;
  storeCode: string;
  storeStatus: string;
  storeRank?: string;
  phone?: string;
  biz_number?: string;
  owner_name?: string;
  owner_phone?: string;
  addr: string;
  addrDetail?: string;
  linkBsns?: any[];
  lat: any;
  lng: any;
};

const ErpStoreCreate = () => {
  const navitate = useNavigate();
  const submitRef = useRef<FormikValues>(null);
  const mapRef = useRef<any>();
  const [center, setCenter] = useState({ lat: null, lng: null });
  const [storeData, setStoreData] = useState<StoreInfo | undefined>({
    storeName: "",
    storeCode: "",
    storeStatus: "",
    storeRank: "",
    phone: "",
    biz_number: "",
    owner_name: "",
    owner_phone: "",
    addr: "",
    addrDetail: "",
    lat: "",
    lng: "",
    linkBsns: [],
  });

  const createStore = (value: StoreInfo) => {
    console.log("update click");
    submitRef?.current && submitRef.current.handleSubmit();
    navitate("/erp/store");
  };

  return (
    <Section p="0.625rem 1rem 3.75rem">
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
              <Text>매장 등록</Text>
            </Tab>
          </TabList>
          <Flex
            position="absolute"
            top="calc(-0.5rem + 1px)"
            right="0"
            gap="1rem"
            direction="column"
            align="flex-end"
          >
            <Button
              variant="editor"
              onClick={() => {
                storeData && createStore(storeData);
              }}
            >
              <IcoCheckCircle w="0.875rem" h="0.875rem" />
              완료
            </Button>
            <ModalStoreUpload />
          </Flex>
          <Divider m="0" borderBottomWidth="2px" color="font.title" />
        </Flex>
        <TabPanels>
          <TabPanel key="panel-pointer">
            <Flex p="1rem 1.625rem" h="100%" flexDirection="column" gap="1rem">
              <FormStoreEditor
                initVal={storeData}
                fixMode={true}
                setValues={setStoreData}
                update={true}
                ref={submitRef}
              />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Section>
  );
};

export default ErpStoreCreate;
