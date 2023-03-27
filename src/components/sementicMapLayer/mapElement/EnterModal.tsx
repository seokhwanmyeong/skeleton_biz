//  Lib
import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

type EnterProps = {
  isEnter: boolean;
  enterHandler: (val: boolean) => void;
};

const EnterModal = ({ isEnter, enterHandler }: EnterProps) => {
  const [tabIdx, setTabIdx] = useState<number>(0);
  const [method, setMethod] = useState<string>("area");

  return (
    <Modal isOpen={isEnter} onClose={() => enterHandler(false)}>
      <ModalOverlay />
      <ModalContent w="auto" maxW="auto">
        <ModalHeader>TEST</ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Tabs
            variant="mapEnter"
            index={tabIdx}
            onChange={(idx: number) => setTabIdx(idx)}
          >
            <TabList>
              <Tab>
                <Flex>
                  1<Heading>분석 설정</Heading>
                </Flex>
                <Text>Description Content</Text>
              </Tab>
              <Tab isDisabled={!(tabIdx >= 1)}>
                <Flex>
                  1<Heading>분석 설정</Heading>
                </Flex>
                <Text>Description Content</Text>
              </Tab>
              <Tab isDisabled={!(tabIdx >= 2)}>
                <Flex>
                  1<Heading>분석 설정</Heading>
                </Flex>
                <Text>Description Content</Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Tabs
                  index={method === "area" ? 0 : 1}
                  onChange={(idx: number) =>
                    setMethod(idx === 0 ? "area" : "district")
                  }
                >
                  <TabList>
                    <Tab>
                      <Flex>지역상권분석</Flex>
                    </Tab>
                    <Tab>
                      <Flex>입지상권분석</Flex>
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Flex>
                        <Text>
                          지역 설정에 따른 분석을 진행 할 수 있습니다.
                        </Text>
                      </Flex>
                    </TabPanel>
                    <TabPanel>
                      <Flex>
                        <Text>
                          입지 구역에 따른 분석을 진행 할 수 있습니다.
                        </Text>
                      </Flex>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </TabPanel>
              <TabPanel>
                <Flex>
                  <Text>지역 구역에 따른 분석을 진행 할 수 있습니다.</Text>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex>
                  <Text>입지 설정에 따른 분석을 진행 할 수 있습니다.</Text>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button variant="cancel" onClick={() => enterHandler(false)}>
            취소
          </Button>
          <Button variant="next" onClick={() => setTabIdx(tabIdx + 1)}>
            다음
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EnterModal;
