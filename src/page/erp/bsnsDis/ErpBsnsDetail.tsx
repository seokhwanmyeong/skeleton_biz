//  LIB
import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
  Divider,
  useTheme,
} from "@chakra-ui/react";
import { FormikValues } from "formik";
//  Components
import Table from "@components/table/Table";
import Section from "@components/common/Section";
import { IcoBtnBack, IcoBtnUpdate, IcoBtnClose } from "@components/common/Btn";
import FormBsnsLayer from "@components/form/erp/FormBsnsLayer";
//  Hook
import useLocationState from "@hook/useLocationState";
//  Util
import { columnStoreInfo } from "@components/table/column/erp";
//  Icon
import { IcoBars } from "@assets/icons/icon";

type BsnsInfo = {
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
  center: {
    lat: number;
    lng: number;
  };
};

const ErpBsnsDetail = ({
  id,
  activeBack = true,
  side = false,
}: {
  id?: string;
  activeBack?: boolean;
  side?: boolean;
}) => {
  const navigate = useNavigate();
  const { location } = useLocationState();
  const state = location.state;
  const mapRef = useRef<any>();
  const [activeUpdate, setActiveUpdate] = useState(false);
  const [tabIdx, setTabIdx] = useState<number>(state?.tabIdx || 0);
  const [bsns, setBsns] = useState<any | undefined>(undefined);
  const submitRef = useRef<FormikValues>(null);
  const column = useMemo(() => columnStoreInfo, []);

  const getStoreInfo = () => {
    console.log("click");
  };

  const updateStoreInfo = (value: any) => {
    console.log("update click");
  };

  useEffect(() => {
    // console.log(state);
    if (state?.id) {
      if (state.tabIdx) {
        setTabIdx(state.tabIdx);
      }

      setBsns([
        {
          bsnsType: "0",
          bsnsName: "상권1",
          duplicate: false,
          storeLink: false,
          color: "#FADB14",
        },
        {
          bsnsType: "1",
          bsnsName: "상권2",
          duplicate: false,
          storeLink: false,
          color: "#DE9F9F",
        },
        {
          bsnsType: "2",
          bsnsName: "상권3",
          duplicate: false,
          storeLink: false,
          color: "#74D8D2",
        },
        {
          bsnsType: "3",
          bsnsName: "상권4",
          duplicate: false,
          storeLink: false,
          color: "#B3FFB1",
        },
        {
          bsnsType: "4",
          bsnsName: "상권5",
          duplicate: false,
          storeLink: false,
          color: "#EFAEE1",
        },
      ]);
    }
  }, [state]);

  return (
    <Section p="1rem 0.75rem 3.75rem">
      <Tabs
        variant="detailPage"
        index={tabIdx}
        onChange={(index) => setTabIdx(index)}
      >
        <Flex
          pos="relative"
          p={0}
          w="100%"
          justify="center"
          align="center"
          direction="column"
        >
          {activeBack && (
            <IcoBtnBack
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                w: "max-content",
              }}
              w="max-content"
            />
          )}
          <TabList>
            <Tab key="tab-info">
              <IcoBars />
              <Text>상권 레이어 설정</Text>
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
              <FormBsnsLayer
                initVal={[
                  {
                    bsnsType: "0",
                    bsnsName: "상권1",
                    duplicate: false,
                    storeLink: false,
                    color: "#FADB14",
                  },
                  {
                    bsnsType: "0",
                    bsnsName: "상권2",
                    duplicate: false,
                    storeLink: false,
                    color: "#DE9F9F",
                  },
                  {
                    bsnsType: "0",
                    bsnsName: "상권3",
                    duplicate: false,
                    storeLink: false,
                    color: "#74D8D2",
                  },
                  {
                    bsnsType: "0",
                    bsnsName: "상권4",
                    duplicate: false,
                    storeLink: false,
                    color: "#B3FFB1",
                  },
                  {
                    bsnsType: "0",
                    bsnsName: "상권5",
                    duplicate: false,
                    storeLink: false,
                    color: "#EFAEE1",
                  },
                ]}
                fixMode={activeUpdate}
                setValues={updateStoreInfo}
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

export default ErpBsnsDetail;
