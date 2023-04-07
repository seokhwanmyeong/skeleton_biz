//  LIB
import { useRef, useMemo, useState, useEffect } from "react";
import {
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
} from "@chakra-ui/react";
import { FormikValues } from "formik";
import { useNavigate } from "react-router-dom";
//  Components
import ErpHistory from "@page/erp/history/ErpHistory";
import Section from "@components/common/Section";
import { IcoBtnBack, IcoBtnClose, IcoBtnUpdate } from "@components/common/Btn";
import FormClientEditor from "@components/form/erp/FormClientEditor";
//  Hook
import useLocationState from "@hook/useLocationState";
//  Api & URL
import { erpStoreApi } from "@src/api/biz/config";
//  Form & Column
import { formSearchStore } from "@page/erp/store/form";
import { mainTable } from "@page/erp/store/column";
//  Icon
import { IcoBars, IcoHistory } from "@assets/icons/icon";

type ClientInfo = {
  clientName: string;
  clientPhone: string;
  clientStatus: string;
  clientPath: string;
  age: number;
  job: string;
  resident: string;
  exp: boolean;
  hopeArea: string;
  startFund: number;
  favorRent: string;
  manager: string;
  createdAt: string;
};

const ErpClientDetail = () => {
  const navigate = useNavigate();
  const { location } = useLocationState();
  const state = location.state;
  const [tabIdx, setTabIdx] = useState<number>(state?.tabIdx || 0);
  const [activeUpdate, setActiveUpdate] = useState(false);
  const [clientData, setClientData] = useState<ClientInfo | undefined>(
    undefined
  );
  const submitRef = useRef<FormikValues>(null);
  const { column, initReq, form } = useMemo(
    () => ({
      column: mainTable,
      initReq: formSearchStore.initVal,
      form: formSearchStore,
    }),
    []
  );

  const getClientInfo = () => {
    console.log("click");
  };

  const updateClientInfo = (value: ClientInfo) => {
    console.log("update click");
  };

  useEffect(() => {
    // console.log(state);
    if (state?.id) {
      if (state.tabIdx) {
        setTabIdx(state.tabIdx);
      }

      setClientData({
        clientName: "김양일",
        clientPhone: "010-8277-8260",
        clientStatus: "statusReady",
        clientPath: "path1",
        age: 31,
        job: "선생님",
        resident: "경기도 김포시 풍무동",
        exp: false,
        hopeArea: "경기도 김포시 풍무동",
        startFund: 10000000,
        favorRent: "매물01",
        manager: "임꺽정",
        createdAt: "2023-03-30",
      });
    } else {
      navigate("/erp/client");
    }
  }, []);

  return (
    <Section
      p={tabIdx === 1 ? "1rem 0rem 3.75rem" : "1rem 0.75rem 3.75rem"}
      borderRadius={tabIdx === 1 && "0"}
      boxShadow={tabIdx === 1 && "none"}
      bg={tabIdx === 1 && "none"}
      overflow={tabIdx === 1 && "visible"}
    >
      <Tabs
        variant="detailPage"
        index={tabIdx}
        onChange={(index) => setTabIdx(index)}
      >
        <Flex
          pos="relative"
          p={tabIdx === 1 ? "0 0.75rem" : "0"}
          w="100%"
          justify="center"
          align="center"
          direction="column"
        >
          <IcoBtnBack
            style={{
              position: "absolute",
              top: 0,
              left: tabIdx === 1 ? "0.75rem" : 0,
              w: "max-content",
            }}
            w="max-content"
          />
          <TabList>
            <Tab key="tab-info">
              <IcoBars />
              <Text>기본 정보</Text>
            </Tab>
            <Tab key="tab-history" isDisabled={activeUpdate}>
              <IcoHistory />
              <Text>히스토리 게시판</Text>
            </Tab>
          </TabList>
          {activeUpdate && (
            <IcoBtnClose
              style={{
                position: "absolute",
                top: 0,
                right: "2rem",
                w: "max-content",
              }}
              onClick={() => {
                setActiveUpdate(!activeUpdate);
              }}
            />
          )}
          {tabIdx === 0 && (
            <IcoBtnUpdate
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                w: "max-content",
              }}
              isActive={activeUpdate}
              onClick={() => {
                if (activeUpdate) {
                  submitRef?.current && submitRef.current.handleSubmit();
                  setActiveUpdate(!activeUpdate);
                } else {
                  setActiveUpdate(!activeUpdate);
                }
              }}
            />
          )}
          <Divider m="0 0 1.25rem" borderBottomWidth="2px" color="font.title" />
        </Flex>
        <TabPanels>
          <TabPanel key="panel-pointer">
            <Flex p="0 3vw" h="100%" flexDirection="column" gap="1rem">
              <FormClientEditor
                initVal={clientData}
                fixMode={activeUpdate}
                setValues={updateClientInfo}
                update={true}
                ref={submitRef}
              ></FormClientEditor>
            </Flex>
          </TabPanel>
          <TabPanel key="panel-area" overflow={"visible"}>
            <ErpHistory id="test" title={clientData?.clientName} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Section>
  );
};

export default ErpClientDetail;
