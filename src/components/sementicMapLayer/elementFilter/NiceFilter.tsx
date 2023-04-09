//  Lib
import { useState, useRef, useEffect } from "react";
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
import DecoCardBg from "@components/sementicMapLayer/elementDeco/DecoCardBg";
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
//  Icon
import { Deco01 } from "@assets/deco/DecoSvg";
import {
  IcoAppStore,
  IcoBank,
  IcoMy,
  IcoNice1,
  IcoNice2,
  IcoNice3,
  IcoNice4,
  IcoResident,
  IcoSync,
} from "@assets/icons/icon";
import { getSigunguPopInfo } from "@src/api/niceApi/config";

type Props = {
  areaCode: string;
};

const NiceFilter = ({ areaCode }: Props) => {
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
  const [filterHouse, setFilterHouse] = useState(household.filter);
  const [upjongCnt, setUpjong] = useRecoilState(infoComUpjongCnt);
  const [filterUpjong, setFilterUpjong] = useState(upjongCnt.filter);
  const [sale, setSale] = useRecoilState(infoComSale);
  const [filterSale, setFilterSale] = useState(sale.filter);
  const reset = useResetRecoilState(resetNice);
  const [niceD, setNiceD] = useState<any[]>([]);

  //  유동인구 필터 변화 및 액티브
  const searchPopHandler = () => {
    setFlowPop(filterPop);
  };

  //  거주인구 필터 변화 및 액티브
  const searchResiHandler = () => {
    setResiPop(filterResi);
  };

  //  직장인구 필터 변화 및 액티브
  const searchJobHandler = () => {
    setJobPop(filterJob);
  };

  //  세대수 필터 변화 및 액티브
  const searchHouseHandler = () => {
    setHouse(filterHouse);
  };

  //  매출액 필터 변화 및 액티브
  const searchSaleHandler = () => {
    setSale(filterSale);
  };

  //  업종수 필터 변화 및 액티브
  const searchUpjongHandler = () => {
    setUpjong(filterUpjong);
  };

  useEffect(() => {
    if (niceD.length === 0) {
      getSigunguPopInfo({ upjongCode: bot, sigunguCode: areaCode }).then(
        (res: any) => {
          console.log(res);

          if (res.result === "success") {
            console.log(res.data);

            setNiceD(res.data);
          }
        }
      );
    }
  }, []);

  return (
    <Flex
      ref={divRef}
      pos="absolute"
      bottom="5.25rem"
      left="50%"
      zIndex={999}
      transform="translateX(-50%)"
      p="0.5rem 0"
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
        isActive={flowPop.active}
        onClick={() => {
          if (openIdx === 1) {
            setOpenIdx(0);
          } else {
            setOpenIdx(1);
          }
        }}
      >
        <Box>
          <IcoNice1 color="#262323cc" />
        </Box>
        유동인구
      </Button>
      <Button
        variant="filterTop02"
        isActive={resiPop.active}
        onClick={() => {
          if (openIdx === 2) {
            setOpenIdx(0);
          } else {
            setOpenIdx(2);
          }
        }}
      >
        <Box>
          <IcoNice2 color="#262323cc" />
        </Box>
        거주인구
      </Button>
      <Button
        variant="filterTop02"
        isActive={jobPop.active}
        onClick={() => {
          if (openIdx === 3) {
            setOpenIdx(0);
          } else {
            setOpenIdx(3);
          }
        }}
      >
        <Box>
          <IcoNice3 color="#262323cc" />
        </Box>
        직장인구
      </Button>
      <Button
        variant="filterTop02"
        isActive={household.active || sale.active || upjongCnt.active}
        onClick={() => {
          if (openIdx === 4) {
            setOpenIdx(0);
          } else {
            setOpenIdx(4);
          }
        }}
      >
        <Box>
          <IcoNice4 color="#262323cc" />
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
          <IcoSync width="1.125rem" height="1.125rem" color="font.primary" />
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
            <Flex pl="0.25rem" align="center" gap="1rem">
              <Heading as={"h5"} variant="filterBox">
                유동인구
              </Heading>
              <IcoMy width="0.875rem" height="0.875rem" color="font.title" />
            </Flex>
            <Flex align="center" gap="0.5rem">
              <SwitchFilter
                isChecked={flowPop.active}
                onChange={() => {
                  setFlowPop({ ...flowPop, active: !flowPop.active });
                }}
              />
              <BtnFilterSearch onClick={searchPopHandler} />
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
            <Flex pl="0.25rem" align="center" gap="1rem">
              <Heading as={"h5"} variant="filterBox">
                거주인구
              </Heading>
              <IcoNice2 width="0.875rem" height="0.875rem" color="font.title" />
            </Flex>
            <Flex align="center" gap="0.5rem">
              <SwitchFilter
                isChecked={resiPop.active}
                onChange={() => {
                  setResiPop({ ...resiPop, active: !resiPop.active });
                }}
              />
              <BtnFilterSearch onClick={searchResiHandler} />
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
            <Flex pl="0.25rem" align="center" gap="1rem">
              <Heading as={"h5"} variant="filterBox">
                직장인구
              </Heading>
              <IcoNice3 width="0.875rem" height="0.875rem" color="font.title" />
            </Flex>
            <Flex align="center" gap="0.5rem">
              <SwitchFilter
                isChecked={jobPop.active}
                onChange={() => {
                  setJobPop({ ...jobPop, active: !jobPop.active });
                }}
              />
              <BtnFilterSearch onClick={searchPopHandler} />
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
                chkValue={filterJob?.filter?.age}
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
            <Flex pl="0.25rem" align="center" gap="1rem">
              <Heading as={"h5"} variant="filterBox">
                세대수
              </Heading>
              <IcoResident
                width="0.875rem"
                height="0.875rem"
                color="font.title"
              />
            </Flex>
            <Flex align="center" gap="0.5rem">
              <SwitchFilter
                isChecked={household?.active}
                onChange={() => {
                  setHouse({ ...household, active: !household?.active });
                }}
              />
              <BtnFilterSearch onClick={searchPopHandler} />
            </Flex>
          </Flex>
          {/* ============================== 박스 데코 ============================== */}
          <Deco01 margin="0.25rem 0 0.75rem" width="100%" height="0.3125rem" />
          <Flex justify="space-between">
            <Flex pl="0.25rem" align="center" gap="1rem">
              <Heading as={"h5"} variant="filterBox">
                매출액
              </Heading>
              <IcoBank width="0.875rem" height="0.875rem" color="font.title" />
            </Flex>
            <Tooltip
              hasArrow
              isDisabled={bot ? true : false}
              placement="auto"
              label="업종을 선택하셔야 합니다."
              p="1rem"
              borderRadius="base"
            >
              <Flex align="center" gap="0.5rem">
                <SwitchFilter
                  isDisabled={bot ? false : true}
                  isChecked={filterSale?.active}
                  onChange={() => {
                    setSale({ ...filterSale, active: !filterSale?.active });
                  }}
                />
                <BtnFilterSearch
                  isDisabled={bot ? false : true}
                  onClick={searchPopHandler}
                />
              </Flex>
            </Tooltip>
          </Flex>
          {/* ============================== 박스 데코 ============================== */}
          <Deco01 margin="0.25rem 0 0.75rem" width="100%" height="0.3125rem" />
          <Flex justify="space-between">
            <Flex pl="0.25rem" align="center" gap="1rem">
              <Heading as={"h5"} variant="filterBox">
                업종수
              </Heading>
              <IcoAppStore
                width="0.875rem"
                height="0.875rem"
                color="font.title"
              />
            </Flex>
            <Tooltip
              hasArrow
              isDisabled={bot ? true : false}
              placement="auto"
              label="업종을 선택하셔야 합니다."
              p="1rem"
              borderRadius="base"
            >
              <Flex align="center" gap="0.5rem">
                <SwitchFilter
                  isDisabled={bot ? false : true}
                  isChecked={upjongCnt?.active}
                  onChange={() => {
                    setUpjong({ ...upjongCnt, active: !upjongCnt?.active });
                  }}
                />
                <BtnFilterSearch
                  isDisabled={bot ? false : true}
                  onClick={searchPopHandler}
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
