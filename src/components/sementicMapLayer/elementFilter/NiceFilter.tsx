//  Lib
import { useState, useRef, useEffect } from "react";
import {
  useRecoilState,
  useResetRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Text,
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
  infoComNiceRank,
  resetNice,
} from "@states/sementicMap/stateFilter";
//  Api
import { apiMapNice } from "@api/bizSub/config";
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
  const setRank = useSetRecoilState(infoComNiceRank);
  const [flowPop, setFlowPop] = useRecoilState(infoComFloatPop);
  const [resiPop, setResiPop] = useRecoilState(infoComResiPop);
  const [jobPop, setJobPop] = useRecoilState(infoComJobPop);
  const [household, setHouse] = useRecoilState(infoComHousehold);
  const [upjongCnt, setUpjong] = useRecoilState(infoComUpjongCnt);
  const [sale, setSale] = useRecoilState(infoComSale);
  const [filterPop, setFilterPop] = useState(flowPop.filter);
  const [filterResi, setFilterResi] = useState(resiPop.filter);
  const [filterJob, setFilterJob] = useState(jobPop.filter);
  const reset = useResetRecoilState(resetNice);

  const transFilter = (props: {
    type: "hous" | "inflow" | "job";
    sex: ("male" | "female")[];
    age:
      | ("10s" | "20s" | "30s" | "40s" | "50s")[]
      | ("20s" | "30s" | "40s" | "50s" | "60s")[];
  }) => {
    const { type, sex, age } = props;
    let filter: any = {};

    if (sex.length === 2 && age.length === 5) {
      filter[`${type}CustCnt`] = {};
    } else if (sex.length === 2 && age.length !== 5) {
      filter[`${type}CustAgeCnt`] = { ageGroups: age };
    } else if (sex.length !== 2 && age.length === 5) {
      filter[`${type}CustSexCnt`] = { sex: sex[0] };
    } else {
      let arr: any = [];

      sex.map((gender) => {
        let tmp = age.map((unit) => ({
          sex: gender,
          ageGroup: unit,
        }));

        arr = [...arr, ...tmp];
      });

      filter[`${type}CustSexAgeCnt`] = {
        sexAgeGroups: arr,
      };
    }

    return filter;
  };

  const searchHandler = (
    cate?: "flow" | "resi" | "job" | "house" | "upjong" | "sale"
  ) => {
    if (areaCode) {
      if ((cate === "upjong" || cate === "sale") && !bot?.code) return;

      let filter: any = {
        upjongCd: bot.code || "D11002",
        ctyCd: areaCode,
        options: null,
      };

      if (flowPop.active)
        filter.options = {
          ...filter.options,
          ...transFilter({ type: "inflow", ...filterPop }),
        };
      if (resiPop.active)
        filter.options = {
          ...filter.options,
          ...transFilter({ type: "hous", ...filterResi }),
        };
      if (jobPop.active)
        filter.options = {
          ...filter.options,
          ...transFilter({ type: "job", ...filterJob }),
        };
      if (sale.active)
        filter.options = {
          ...filter.options,
          admiSaleAmt: {},
        };
      if (upjongCnt.active)
        filter.options = {
          ...filter.options,
          storeCnt: {},
        };
      if (household.active)
        filter.options = {
          ...filter.options,
          housCnt: {},
        };

      switch (cate) {
        case "flow":
          filter.options = {
            ...filter.options,
            ...transFilter({ type: "inflow", ...filterPop }),
          };
          setFlowPop({ filter: filterPop, show: true, active: true });
          break;
        case "resi":
          filter.options = {
            ...filter.options,
            ...transFilter({ type: "hous", ...filterResi }),
          };
          setResiPop({ filter: filterResi, show: true, active: true });
          break;
        case "job":
          filter.options = {
            ...filter.options,
            ...transFilter({ type: "job", ...filterJob }),
          };
          setJobPop({ filter: filterJob, show: true, active: true });
          break;
        case "house":
          filter.options = {
            ...filter.options,
            housCnt: {},
          };
          setHouse({ show: true, active: true });
          break;
        case "upjong":
          filter.options = {
            ...filter.options,
            storeCnt: {},
          };
          setUpjong({ show: true, active: true });
          break;
        case "sale":
          filter.options = {
            ...filter.options,
            admiSaleAmt: {},
          };
          setSale({ show: true, active: true });
          break;
        default:
          break;
      }

      getSigunguRank(filter).then((res: any) => {
        if (res?.data?.rank && res?.data?.rank.length > 0) {
          setRank(res?.data?.rank);
        }
      });
    }
  };

  useEffect(() => {
    if (
      bot.code &&
      (flowPop.active ||
        resiPop.active ||
        jobPop.active ||
        sale.active ||
        upjongCnt.active ||
        household.active)
    ) {
      if (areaCode) {
        let filter: any = {
          upjongCd: bot.code || "D11002",
          ctyCd: areaCode,
          options: null,
        };

        if (flowPop.active)
          filter.options = {
            ...filter.options,
            ...transFilter({ type: "inflow", ...filterPop }),
          };
        if (resiPop.active)
          filter.options = {
            ...filter.options,
            ...transFilter({ type: "hous", ...filterResi }),
          };
        if (jobPop.active)
          filter.options = {
            ...filter.options,
            ...transFilter({ type: "job", ...filterJob }),
          };
        if (sale.active)
          filter.options = {
            ...filter.options,
            admiSaleAmt: {},
          };
        if (upjongCnt.active)
          filter.options = {
            ...filter.options,
            storeCnt: {},
          };
        if (household.active)
          filter.options = {
            ...filter.options,
            housCnt: {},
          };

        getSigunguRank(filter).then((res: any) => {
          if (res?.data?.rank && res?.data?.rank.length > 0) {
            setRank(res?.data?.rank);
          }
        });
      }
    }
  }, [bot.code]);

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
          setFilterPop({
            sex: ["male", "female"],
            age: ["20s", "30s", "40s", "50s", "60s"],
          });
          setFilterResi({
            sex: ["male", "female"],
            age: ["20s", "30s", "40s", "50s", "60s"],
          });
          setFilterJob({
            sex: ["male", "female"],
            age: ["20s", "30s", "40s", "50s", "60s"],
          });
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
              <BtnFilterSearch onClick={() => searchHandler("flow")} />
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
                  { text: "남자", value: "male" },
                  { text: "여자", value: "female" },
                ]}
                chkValue={filterPop?.sex}
                activeTotal={true}
                onChange={(val: any) =>
                  setFilterPop({
                    ...filterPop,
                    sex: val,
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
                  { text: "20대", value: "10s" },
                  { text: "30대", value: "20s" },
                  { text: "40대", value: "30s" },
                  { text: "50대", value: "40s" },
                  { text: "60대 이상", value: "50s" },
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
              <IcoNice2
                width="1.125rem"
                height="1.125rem"
                color="font.primary"
              />
              <Heading as={"h5"} variant="filterBox">
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
              <BtnFilterSearch onClick={() => searchHandler("resi")} />
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
                  { text: "남자", value: "male" },
                  { text: "여자", value: "female" },
                ]}
                chkValue={filterResi?.sex}
                activeTotal={true}
                onChange={(val: any) =>
                  setFilterResi({
                    ...filterResi,
                    sex: val,
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
                  { text: "20대", value: "20s" },
                  { text: "30대", value: "30s" },
                  { text: "40대", value: "40s" },
                  { text: "50대", value: "50s" },
                  { text: "60대 이상", value: "60s" },
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
              <BtnFilterSearch onClick={() => searchHandler("job")} />
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
                  { text: "남자", value: "male" },
                  { text: "여자", value: "female" },
                ]}
                chkValue={filterJob?.sex}
                activeTotal={true}
                onChange={(val: any) =>
                  setFilterJob({
                    ...filterJob,
                    sex: val,
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
                  { text: "20대", value: "20s" },
                  { text: "30대", value: "30s" },
                  { text: "40대", value: "40s" },
                  { text: "50대", value: "50s" },
                  { text: "60대 이상", value: "60s" },
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
              <BtnFilterSearch onClick={() => searchHandler("house")} />
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
            {!bot?.code && (
              <Text
                fontFamily="main"
                fontSize="xs"
                fontWeight="strong"
                lineHeight="1.5rem"
                color="system.accessible.red"
              >
                · 업종을 선택해주세요.
              </Text>
            )}
            <Tooltip
              hasArrow
              isDisabled={bot.code ? true : false}
              placement="auto"
              label="업종을 선택하셔야 합니다."
              p="0.5rem 0.75rem"
              bgColor="#595959d9"
              border="1px solid"
              borderColor="neutral.gray6"
              borderRadius="base"
              textStyle="base"
              fontSize="xs"
              fontWeight="strong"
              color="font.inverse"
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
                  onClick={() => searchHandler("upjong")}
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
            {!bot?.code && (
              <Text
                fontFamily="main"
                fontSize="xs"
                fontWeight="strong"
                lineHeight="1.5rem"
                color="system.accessible.red"
              >
                · 업종을 선택해주세요.
              </Text>
            )}
            <Tooltip
              hasArrow
              isDisabled={bot.code ? true : false}
              placement="auto"
              label="업종을 선택하셔야 합니다."
              p="0.5rem 0.75rem"
              bgColor="#595959d9"
              border="1px solid"
              borderColor="neutral.gray6"
              borderRadius="base"
              textStyle="base"
              fontSize="xs"
              fontWeight="strong"
              color="font.inverse"
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
                  onClick={() => searchHandler("sale")}
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
