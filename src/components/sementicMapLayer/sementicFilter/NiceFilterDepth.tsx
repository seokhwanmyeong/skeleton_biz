//  Lib
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Switch,
} from "@chakra-ui/react";
//  Component
import { CheckboxGroup } from "@components/common/CheckBox";
//  Icon
import { Deco01 } from "@assets/deco/DecoSvg";
import {
  IcoBank,
  IcoMy,
  IcoNice1,
  IcoNice2,
  IcoNice3,
  IcoNice5,
} from "@assets/icons/icon";
//  State
import {
  infoComFlowDepth,
  infoComBrand,
  infoComJobPop,
  infoComBuilding,
  resetNiceDepth,
  atomUpjongState,
} from "@states/sementicMap/filterState";

type Props = {
  areaCode?: string;
  path?: any;
};

const NiceFilterDepth = ({ areaCode, path }: Props) => {
  const [openIdx, setOpenIdx] = useState(0);
  const { bot } = useRecoilValue(atomUpjongState);
  const [flowPop, setFlowPop] = useRecoilState(infoComFlowDepth);
  const resetFlow = useResetRecoilState(infoComFlowDepth);
  const [brandFilter, setBrandFilter] = useRecoilState(infoComBrand);
  const [brandList, setBrandList] = useState<any>([]);
  const resetBrandFilter = useResetRecoilState(infoComBrand);

  const [jobPop, setJobPop] = useRecoilState(infoComJobPop);
  const resetJobop = useResetRecoilState(infoComJobPop);
  const reset = useResetRecoilState(resetNiceDepth);

  useEffect(() => {
    console.log(areaCode);
  }, []);

  //  세부 유동인구 필터 변화 및 액티브
  useEffect(() => {
    if (flowPop.filter.gender.length !== 0 || flowPop.filter.age.length !== 0) {
      setFlowPop({
        ...flowPop,
        active: true,
        data: {
          inflowCustCnt: 631067,
          inflowCustSexCnt: [287208, 343914],
          inflowCustAgeCnt: [101220, 105396, 132929, 120468, 171109],
        },
      });
    } else {
      resetFlow();
    }
  }, [flowPop.filter]);

  //  사업체 필터 변화 및 액티브
  useEffect(() => {
    if (bot) {
      setBrandList([
        { text: "스타벅스", value: "스타벅스" },
        { text: "메가커피", value: "메가커피" },
        { text: "컴포즈커피", value: "컴포즈커피" },
      ]);
    }
  }, [bot]);

  useEffect(() => {
    if (brandFilter.filter.brand.length !== 0) {
      setBrandFilter({
        ...brandFilter,
        active: true,
        data: {
          jobCustCnt: 9333,
          jobCustSexCnt: [5271, 4062],
          jobCustAgeCnt: [214, 1323, 2745, 2227, 1614],
        },
      });
    } else {
      resetBrandFilter();
    }
  }, [brandFilter.filter]);

  //  건물조회 필터 변화 및 액티브
  useEffect(() => {
    if (jobPop.filter.gender.length !== 0 || jobPop.filter.age.length !== 0) {
      setJobPop({
        ...jobPop,
        active: true,
        data: {
          housCustcnt: 12311,
          housCustSexCnt: [5037, 6036],
          housCustAgeCnt: [1132, 1487, 1543, 2075, 1888],
        },
      });
    } else {
      resetJobop();
    }
  }, [jobPop.filter]);

  return (
    <Flex
      pos="absolute"
      bottom="calc(1% + 4.5rem)"
      left="50%"
      zIndex={999}
      transform="translateX(-50%)"
      gap="1.25rem"
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
      </Button>
      <Button
        variant="filterTop02"
        isDisabled={bot ? false : true}
        isActive={brandFilter.active}
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
      </Button>
      <Button
        variant="filterTop02"
        onClick={() => {
          setOpenIdx(0);
          reset();
        }}
      >
        <Box>
          <IcoNice5 color="#262323cc" />
        </Box>
      </Button>
      {/* ============================== infoCom의 필터 박스 ============================== */}
      {openIdx === 1 ? (
        <Flex
          pos="absolute"
          bottom="4rem"
          left="50%"
          transform="translateX(-50%)"
          p="1.125rem 0.6875rem 1.4375rem"
          display={openIdx === 1 ? "flex" : "none"}
          direction="column"
          justify="center"
          border="1px solid #BFBFBF"
          w="29.5rem"
        >
          <Flex justify="space-between">
            <Flex align="center">
              <Heading
                as={"h5"}
                p="0 0.5rem"
                w="max-content"
                fontSize="md"
                lineHeight="1.5rem"
                color="font.title"
                textAlign="left"
                bg="none"
              >
                유동인구
              </Heading>
              <IcoMy />
            </Flex>
            <Switch
              isChecked={flowPop.active}
              onChange={() => {
                setFlowPop({ ...flowPop, active: !flowPop.active });
              }}
              variant="filterControl"
              spacing="5rem"
            />
          </Flex>
          {/* ============================== 박스 데코 ============================== */}
          <Deco01 margin="0.3rem 0 1.375rem" width="100%" height="4px" />
          <Flex direction="column" gap="0.75rem">
            <Flex align="center">
              <FormLabel
                display="flex"
                alignItems="center"
                flex="none"
                m="0"
                w="2.8rem"
                fontSize="xs"
                fontWeight="strong"
              >
                성별
              </FormLabel>
              <CheckboxGroup
                chkboxData={[
                  { text: "남자", value: "man" },
                  { text: "여자", value: "woman" },
                ]}
                chkValue={flowPop.filter.gender}
                activeTotal={true}
                onChange={(val: any) =>
                  // setInitPop({ ...initFlowPop, gender: val })
                  setFlowPop({
                    ...flowPop,
                    filter: { ...flowPop.filter, gender: val },
                  })
                }
                groupProps={{
                  w: "max-content",
                  gap: "1.875rem",
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
                fontSize="xs"
                fontWeight="strong"
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
                chkValue={flowPop.filter.age}
                activeTotal={true}
                onChange={(val: any) =>
                  // setInitPop({ ...initFlowPop, age: val })
                  setFlowPop({
                    ...flowPop,
                    filter: { ...flowPop.filter, age: val },
                  })
                }
                groupProps={{
                  w: "max-content",
                }}
              />
            </Flex>
          </Flex>
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
      ) : openIdx === 2 ? (
        <Flex
          pos="absolute"
          bottom="4rem"
          left="50%"
          transform="translateX(-50%)"
          p="1.125rem 0.6875rem 1.4375rem"
          display={openIdx === 2 ? "flex" : "none"}
          direction="column"
          justify="center"
          border="1px solid #BFBFBF"
          w="29.5rem"
        >
          <Flex justify="space-between">
            <Flex align="center">
              <Heading
                as={"h5"}
                p="0 0.5rem"
                w="max-content"
                fontSize="md"
                lineHeight="1.5rem"
                color="font.title"
                textAlign="left"
                bg="none"
              >
                사업체 조회
              </Heading>
              <IcoMy />
            </Flex>
            <Switch
              isChecked={brandFilter.active}
              onChange={() => {
                setBrandFilter({ ...brandFilter, active: !brandFilter.active });
              }}
              variant="filterControl"
              spacing="5rem"
            />
          </Flex>
          {/* ============================== 박스 데코 ============================== */}
          <Deco01 margin="0.3rem 0 1.375rem" width="100%" height="4px" />
          <Flex direction="column" gap="0.75rem">
            <Flex align="center">
              <FormLabel
                display="flex"
                alignItems="center"
                flex="none"
                m="0"
                w="6rem"
                fontSize="xs"
                fontWeight="strong"
              >
                사업체 목록
              </FormLabel>
              <CheckboxGroup
                chkboxData={brandList}
                chkValue={brandFilter.filter.brand}
                activeTotal={true}
                onChange={(val: any) =>
                  // setInitPop({ ...initFlowPop, age: val })
                  setBrandFilter({
                    ...brandFilter,
                    filter: { ...brandFilter.filter, brand: val },
                  })
                }
                groupProps={{
                  w: "max-content",
                }}
              />
            </Flex>
          </Flex>
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
      ) : openIdx === 3 ? (
        <Flex
          pos="absolute"
          bottom="4rem"
          left="50%"
          transform="translateX(-50%)"
          p="1.125rem 0.6875rem 1.4375rem"
          display={openIdx === 3 ? "flex" : "none"}
          direction="column"
          justify="center"
          border="1px solid #BFBFBF"
          w="29.5rem"
        >
          <Flex justify="space-between">
            <Flex align="center">
              <Heading
                as={"h5"}
                p="0 0.5rem"
                w="max-content"
                fontSize="md"
                lineHeight="1.5rem"
                color="font.title"
                textAlign="left"
                bg="none"
              >
                건물조회
              </Heading>
              <IcoBank />
            </Flex>
            <Switch
              isChecked={jobPop.active}
              onChange={() => {
                setJobPop({ ...jobPop, active: !jobPop.active });
              }}
              variant="filterControl"
              spacing="5rem"
            />
          </Flex>
          {/* ============================== 박스 데코 ============================== */}
          <Deco01 margin="0.3rem 0 1.375rem" width="100%" height="4px" />
          <Flex direction="column" gap="0.75rem">
            <Flex align="center">
              <FormLabel
                display="flex"
                alignItems="center"
                flex="none"
                m="0"
                w="2.8rem"
                fontSize="xs"
                fontWeight="strong"
              >
                성별
              </FormLabel>
              <CheckboxGroup
                chkboxData={[
                  { text: "남자", value: "man" },
                  { text: "여자", value: "woman" },
                ]}
                chkValue={jobPop.filter.gender}
                activeTotal={true}
                onChange={(val: any) =>
                  setJobPop({
                    ...jobPop,
                    filter: { ...jobPop.filter, gender: val },
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
                fontSize="xs"
                fontWeight="strong"
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
                chkValue={jobPop.filter.age}
                activeTotal={true}
                onChange={(val: any) =>
                  // setInitPop({ ...initFlowPop, age: val })
                  setJobPop({
                    ...jobPop,
                    filter: { ...jobPop.filter, age: val },
                  })
                }
                groupProps={{
                  w: "max-content",
                }}
              />
            </Flex>
          </Flex>
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
      ) : null}
    </Flex>
  );
};

export default NiceFilterDepth;
