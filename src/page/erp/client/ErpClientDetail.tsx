//  LIB
import { useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//  Components
import ListTable from "@components/table/ListTable";
import ApiTable from "@components/table/ApiTable";
import ModalClientEditor from "@components/modal/erp/ModalClientEditor";
//  Hook
import useLocationState from "@hook/useLocationState";
//  Api & URL
import { erpStoreApi } from "@api/bizApi/config";
//  Form & Column
import { formSearchStore } from "@page/erp/store/form";
import { mainTable } from "@page/erp/store/column";
import ErpHistory from "../history/ErpHistory";

const ErpClientDetail = () => {
  const navigate = useNavigate();
  const { location } = useLocationState();
  const state = location.state;
  const testKeys = {
    clientName: "고객명",
    clientPhone: "고객연락처",
    clientStep: "고객상태",
    path: "유입경로",
    age: "나이",
    job: "직업",
    resident: "거주지",
    exp: "창업경험",
    address: "희망지역",
    startFund: "창업자금",
    favorRent: "관심매물",
    memberName: "담당자명",
    createdAt: "등록일",
  };

  const { column, initReq, form } = useMemo(
    () => ({
      column: mainTable,
      initReq: formSearchStore.initVal,
      form: formSearchStore,
    }),
    []
  );

  return (
    <Box
      overflowY="scroll"
      pl="1rem"
      __css={{
        "::-webkit-scrollbar": {
          w: "5px",
        },
        "::-webkit-scrollbar-thumb": {
          borderRadius: "5",
          bg: `primary.reverse.bdColor`,
        },
      }}
    >
      <Button
        mb="1rem"
        key={`link-prev`}
        w="max-content"
        onClick={() => navigate(-1)}
      >
        {"< 고객리스트"}
      </Button>
      <Heading mb="2rem">고객상세 : {state.name || "고객이름"}</Heading>
      <Flex gap={5}>
        <Flex gap={2}>
          <Text textStyle="list.title">고객명 : </Text>
          <Text textStyle="list.text">{state.name}</Text>
        </Flex>
      </Flex>
      <hr style={{ margin: "1rem 0" }} />
      <Tabs>
        <TabList justifyContent="left">
          <Tab key="tab-info" flexDirection="column" w="20%">
            <Text>기본정보</Text>
          </Tab>
          <Tab key="tab-history" flexDirection="column" w="20%">
            <Text>히스토리</Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel key="panel-pointer">
            <Flex flexDirection="column" gap="1rem">
              <Flex w="100%" justifyContent="flex-end" gap="1rem">
                <ModalClientEditor update={true} info={state} />
              </Flex>
              <Flex flexDirection="row" w="100%" gap="3rem">
                <ListTable
                  tableProps={{ w: "50%" }}
                  data={state}
                  listKeys={testKeys}
                />
              </Flex>
            </Flex>
          </TabPanel>
          <TabPanel key="panel-area">
            <ErpHistory />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ErpClientDetail;
