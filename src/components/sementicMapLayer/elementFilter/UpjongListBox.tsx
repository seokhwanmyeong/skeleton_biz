//  Lib
import { useState, useEffect, Fragment } from "react";
import { useRecoilState } from "recoil";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
//  State
import {
  atomUpjongBotList,
  atomUpjongMidList,
  atomUpjongState,
  atomUpjongTopList,
} from "@states/sementicMap/stateFilter";
//  Api
import { apiUpjong } from "@api/biz/config";
//  Icon
import {
  IcoAppStore,
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
  DecoBoxL,
  DecoBoxR,
  DecoTopFilterModal,
} from "@components/sementicMapLayer/elementDeco/Deco";

type Props = {
  isOpen?: boolean;
  relateOpen?: boolean;
  isDisabled?: boolean;
  relateSetClose?: (props?: any) => any;
  onClick?: (props?: any) => any;
};

const UpjonListBox = ({
  relateOpen = false,
  relateSetClose,
  isDisabled = false,
}: Props) => {
  const { getTopList, getMidList, getBotList } = apiUpjong;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabIdx, setTabIdx] = useState(0);
  const [{ top, mid, bot }, setUpjong] = useRecoilState(atomUpjongState);
  const [topList, setTopList] = useRecoilState(atomUpjongTopList);
  const [midList, setMidList] = useRecoilState(atomUpjongMidList);
  const [botList, setBotList] = useRecoilState(atomUpjongBotList);
  const [localUpjong, setLocal] = useState({
    top: {
      name: top.name || "",
      code: top.code || "",
    },
    mid: {
      name: mid.name || "",
      code: mid.code || "",
    },
    bot: {
      name: bot.name || "",
      code: bot.code || "",
    },
  });

  const upjong: any = {
    top: [
      { text: "소매/유통", icon: <IcoUpjongTop1 /> },
      { text: "생활서비스", icon: <IcoUpjongTop2 /> },
      { text: "음식", icon: <IcoUpjongTop3 /> },
      { text: "여가/오락", icon: <IcoUpjongTop4 /> },
      { text: "학문/교육", icon: <IcoUpjongTop5 /> },
      { text: "의료/건강", icon: <IcoUpjongTop6 /> },
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

  const upjongIcon = {
    D: <IcoUpjongTop1 />,
    F: <IcoUpjongTop2 />,
    Q: <IcoUpjongTop3 />,
    O: <IcoUpjongTop4 />,
    R: <IcoUpjongTop5 />,
    S: <IcoUpjongTop6 />,
  };

  const upjongMidHandler = (code: string) => {
    if (code) {
      getMidList({ code: code }).then((res: any) => {
        console.log(res);
        if (res.data && res.data.length > 0) {
          setMidList(res.data);
          setTabIdx(1);
        }
      });
    }
  };

  const upjongBotHandler = (code: string) => {
    if (code) {
      getBotList({ code: code }).then((res: any) => {
        console.log(res);
        if (res.data && res.data.length > 0) {
          setBotList(res.data);
          setTabIdx(2);
        }
      });
    }
  };

  useEffect(() => {
    setLocal({
      top: { name: top.name, code: top.code },
      mid: { name: mid.name, code: mid.code },
      bot: { name: bot.name, code: bot.code },
    });

    if (top?.code && mid?.code && bot?.code) {
      setTabIdx(2);
    } else {
      setTabIdx(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (relateOpen) {
      isOpen && onClose();
    }
  }, [relateOpen]);

  useEffect(() => {
    if (topList.length === 0) {
      getTopList().then((res: any) => {
        if (res.data && res.data.length > 0) {
          setTopList(res.data);
        }
      });
    }
  }, []);

  return (
    <Fragment>
      <Button
        onClick={() => {
          if (isOpen) {
            onClose();
          } else {
            onOpen();
            relateOpen && relateSetClose && relateSetClose();
          }
        }}
        isDisabled={isDisabled}
        isActive={isOpen}
        variant="filterTop"
      >
        <Box>
          <IcoAppStore />
        </Box>
        업종
      </Button>
      {isOpen && !isDisabled && (
        <DecoTopFilterModal isOpen={isOpen} w="29.5rem">
          <Heading
            as={"h5"}
            bg="none"
            fontSize="md"
            lineHeight="1.5rem"
            color="font.title"
            textAlign="center"
          >
            업종선택
          </Heading>
          <Deco01
            margin="0.25rem 0 1.3125rem"
            p="0 1.3125rem"
            width="100%"
            height="auto"
          />
          <Accordion
            variant="slctUpjong"
            defaultIndex={0}
            index={tabIdx}
            onChange={(idx: number) => setTabIdx(idx)}
          >
            <AccordionItem>
              <AccordionButton
                color={localUpjong.top ? "primary.type8" : "font.primary"}
                _hover={{
                  color: "primary.type8",
                }}
              >
                {localUpjong.top.name ? localUpjong.top.name : "대분류"}
              </AccordionButton>
              <Divider m="0.25rem 0rem 1rem" borderColor="neutral.gray6" />
              <AccordionPanel>
                <Flex justify="space-between" align="center" w="100%">
                  {topList?.map(
                    ({
                      name,
                      code,
                    }: {
                      name: string;
                      code: "D" | "F" | "O" | "Q" | "R" | "S";
                    }) => {
                      return (
                        <Button
                          variant="filterTop02"
                          key={`key-${code}`}
                          isActive={localUpjong.top.code === code}
                          onClick={() => {
                            setLocal({
                              top: {
                                name: name,
                                code: code,
                              },
                              mid: {
                                name: "",
                                code: "",
                              },
                              bot: {
                                name: "",
                                code: "",
                              },
                            });
                            upjongMidHandler(code);
                          }}
                        >
                          {upjongIcon[code] && <Box>{upjongIcon[code]}</Box>}
                          {name}
                        </Button>
                      );
                    }
                  )}
                </Flex>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem isDisabled={localUpjong.top ? false : true}>
              <AccordionButton
                color={localUpjong.mid ? "primary.type8" : "font.primary"}
                _hover={{
                  color: "primary.type8",
                }}
              >
                {localUpjong.mid.name ? localUpjong.mid.name : "중분류"}
              </AccordionButton>
              <Divider m="0.25rem 0rem 1rem" borderColor="neutral.gray6" />
              <AccordionPanel>
                <Grid
                  w="100%"
                  templateColumns="repeat(5, calc(20% - 0.3rem))"
                  gap="0.375rem"
                >
                  {localUpjong.top &&
                    midList?.map(
                      ({ name, code }: { name: string; code: string }) => {
                        return (
                          <Button
                            variant="slctUpjong"
                            isActive={localUpjong.mid.code === code}
                            key={`key-${code}`}
                            onClick={() => {
                              setLocal({
                                top: localUpjong.top,
                                mid: {
                                  name: name,
                                  code: code,
                                },
                                bot: {
                                  name: "",
                                  code: "",
                                },
                              });
                              upjongBotHandler(code);
                            }}
                          >
                            {name}
                          </Button>
                        );
                      }
                    )}
                </Grid>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem isDisabled={localUpjong.mid ? false : true}>
              <AccordionButton
                color={localUpjong.bot.code ? "primary.type8" : "font.primary"}
                _hover={{
                  color: "primary.type8",
                }}
              >
                {localUpjong.bot.name ? localUpjong.bot.name : "소분류"}
              </AccordionButton>
              <Divider m="0.25rem 0rem 1rem" borderColor="neutral.gray6" />
              <AccordionPanel>
                <Grid
                  w="100%"
                  templateColumns="repeat(5, calc(20% - 0.3rem))"
                  gap="0.375rem"
                >
                  {localUpjong.mid &&
                    botList?.map(
                      ({ name, code }: { name: string; code: string }) => {
                        return (
                          <Button
                            variant="slctUpjong"
                            isActive={localUpjong.bot.code === code}
                            key={`key-${code}`}
                            onClick={() => {
                              setLocal({
                                top: localUpjong.top,
                                mid: localUpjong.mid,
                                bot: {
                                  name: name,
                                  code: code,
                                },
                              });
                              setUpjong({
                                top: localUpjong.top,
                                mid: localUpjong.mid,
                                bot: {
                                  name: name,
                                  code: code,
                                },
                              });
                              onClose();
                            }}
                          >
                            {name}
                          </Button>
                        );
                      }
                    )}
                </Grid>
                {/* {tabIdx === 2 && (
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
                )} */}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <DecoBoxL
            position="absolute"
            top="50%"
            left="-0.5rem"
            transform="translateY(-50%)"
            width="5%"
            height="107%"
            color="#FFFFFF"
          />
          <DecoBoxR
            position="absolute"
            top="50%"
            right="-0.5rem"
            transform="translateY(-50%)"
            width="5%"
            height="107%"
            color="#FFFFFF"
          />
        </DecoTopFilterModal>
      )}
    </Fragment>
  );
};

export default UpjonListBox;
