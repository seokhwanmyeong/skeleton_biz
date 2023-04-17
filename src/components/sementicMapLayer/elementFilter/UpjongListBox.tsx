//  Lib
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
//  State
import { atomUpjongState } from "@src/states/sementicMap/stateFilter";
//  Icon
import {
  IcoAppStore,
  IcoArrowNext,
  IcoStepTrue,
  IcoUpjongTop1,
  IcoUpjongTop2,
  IcoUpjongTop3,
  IcoUpjongTop4,
  IcoUpjongTop5,
  IcoUpjongTop6,
} from "@assets/icons/icon";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
import {
  DecoBoxR,
  DecoBoxL,
} from "@components/sementicMapLayer/elementDeco/Deco";

type Props = {
  isOpen?: boolean;
  onClick?: (props?: any) => any;
  relateOpen?: boolean;
};

const UpjonListBox = ({ relateOpen = false }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabIdx, setTabIdx] = useState(0);
  const [{ top, mid, bot }, setUpjong] = useRecoilState(atomUpjongState);
  const [localUpjong, setLocal] = useState({
    top: top || "",
    mid: mid || "",
    bot: bot || "",
  });

  const upjong: any = {
    top: [
      { text: "생활서비스", icon: <IcoUpjongTop1 /> },
      { text: "소매/유통", icon: <IcoUpjongTop2 /> },
      { text: "여가/오락", icon: <IcoUpjongTop3 /> },
      { text: "음식", icon: <IcoUpjongTop4 /> },
      { text: "의료/건강", icon: <IcoUpjongTop5 /> },
      { text: "학문/교육", icon: <IcoUpjongTop6 /> },
    ],
    mid: {
      생활서비스: [
        "광고/인쇄/인화",
        "미용서비스",
        "법무세무회계",
        "부동산",
        "사우나/휴게시설",
        "세탁/가사서비스",
        "수리서비스",
        "예식/의례",
        "주유소/충전소",
        "차량관리",
      ],
    },
    bot: {
      "광고/인쇄/인화": [
        { code: "F01001", text: "간판/광고" },
        { code: "F01002", text: "사진관" },
        { code: "F01003", text: "인쇄업" },
        { code: "F01004", text: "전문디자인" },
      ],
      미용서비스: [
        { code: "F02005", text: "두피/탈모" },
        { code: "F02002", text: "발/네일케어" },
        { code: "F02003", text: "비만/피부관리" },
        { code: "F02004", text: "여성미용실" },
        { code: "F02001", text: "이발소/남성미용실" },
      ],
      법무세무회계: [
        { code: "F03005", text: "기타전문서비스" },
        { code: "F03001", text: "법무사" },
        { code: "F03002", text: "변호사" },
        { code: "F03003", text: "세무/회계사" },
        { code: "F03004", text: "회계사" },
      ],
      부동산: [{ code: "F04001", text: "부동산중개" }],
      "사우나/휴게시설": [{ code: "F05001", text: "사우나/목욕탕" }],
      "세탁/가사서비스": [
        { code: "F06001", text: "세탁소/빨래방" },
        { code: "F06002", text: "청소/소독" },
      ],
      수리서비스: [
        { code: "F06003", text: "기계류수리업" },
        { code: "F06002", text: "수선/수리" },
        { code: "F06001", text: "컴퓨터수리" },
      ],
      "예식/의례": [
        { code: "F08002", text: "결혼서비스" },
        { code: "F08001", text: "예식장" },
        { code: "F08003", text: "장례서비스" },
      ],
      "주유소/충전소": [
        { code: "F09003", text: "가정용연료" },
        { code: "F09001", text: "주유소" },
        { code: "F09002", text: "차량가스충전소" },
      ],
      차량관리: [
        { code: "F10004", text: "렌터카" },
        { code: "F10001", text: "세차/광택" },
        { code: "F10006", text: "운전대행" },
        { code: "F10002", text: "자동차정비/카센타" },
        { code: "F10003", text: "주차장" },
        { code: "F10005", text: "차량견인" },
      ],
    },
  };

  useEffect(() => {
    setLocal({
      top: top,
      mid: mid,
      bot: bot,
    });

    if (top && mid && bot) {
      setTabIdx(2);
    } else {
      setTabIdx(0);
    }
  }, [isOpen]);

  return (
    <>
      <Button
        onClick={() => {
          isOpen ? onClose() : onOpen();
        }}
        variant="filterTop"
      >
        <Box>
          <IcoAppStore />
        </Box>
        업종
      </Button>
      {isOpen && (
        <Flex
          pos="absolute"
          top="4rem"
          left="50%"
          transform="translateX(-50%)"
          p="1rem 0rem 0rem"
          display={isOpen ? "flex" : "none"}
          direction="column"
          justify="center"
          border="1px solid #BFBFBF"
        >
          <Flex p="0 1.3125rem" align="center" gap="1rem">
            <Heading
              as={"h5"}
              fontSize="sm"
              lineHeight="normal"
              color="font.title"
              bg="none"
            >
              업종선택
            </Heading>
            <IcoAppStore width="0.875rem" height="0.875rem" />
          </Flex>
          <Deco01
            margin="0.25rem 0 1.3125rem"
            p="0 1.3125rem"
            width="100%"
            height="auto"
          />
          <Tabs
            variant="upjongBox"
            defaultIndex={0}
            index={tabIdx}
            onChange={(idx: number) => setTabIdx(idx)}
          >
            <TabList>
              <Tab key="tab-top">
                {localUpjong.top && tabIdx !== 0 ? (
                  <IcoStepTrue color="primary.type7" />
                ) : (
                  <Flex
                    w="1.125rem"
                    h="1.125rem"
                    align="center"
                    justify="center"
                    borderRadius="50%"
                    border="1px solid"
                    fontFamily="main"
                    fontWeight="regular"
                    fontSize="10px"
                    borderColor={tabIdx === 0 ? "#FFFFFF" : "font.disabled"}
                    bgColor={tabIdx === 0 ? "primary.type7" : "transparent"}
                    color={tabIdx === 0 ? "#FFFFFF" : "font.disabled"}
                  >
                    1
                  </Flex>
                )}
                <Text>대분류</Text>
                <IcoArrowNext
                  position="absolute"
                  right="0"
                  transform="translateX(50%)"
                  width="0.4rem"
                  height="0.8rem"
                  color="font.disabled"
                />
              </Tab>
              <Tab isDisabled={localUpjong.top ? false : true} key="tab-mid">
                <Flex
                  w="1.125rem"
                  h="1.125rem"
                  align="center"
                  justify="center"
                  borderRadius="50%"
                  border="1px solid"
                  fontFamily="main"
                  fontWeight="regular"
                  fontSize="10px"
                  borderColor={tabIdx === 1 ? "#FFFFFF" : "font.disabled"}
                  bgColor={tabIdx === 1 ? "primary.type7" : "transparent"}
                  color={tabIdx === 1 ? "#FFFFFF" : "font.disabled"}
                >
                  2
                </Flex>
                <Text>중분류</Text>
                <IcoArrowNext
                  position="absolute"
                  right="0"
                  transform="translateX(50%)"
                  width="0.4rem"
                  height="0.8rem"
                  color="font.disabled"
                />
              </Tab>
              <Tab isDisabled={localUpjong.mid ? false : true} key="tab-bot">
                <Flex
                  w="1.125rem"
                  h="1.125rem"
                  align="center"
                  justify="center"
                  borderRadius="50%"
                  border="1px solid"
                  fontFamily="main"
                  fontWeight="regular"
                  fontSize="10px"
                  borderColor={tabIdx === 2 ? "#FFFFFF" : "font.disabled"}
                  bgColor={tabIdx === 2 ? "primary.type7" : "transparent"}
                  color={tabIdx === 2 ? "#FFFFFF" : "font.disabled"}
                >
                  3
                </Flex>
                <Text>소분류</Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Flex
                  justify="center"
                  align="center"
                  w="100%"
                  h="100%"
                  gap="1rem"
                >
                  {upjong.top.map(
                    ({ text, icon }: { text: string; icon: any }) => {
                      return (
                        <Button
                          variant="slctTopUpjong"
                          key={`key-${text}`}
                          isActive={localUpjong.top === text}
                          onClick={() => {
                            setLocal({
                              top: text,
                              mid: "",
                              bot: "",
                            });
                            setTabIdx(1);
                          }}
                        >
                          {icon && (
                            <Flex
                              align="center"
                              justify="center"
                              w="2.5rem"
                              h="2.5rem"
                              bg={
                                localUpjong.top === text
                                  ? "linear-gradient(180deg, #D4B106 0%, rgba(212, 177, 6, 0) 100%)"
                                  : "linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%)"
                              }
                              filter={
                                localUpjong.top === text
                                  ? "drop-shadow(0px 4px 4px rgba(212, 177, 6, 0))"
                                  : "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
                              }
                              backdropFilter="blur(5px)"
                              border="1px solid"
                              borderColor={
                                localUpjong.top === text ? "#FFFFFF" : "#898989"
                              }
                              borderRadius="8px"
                              box-shadow="0px 4px 4px 0 rgb(0 0 0 / 25%)"
                              sx={{
                                svg: {
                                  color:
                                    localUpjong.top === text
                                      ? "#FFFFFF"
                                      : "font.primary",
                                },
                              }}
                            >
                              {icon}
                            </Flex>
                          )}
                          {text}
                        </Button>
                      );
                    }
                  )}
                </Flex>
              </TabPanel>
              <TabPanel>
                <Grid
                  w="100%"
                  templateColumns="repeat(5, calc(20% - 0.3rem))"
                  gap="0.375rem"
                >
                  {localUpjong.top &&
                    upjong.mid[localUpjong.top]?.map((text: string) => {
                      return (
                        <Button
                          variant="slctUpjong"
                          isActive={localUpjong.mid === text}
                          key={`key-${text}`}
                          onClick={() => {
                            setLocal({
                              top: localUpjong.top,
                              mid: text,
                              bot: "",
                            });
                            setTabIdx(2);
                          }}
                        >
                          {text}
                        </Button>
                      );
                    })}
                </Grid>
              </TabPanel>
              <TabPanel
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Grid
                  w="100%"
                  templateColumns="repeat(5, calc(20% - 0.3rem))"
                  gap="0.375rem"
                >
                  {localUpjong.mid &&
                    upjong.bot[localUpjong.mid]?.map(
                      ({ text, code }: { text: string; code: string }) => {
                        return (
                          <Button
                            variant="slctUpjong"
                            isActive={localUpjong.bot === code}
                            key={`key-${code}`}
                            onClick={() => {
                              setLocal({
                                top: localUpjong.top,
                                mid: localUpjong.mid,
                                bot: code,
                              });
                              onClose;
                            }}
                          >
                            {text}
                          </Button>
                        );
                      }
                    )}
                </Grid>
                {tabIdx === 2 && (
                  <Button
                    variant="slctUpjong"
                    isDisabled={
                      !(localUpjong.top && localUpjong.mid && localUpjong.bot)
                    }
                    onClick={() => {
                      if (
                        localUpjong.top &&
                        localUpjong.mid &&
                        localUpjong.bot
                      ) {
                        setUpjong(localUpjong);
                        onClose();
                      } else {
                        alert("업종을 선택해주세요");
                      }
                    }}
                  >
                    설정완료
                  </Button>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Flex
            position="absolute"
            top="-4.6%"
            left="50%"
            transform="translateX(-50%)"
            gap="0.25rem"
          >
            <Box
              boxSizing="border-box"
              w="0.25rem"
              h="0.25rem"
              background="#FFFFFF"
              border="1px solid #FFFFFF"
            ></Box>
            <Box
              boxSizing="border-box"
              w="0.25rem"
              h="0.25rem"
              background="#FFFFFF"
              border="1px solid #FFFFFF"
            ></Box>
          </Flex>
          <DecoBoxL
            position="absolute"
            top="50%"
            left="-0.5rem"
            transform="translateY(-50%)"
            width="3.6%"
            height="107%"
            color="#FFFFFF"
          />
          <DecoBoxR
            position="absolute"
            top="50%"
            right="-0.5rem"
            transform="translateY(-50%)"
            width="3.6%"
            height="107%"
            color="#FFFFFF"
          />
          <Box
            zIndex={-1}
            position="absolute"
            top={0}
            left={0}
            display="block"
            width="100%"
            height="100%"
            bg="rgba(255, 255, 255, 0.75)"
            backdropFilter="blur(5px)"
            userSelect="none"
          ></Box>
        </Flex>
      )}
    </>
  );
};

export default UpjonListBox;
