//  Lib
import { useState, useRef } from "react";
import { useRecoilState, useResetRecoilState, useRecoilValue } from "recoil";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Tooltip,
} from "@chakra-ui/react";
//  Component
import { CheckboxGroup } from "@components/common/CheckBox";
import { SwitchFilter } from "@components/common/Switch";
import { BtnFilterSearch } from "@components/common/Btn";
//  State
import {
  atomUpjongState,
  infoComFloatPop,
  infoComJobPop,
  infoComResiPop,
  infoComHousehold,
  infoComUpjongCnt,
  infoComSale,
  resetNice,
} from "@states/sementicMap/stateFilter";
//  Api
import { apiMapNice } from "@api/biz/config";
//  Icon
import {
  IcoGroup,
  IcoNice2,
  IcoNice3,
  IcoResident,
  IcoRefresh,
  IcoFilter02,
  IcoWorkspace,
  IcoMonitoring,
} from "@assets/icons/icon";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
import { DecoCardBg } from "@components/sementicMapLayer/elementDeco/Deco";

type Props = {
  areaCode: string;
};

const NiceFilter = ({ areaCode }: Props) => {
  const { getSigunguRank } = apiMapNice;
  const divRef = useRef<HTMLDivElement | null>(null);
  const [openIdx, setOpenIdx] = useState(0);
  const { bot } = useRecoilValue(atomUpjongState);
  const [flowPop, setFlowPop] = useRecoilState(infoComFloatPop);
  const [filterPop, setFilterPop] = useState(flowPop.filter);
  const [resiPop, setResiPop] = useRecoilState(infoComResiPop);
  const [filterResi, setFilterResi] = useState(resiPop.filter);
  const [jobPop, setJobPop] = useRecoilState(infoComJobPop);
  const [filterJob, setFilterJob] = useState(jobPop.filter);
  const [household, setHouse] = useRecoilState(infoComHousehold);
  const [upjongCnt, setUpjong] = useRecoilState(infoComUpjongCnt);
  const [sale, setSale] = useRecoilState(infoComSale);
  const reset = useResetRecoilState(resetNice);

  //  유동인구 필터 변화 및 액티브
  const searchPopHandler = () => {
    setFlowPop({ ...flowPop, filter: filterPop, show: true, active: true });
    getSigunguRank({
      upjongCode: bot.code || "D11002",
      code: areaCode,
      flowPop: {
        active: true,
        gender: ["man", "woman"],
        age: ["20", "30", "40", "50", "60"],
      },
      resiPop: {
        active: true,
        gender: ["man", "woman"],
        age: ["20", "30", "40", "50", "60"],
      },
      jobPop: {
        active: true,
        gender: ["man", "woman"],
        age: ["20", "30", "40", "50", "60"],
      },
      sale: {
        active: true,
      },
      upjongCnt: {
        active: true,
      },
      house: {
        active: true,
      },
      // flowPop: {
      //   active: true,
      //   gender: ["man", "woman"],
      //   age: ["age20", "age30", "age40", "age50", "age60"],
      // },
      // resiPop: {
      //   active: true,
      //   gender: ["man", "woman"],
      //   age: ["age20", "age30", "age40", "age50", "age60"],
      // },
      // jobPop: {
      //   active: true,
      //   gender: ["man", "woman"],
      //   age: ["age20", "age30", "age40", "age50", "age60"],
      // },
      // sale: {
      //   active: true,
      // },
      // upjongCnt: {
      //   active: true,
      // },
      // house: {
      //   active: true,
      // },
    }).then((res: any) => {
      console.log(res);
    });
  };

  //  거주인구 필터 변화 및 액티브
  const searchResiHandler = () => {
    setResiPop({ ...resiPop, filter: filterResi, show: true, active: true });
  };

  //  직장인구 필터 변화 및 액티브
  const searchJobHandler = () => {
    setJobPop({ ...jobPop, filter: filterJob, show: true, active: true });
  };

  //  세대수 필터 변화 및 액티브
  const searchHouseHandler = () => {
    setHouse({ ...household, show: true, active: true });
  };

  //  매출액 필터 변화 및 액티브
  const searchSaleHandler = () => {
    setSale({ ...sale, show: true, active: true });
  };

  //  업종수 필터 변화 및 액티브
  const searchUpjongHandler = () => {
    setUpjong({ ...upjongCnt, show: true, active: true });
  };

  return (
    <Flex
      ref={divRef}
      pos="absolute"
      bottom="5.25rem"
      left="50%"
      zIndex={999}
      transform="translateX(-50%)"
      p="0.75rem 0 0.5rem"
      w="29.5rem"
      justify="center"
      gap="1.5rem"
      bgColor="#FFFFFFBF"
      border="1px solid"
      borderColor="neutral.gray6"
      borderRadius="34px"
    >
      {/* ============================== infoCom의 필터 버튼 ============================== */}
      <Button
        variant="filterTop02"
        isActive={openIdx === 1 || flowPop.active}
        onClick={() => {
          if (openIdx === 1) {
            setOpenIdx(0);
          } else {
            setOpenIdx(1);
          }
        }}
      >
        <Box>
          <IcoGroup width="1.125rem" height="1.125rem" color="font.primary" />
        </Box>
        유동인구
      </Button>
      <Button
        variant="filterTop02"
        isActive={openIdx === 2 || resiPop.active}
        onClick={() => {
          if (openIdx === 2) {
            setOpenIdx(0);
          } else {
            setOpenIdx(2);
          }
        }}
      >
        <Box>
          <IcoNice2 width="1.25rem" height="1.25rem" color="font.primary" />
        </Box>
        거주인구
      </Button>
      <Button
        variant="filterTop02"
        isActive={openIdx === 3 || jobPop.active}
        onClick={() => {
          if (openIdx === 3) {
            setOpenIdx(0);
          } else {
            setOpenIdx(3);
          }
        }}
      >
        <Box>
          <IcoNice3 width="1.25rem" height="1.25rem" color="font.primary" />
        </Box>
        직장인구
      </Button>
      <Button
        variant="filterTop02"
        isActive={
          openIdx === 4 || household.active || sale.active || upjongCnt.active
        }
        onClick={() => {
          if (openIdx === 4) {
            setOpenIdx(0);
          } else {
            setOpenIdx(4);
          }
        }}
      >
        <Box>
          <IcoFilter02 width="1.25rem" height="1.25rem" color="font.primary" />
        </Box>
        추가필터
      </Button>
      <Button
        variant="filterTop02"
        onClick={() => {
          setOpenIdx(0);
          reset();
        }}
      >
        <Box>
          <IcoRefresh width="1.125rem" height="1.125rem" color="font.primary" />
        </Box>
        필터초기화
      </Button>
      {/* ============================== infoCom의 필터 박스 ============================== */}
      {openIdx === 1 ? (
        <Flex
          pos="absolute"
          bottom={
            divRef?.current
              ? `calc(${divRef.current.clientHeight}px + 0.25rem)`
              : "5.25rem"
          }
          left="50%"
          transform="translateX(-50%)"
          p="1.125rem 1.375rem 1rem"
          w="29.5rem"
          display={openIdx === 1 ? "flex" : "none"}
          direction="column"
          justify="center"
          border="1px solid #BFBFBF"
        >
          <Flex justify="space-between">
            <Flex pl="0.25rem" align="center" gap="0.5rem">
              <IcoGroup
                width="1.125rem"
                height="1.125rem"
                color="font.primary"
              />
              <Heading as={"h5"} variant="filterBox">
                유동인구
              </Heading>
            </Flex>
            <Flex align="center" gap="0.5rem">
              <SwitchFilter
                isDisabled={!flowPop.active}
                isChecked={flowPop.show}
                onChange={() => {
                  setFlowPop({ ...flowPop, show: !flowPop.show });
                }}
              />
              <BtnFilterSearch
                onClick={() => {
                  searchPopHandler();
                }}
              />
            </Flex>
          </Flex>
          <Deco01 margin="0.25rem 0 0.75rem" width="100%" height="0.3125rem" />
          <Flex p="0 0.25rem" direction="column" gap="0.625rem">
            <Flex align="center">
              <FormLabel
                display="flex"
                alignItems="center"
                flex="none"
                m="0"
                w="2.8rem"
                textStyle="base"
                fontSize="xs"
                fontWeight="strong"
                color="font.secondary"
              >
                성별
              </FormLabel>
              <CheckboxGroup
                chkboxData={[
                  { text: "남자", value: "man" },
                  { text: "여자", value: "woman" },
                ]}
                chkValue={filterPop?.gender}
                activeTotal={true}
                onChange={(val: any) =>
                  setFilterPop({
                    ...filterPop,
                    gender: val,
                  })
                }
                groupProps={{
                  w: "max-content",
                }}
              />
            </Flex>
            <Flex align="center">
              <FormLabel
                display="flex"
                alignItems="center"
                flex="none"
                m="0"
                w="2.8rem"
                textStyle="base"
                fontSize="xs"
                fontWeight="strong"
                color="font.secondary"
              >
                나이대
              </FormLabel>
              <CheckboxGroup
                chkboxData={[
                  { text: "20대", value: "gen20" },
                  { text: "30대", value: "gen30" },
                  { text: "40대", value: "gen40" },
                  { text: "50대", value: "gen50" },
                  { text: "60대 이상", value: "gen60" },
                ]}
                chkValue={filterPop?.age}
                activeTotal={true}
                onChange={(val: any) =>
                  setFilterPop({
                    ...filterPop,
                    age: val,
                  })
                }
                groupProps={{
                  w: "max-content",
                }}
              />
            </Flex>
          </Flex>
          <DecoCardBg />
        </Flex>
      ) : openIdx === 2 ? (
        <Flex
          pos="absolute"
          bottom={
            divRef?.current
              ? `calc(${divRef.current.clientHeight}px + 0.25rem)`
              : "5.25rem"
          }
          left="50%"
          transform="translateX(-50%)"
          p="1.125rem 1.375rem 1rem"
          w="29.5rem"
          display={openIdx === 2 ? "flex" : "none"}
          direction="column"
          justify="center"
          border="1px solid #BFBFBF"
        >
          <Flex justify="space-between">
            <Flex pl="0.25rem" align="center" gap="0.5rem">
              <IcoNice2 width="1rem" height="1rem" color="font.primary" />
              <Heading as={"h5"} variant="filterBox" lineHeight={1}>
                거주인구
              </Heading>
            </Flex>
            <Flex align="center" gap="0.5rem">
              <SwitchFilter
                isDisabled={!resiPop.active}
                isChecked={resiPop.show}
                onChange={() => {
                  setResiPop({ ...resiPop, show: !resiPop.show });
                }}
              />
              <BtnFilterSearch
                onClick={() => {
                  searchResiHandler();
                }}
              />
            </Flex>
          </Flex>
          <Deco01 margin="0.25rem 0 0.75rem" width="100%" height="0.3125rem" />
          <Flex p="0 0.25rem" direction="column" gap="0.625rem">
            <Flex align="center">
              <FormLabel
                display="flex"
                alignItems="center"
                flex="none"
                m="0"
                w="2.8rem"
                textStyle="base"
                fontSize="xs"
                fontWeight="strong"
                color="font.secondary"
              >
                성별
              </FormLabel>
              <CheckboxGroup
                chkboxData={[
                  { text: "남자", value: "man" },
                  { text: "여자", value: "woman" },
                ]}
                chkValue={filterResi?.gender}
                activeTotal={true}
                onChange={(val: any) =>
                  setFilterResi({
                    ...filterResi,
                    gender: val,
                  })
                }
                groupProps={{
                  w: "max-content",
                }}
              />
            </Flex>
            <Flex align="center">
              <FormLabel
                display="flex"
                alignItems="center"
                flex="none"
                m="0"
                w="2.8rem"
                textStyle="base"
                fontSize="xs"
                fontWeight="strong"
                color="font.secondary"
              >
                나이대
              </FormLabel>
              <CheckboxGroup
                chkboxData={[
                  { text: "20대", value: "gen20" },
                  { text: "30대", value: "gen30" },
                  { text: "40대", value: "gen40" },
                  { text: "50대", value: "gen50" },
                  { text: "60대 이상", value: "gen60" },
                ]}
                chkValue={filterResi?.age}
                activeTotal={true}
                onChange={(val: any) =>
                  setFilterResi({
                    ...filterResi,
                    age: val,
                  })
                }
                groupProps={{
                  w: "max-content",
                }}
              />
            </Flex>
          </Flex>
          <DecoCardBg />
        </Flex>
      ) : openIdx === 3 ? (
        <Flex
          pos="absolute"
          bottom={
            divRef?.current
              ? `calc(${divRef.current.clientHeight}px + 0.25rem)`
              : "5.25rem"
          }
          left="50%"
          transform="translateX(-50%)"
          p="1.125rem 1.375rem 1rem"
          w="29.5rem"
          display={openIdx === 3 ? "flex" : "none"}
          direction="column"
          justify="center"
          border="1px solid #BFBFBF"
        >
          <Flex justify="space-between">
            <Flex pl="0.25rem" align="center" gap="0.5rem">
              <IcoNice3 width="1rem" height="1rem" color="font.primary" />
              <Heading as={"h5"} variant="filterBox">
                직장인구
              </Heading>
            </Flex>
            <Flex align="center" gap="0.5rem">
              <SwitchFilter
                isDisabled={!jobPop.active}
                isChecked={jobPop.show}
                onChange={() => {
                  setJobPop({ ...jobPop, show: !jobPop.show });
                }}
              />
              <BtnFilterSearch
                onClick={() => {
                  searchJobHandler();
                }}
              />
            </Flex>
          </Flex>
          {/* ============================== 박스 데코 ============================== */}
          <Deco01 margin="0.25rem 0 0.75rem" width="100%" height="0.3125rem" />
          <Flex p="0 0.25rem" direction="column" gap="0.625rem">
            <Flex align="center">
              <FormLabel
                display="flex"
                alignItems="center"
                flex="none"
                m="0"
                w="2.8rem"
                textStyle="base"
                fontSize="xs"
                fontWeight="strong"
                color="font.secondary"
              >
                성별
              </FormLabel>
              <CheckboxGroup
                chkboxData={[
                  { text: "남자", value: "man" },
                  { text: "여자", value: "woman" },
                ]}
                chkValue={filterJob?.gender}
                activeTotal={true}
                onChange={(val: any) =>
                  setFilterJob({
                    ...filterJob,
                    gender: val,
                  })
                }
                groupProps={{
                  w: "max-content",
                }}
              />
            </Flex>
            <Flex align="center">
              <FormLabel
                display="flex"
                alignItems="center"
                flex="none"
                m="0"
                w="2.8rem"
                textStyle="base"
                fontSize="xs"
                fontWeight="strong"
                color="font.secondary"
              >
                나이대
              </FormLabel>
              <CheckboxGroup
                chkboxData={[
                  { text: "20대", value: "gen20" },
                  { text: "30대", value: "gen30" },
                  { text: "40대", value: "gen40" },
                  { text: "50대", value: "gen50" },
                  { text: "60대 이상", value: "gen60" },
                ]}
                chkValue={filterJob?.age}
                activeTotal={true}
                onChange={(val: any) =>
                  setFilterJob({
                    ...filterJob,
                    age: val,
                  })
                }
                groupProps={{
                  w: "max-content",
                }}
              />
            </Flex>
          </Flex>
          <DecoCardBg />
        </Flex>
      ) : openIdx === 4 ? (
        <Flex
          pos="absolute"
          bottom={
            divRef?.current
              ? `calc(${divRef.current.clientHeight}px + 0.25rem)`
              : "5.25rem"
          }
          left="50%"
          transform="translateX(-50%)"
          p="1.125rem 1.375rem 1rem"
          w="29.5rem"
          display={openIdx === 4 ? "flex" : "none"}
          direction="column"
          justify="center"
          border="1px solid #BFBFBF"
        >
          <Flex justify="space-between">
            <Flex pl="0.25rem" align="center" gap="0.5rem">
              <IcoResident
                width="0.875rem"
                height="0.875rem"
                color="font.title"
              />
              <Heading as={"h5"} variant="filterBox" lineHeight="normal">
                세대수
              </Heading>
            </Flex>
            <Flex align="center" gap="0.5rem">
              <SwitchFilter
                isDisabled={!household.active}
                isChecked={household?.show}
                onChange={() => {
                  setHouse({ ...household, show: !household?.show });
                }}
              />
              <BtnFilterSearch
                onClick={() => {
                  searchHouseHandler();
                }}
              />
            </Flex>
          </Flex>
          {/* ============================== 박스 데코 ============================== */}
          <Deco01 margin="0.25rem 0 0.75rem" width="100%" height="0.3125rem" />
          <Flex justify="space-between">
            <Flex pl="0.25rem" align="center" gap="0.5rem">
              <IcoWorkspace
                width="0.875rem"
                height="0.875rem"
                color="font.title"
              />
              <Heading as={"h5"} variant="filterBox">
                업소수
              </Heading>
            </Flex>
            <Tooltip
              hasArrow
              isDisabled={bot.code ? true : false}
              placement="auto"
              label="업종을 선택하셔야 합니다."
              p="1rem"
              borderRadius="base"
            >
              <Flex align="center" gap="0.5rem">
                <SwitchFilter
                  isDisabled={!upjongCnt.active || (bot.code ? false : true)}
                  isChecked={upjongCnt?.show}
                  onChange={() => {
                    setUpjong({ ...upjongCnt, show: !upjongCnt?.show });
                  }}
                />
                <BtnFilterSearch
                  isDisabled={bot.code ? false : true}
                  onClick={() => {
                    searchUpjongHandler();
                  }}
                />
              </Flex>
            </Tooltip>
          </Flex>
          {/* ============================== 박스 데코 ============================== */}
          <Deco01 margin="0.25rem 0 0.75rem" width="100%" height="0.3125rem" />
          <Flex justify="space-between">
            <Flex pl="0.25rem" align="center" gap="0.5rem">
              <IcoMonitoring
                width="0.875rem"
                height="0.875rem"
                color="font.title"
              />
              <Heading as={"h5"} variant="filterBox">
                매출액
              </Heading>
            </Flex>
            <Tooltip
              hasArrow
              isDisabled={bot.code ? true : false}
              placement="auto"
              label="업종을 선택하셔야 합니다."
              p="1rem"
              borderRadius="base"
            >
              <Flex align="center" gap="0.5rem">
                <SwitchFilter
                  isDisabled={!sale.active || (bot.code ? false : true)}
                  isChecked={sale?.show}
                  onChange={() => {
                    setSale({ ...sale, show: !sale?.show });
                  }}
                />
                <BtnFilterSearch
                  isDisabled={bot.code ? false : true}
                  onClick={() => {
                    searchSaleHandler();
                  }}
                />
              </Flex>
            </Tooltip>
          </Flex>
          {/* ============================== 박스 데코 ============================== */}
          <Deco01 margin="0.25rem 0 0.75rem" width="100%" height="0.3125rem" />
          <DecoCardBg />
        </Flex>
      ) : null}
    </Flex>
  );
};

export default NiceFilter;
