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
