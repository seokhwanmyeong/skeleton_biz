//  Lib
import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  InputGroup,
  Button,
  Switch,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { SpinnerIcon, ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
//  API
import { getSigunguPopInfo } from "@api/niceApi/config";
import cubejsApi from "@api/cubeApi/config";
//  Components
import {
  CheckboxGroup,
  CheckboxTagGroup,
  FilterChkTagGroup,
} from "@components/common/CheckBox";
import { RadioTagGroup } from "@components/common/RadioBox";
import { Input } from "@components/common/Input";
//  State
import {
  atomSementicBaseList,
  atomInfoCom,
  selectorInfoCom,
  atomArea,
} from "@states/searchState/stateSearch";

const FilterInfoCom = (props: any) => {
  const { isDisabled } = props;
  const baseList = useRecoilValue(atomSementicBaseList);
  const infocomList = useRecoilValue(atomInfoCom);
  const setInfoCom = useSetRecoilState(selectorInfoCom);
  const { slctAreaCode, slctAreaName } = useRecoilValue(atomArea);

  return (
    <Accordion variant={"searchEngine"} allowToggle>
      <AccordionItem key={`group-data`} isDisabled={isDisabled}>
        <AccordionButton color="#ffffff">
          데이터 분석
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          backgroundColor="#ededed"
          color="#555555"
          fontSize="0.8rem"
          fontWeight="bold"
          gap="10px"
        >
          <Accordion variant={"searchEngine"} allowToggle>
            <AccordionItem key={`infoCom-floatPop`} isDisabled={isDisabled}>
              <AccordionButton color="#ffffff">
                유동인구
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                backgroundColor="#ededed"
                color="#555555"
                fontSize="0.8rem"
                fontWeight="bold"
                gap="10px"
              >
                <FilterFloatPop areaCode={slctAreaCode} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem key={`infoCom-household`} isDisabled={isDisabled}>
              <AccordionButton color="#ffffff">
                세대수
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                backgroundColor="#ededed"
                color="#555555"
                fontSize="0.8rem"
                fontWeight="bold"
                gap="10px"
              >
                <FilterHousehold areaCode={slctAreaCode} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem key={`infoCom-upjong`} isDisabled={isDisabled}>
              <AccordionButton color="#ffffff">
                업종수
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                backgroundColor="#ededed"
                color="#555555"
                fontSize="0.8rem"
                fontWeight="bold"
                gap="10px"
              >
                <FilterUpjong areaCode={slctAreaCode} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem key={`infoCom-sale`} isDisabled={isDisabled}>
              <AccordionButton color="#ffffff">
                매출
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                backgroundColor="#ededed"
                color="#555555"
                fontSize="0.8rem"
                fontWeight="bold"
                gap="10px"
              >
                <FilterSale areaCode={slctAreaCode} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem key={`infoCom-brandSet`} isDisabled={isDisabled}>
              <AccordionButton color="#ffffff">
                브랜드필터
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                backgroundColor="#ededed"
                color="#555555"
                fontSize="0.8rem"
                fontWeight="bold"
                gap="10px"
              >
                <FilterBrandSet />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem key={`infoCom-brand`} isDisabled={isDisabled}>
              <AccordionButton color="#ffffff">
                사업체조회
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                backgroundColor="#ededed"
                color="#555555"
                fontSize="0.8rem"
                fontWeight="bold"
                gap="10px"
              >
                <FilterBrand />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem key={`infoCom-building`} isDisabled={isDisabled}>
              <AccordionButton color="#ffffff">
                건물조회
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                backgroundColor="#ededed"
                color="#555555"
                fontSize="0.8rem"
                fontWeight="bold"
                gap="10px"
              >
                <FilterBuilding />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem key={`group-erp`} isDisabled={isDisabled}>
        <AccordionButton color="#ffffff">
          ERP
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          backgroundColor="#ededed"
          color="#555555"
          fontSize="0.8rem"
          fontWeight="bold"
          gap="10px"
        >
          <Accordion variant={"searchEngine"} allowToggle>
            <AccordionItem key={`infoCom-store`} isDisabled={isDisabled}>
              <AccordionButton color="#ffffff">
                매장조회
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                backgroundColor="#ededed"
                color="#555555"
                fontSize="0.8rem"
                fontWeight="bold"
                gap="10px"
              ></AccordionPanel>
            </AccordionItem>
            <AccordionItem key={`infoCom-bsns`} isDisabled={isDisabled}>
              <AccordionButton color="#ffffff">
                상권조회
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                backgroundColor="#ededed"
                color="#555555"
                fontSize="0.8rem"
                fontWeight="bold"
                gap="10px"
              ></AccordionPanel>
            </AccordionItem>
            <AccordionItem key={`infoCom-rent`} isDisabled={isDisabled}>
              <AccordionButton color="#ffffff">
                매물조회
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                backgroundColor="#ededed"
                color="#555555"
                fontSize="0.8rem"
                fontWeight="bold"
                gap="10px"
              ></AccordionPanel>
            </AccordionItem>
            <AccordionItem key={`filter-edior`} isDisabled={isDisabled}>
              <AccordionButton color="#ffffff">
                생성하기
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                backgroundColor="#ededed"
                color="#555555"
                fontSize="0.8rem"
                fontWeight="bold"
                gap="10px"
              ></AccordionPanel>
            </AccordionItem>
          </Accordion>
        </AccordionPanel>
      </AccordionItem>
      {/* {baseList.infoCom.content.map(
        (info: { title: string; cate: string; list: [] }, idx: number) => {
          const { title, cate, list } = info;

          return (
            <AccordionItem key={`infoCom-list-${cate}`} isDisabled={isDisabled}>
              <AccordionButton color="#ffffff">
                {title}
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                backgroundColor="#ededed"
                color="#555555"
                fontSize="0.8rem"
                fontWeight="bold"
                gap="10px"
              >
                {list &&
                  list.map((item: { title: string; key: string }) => {
                    const { title, key } = item;
                    return (
                      <CheckBoxTag
                        isChecked={infocomList.includes(key)}
                        isDisabled={isDisabled}
                        key={key}
                        value={key}
                        title={title}
                        onChange={() => setInfoCom(key)}
                      />
                    );
                  })}
              </AccordionPanel>
            </AccordionItem>
          );
        }
      )} */}
    </Accordion>
  );
};

const SwitchOnOff = (props: {
  size?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { size, onChange } = props;
  const [chk, setChk] = useState<boolean>(false);

  return (
    <Flex position="relative">
      <Text
        position="absolute"
        left={"5px"}
        zIndex={1}
        visibility={chk ? "visible" : "hidden"}
        fontWeight={900}
      >
        on
      </Text>
      <Text
        position="absolute"
        right={"5px"}
        zIndex={1}
        visibility={chk ? "hidden" : "visible"}
        fontWeight={900}
      >
        off
      </Text>
      <Switch
        spacing="5rem"
        size={size}
        onChange={(e) => {
          setChk(e.target.checked);
          onChange(e);
        }}
      />
    </Flex>
  );
};

const InnerText = ({
  text,
  hasUp = false,
  hasDown = false,
}: {
  text: string;
  hasUp?: boolean;
  hasDown?: boolean;
}) => {
  return (
    <Flex alignItems="center">
      <Text>{text}</Text>
      {hasUp && <ChevronUpIcon w="1.4rem" h="1.2rem" />}
      {hasDown && <ChevronDownIcon w="1.4rem" h="1.2rem" />}
    </Flex>
  );
};

const FilterFloatPop = ({ areaCode }: { areaCode: string }) => {
  const [filter, setFilter] = useState<any>({
    gender: null,
    age: null,
    popRange: {
      start: null,
      end: null,
    },
  });
  const mapViewHandler = () => {
    console.log(`\non/off view enter`);
  };
  const resetFilter = () => {
    console.log(`\nreset FloatPopulation`);
  };
  const searchHander = () => {
    console.log(`\nstart search FloatPopulation`);
    console.log(filter);

    let dimensions = [];
    filter.gender && dimensions.push(...filter.gender);
    filter.age && dimensions.push(...filter.age);

    let transFilter: any[] = [];
    (filter.popRange.start || filter.popRange.end) &&
      dimensions.push("Pop.ageT");
    filter.popRange.start &&
      transFilter.push({
        member: "Pop.ageT",
        operator: "gt",
        values: [filter.popRange.start],
      });
    filter.popRange.end &&
      transFilter.push({
        member: "Pop.ageT",
        operator: "lt",
        values: [filter.popRange.end],
      });

    if (!areaCode || (dimensions.length === 0 && transFilter.length === 0))
      return null;

    cubejsApi
      .load({
        dimensions: [...dimensions, "Pop.areaCode"],
        filters: [
          {
            member: "Pop.areaCode",
            operator: "contains",
            values: [areaCode.slice(0, 5)],
          },
          ...transFilter,
        ],
      })
      .then((res) => {
        const result = res?.rawData().map((li: any) => {
          return {
            dongCode: li["Pop.areaCode"],
            genderM: li["Pop.genderM"],
            genderW: li["Pop.genderW"],
            ageT: li["Pop.ageT"],
            age20th: li["Pop.age20th"],
            age30th: li["Pop.age30th"],
            age40th: li["Pop.age40th"],
            age50th: li["Pop.age50th"],
            age60th: li["Pop.age60th"],
          };
        });
        console.log(result);
      });
  };

  return (
    <Flex flexDirection="column" gap="2rem">
      <Flex w="100%" alignItems="center" flexDirection="row-reverse" gap="1rem">
        <SwitchOnOff
          size="lg"
          onChange={(e) => {
            if (e.target.checked) {
              mapViewHandler();
            } else {
              mapViewHandler();
            }
          }}
        />
        <IconButton
          aria-label="reset filter"
          icon={<SpinnerIcon />}
          onClick={resetFilter}
          bgColor="transparent"
          _hover={{
            color: "primary.reverse.font",
          }}
        />
      </Flex>
      <Flex flexDirection="row" w="35%">
        {/* <Text fontSize="1.6rem">성별</Text> */}
        <FilterChkTagGroup
          chkValue={filter.gender}
          chkboxData={[
            { text: "남", value: "Pop.genderM" },
            { text: "여", value: "Pop.genderW" },
          ]}
          onChange={(val) => setFilter({ ...filter, gender: val })}
          activeTotal={true}
          parseTotalTxt="전체"
        />
      </Flex>
      <Flex flexDirection="row" w="90%">
        {/* <Text fontSize="1.6rem">나이</Text> */}
        <FilterChkTagGroup
          chkValue={filter.age}
          chkboxData={[
            { text: "20대", value: "Pop.age20th" },
            { text: "30대", value: "Pop.age30th" },
            { text: "40대", value: "Pop.age40th" },
            { text: "50대", value: "Pop.age50th" },
            { text: "60대", value: "Pop.age60th" },
          ]}
          onChange={(val) => setFilter({ ...filter, age: val })}
          activeTotal={true}
          parseTotalTxt="전체"
        />
      </Flex>
      <Flex gap="1rem" alignItems="center">
        <Input
          type="number"
          onChange={(val: number) => {
            setFilter({
              ...filter,
              popRange: { start: val, end: filter.popRange.end },
            });
          }}
          placeholder="placeHolder"
          _placeholder={{ color: "gray.500" }}
          focusBorderColor="black.100"
          errorBorderColor="red.300"
          inputProps={{
            borderColor: "primary.main.bd",
          }}
        />
        <Text>~</Text>
        <Input
          type="number"
          onChange={(val: number) => {
            setFilter({
              ...filter,
              popRange: { start: filter.popRange.start, end: val },
            });
          }}
          placeholder="placeHolder"
          _placeholder={{ color: "gray.500" }}
          focusBorderColor="black.100"
          errorBorderColor="red.300"
          inputProps={{
            borderColor: "primary.main.bd",
          }}
        />
      </Flex>
      <Button onClick={searchHander}>조회</Button>
    </Flex>
  );
};

const FilterHousehold = ({ areaCode }: { areaCode: string }) => {
  const [filter, setFilter] = useState<{ hous: any }>({
    hous: "0",
  });
  const mapViewHandler = () => {
    console.log(`\non/off view enter`);
  };
  const resetFilter = () => {
    console.log(`\nreset FloatPopulation`);
  };
  const searchHander = () => {
    console.log(`\nstart search FloatPopulation`);
    console.log(filter);
    console.log(areaCode);
    //apiService(filter).then((res) => {})

    cubejsApi
      .load({
        dimensions: [
          "House.areaCode",
          "House.hous",
          "House.apt",
          "House.noe",
          "House.com",
          "House.offtel",
        ],
        filters: [
          {
            member: "House.areaCode",
            operator: "contains",
            values: [areaCode.slice(0, 5)],
          },
          {
            member: "House.hous",
            operator: "gt",
            values: [filter.hous],
          },
        ],
      })
      .then((res) => {
        const result = res?.rawData().map((li: any) => {
          return {
            dongCode: li["House.areaCode"],
            apt: li["House.apt"],
            com: li["House.com"],
            hous: li["House.hous"],
            noe: li["House.noe"],
            offtel: li["House.offtel"],
          };
        });
        console.log(result);
      });
  };

  return (
    <Flex flexDirection="column" gap="2rem">
      <Flex w="100%" alignItems="center" flexDirection="row-reverse" gap="1rem">
        <Switch
          size="lg"
          onChange={(e) => {
            if (e.target.checked) {
              mapViewHandler();
            } else {
              mapViewHandler();
            }
          }}
        />
        <IconButton
          aria-label="reset filter"
          icon={<SpinnerIcon key="test" />}
          onClick={resetFilter}
          bgColor="transparent"
          _hover={{
            color: "primary.reverse.font",
          }}
        />
      </Flex>
      <Flex flexDirection="row" w="90%">
        {/* <Text fontSize="1.6rem">나이</Text> */}
        <RadioTagGroup
          radioValue={filter.hous}
          radioData={[
            { text: <InnerText text="1천" hasUp={true} />, value: "1000" },
            { text: <InnerText text="2천" hasUp={true} />, value: "2000" },
            { text: <InnerText text="3천" hasUp={true} />, value: "3000" },
            { text: <InnerText text="4천" hasUp={true} />, value: "4000" },
            { text: <InnerText text="5천" hasUp={true} />, value: "5000" },
            { text: <InnerText text="1만" hasUp={true} />, value: "10000" },
          ]}
          onChange={(val) => setFilter({ hous: val })}
        />
      </Flex>
      <Button onClick={searchHander}>조회</Button>
    </Flex>
  );
};

const FilterUpjong = ({ areaCode }: { areaCode: string }) => {
  const [filter, setFilter] = useState<number | string>(0);
  const mapViewHandler = () => {
    console.log(`\non/off view enter`);
  };
  const resetFilter = () => {
    console.log(`\nreset FloatPopulation`);
  };
  const searchHander = () => {
    console.log(`\nstart search FloatPopulation`);
    console.log(filter);
    const countFilter: { [key: number | string]: any } = {
      0: [],
      1: [
        {
          member: "Upjong.storeCnt",
          operator: "lt",
          values: ["5"],
        },
      ],
      2: [
        {
          member: "Upjong.storeCnt",
          operator: "gt",
          values: ["6"],
        },
        {
          member: "Upjong.storeCnt",
          operator: "lt",
          values: ["10"],
        },
      ],
      3: [
        {
          member: "Upjong.storeCnt",
          operator: "gt",
          values: ["11"],
        },
        {
          member: "Upjong.storeCnt",
          operator: "lt",
          values: ["15"],
        },
      ],
      4: [
        {
          member: "Upjong.storeCnt",
          operator: "gt",
          values: ["16"],
        },
        {
          member: "Upjong.storeCnt",
          operator: "lt",
          values: ["20"],
        },
      ],
      5: [
        {
          member: "Upjong.storeCnt",
          operator: "gt",
          values: ["20"],
        },
      ],
      6: [
        {
          member: "Upjong.storeCnt",
          operator: "gt",
          values: ["50"],
        },
      ],
    };

    cubejsApi
      .load({
        dimensions: ["Upjong.storeCnt"],
        filters: [
          {
            member: "Upjong.areaCode",
            operator: "contains",
            values: [areaCode.slice(0, 5)],
          },
          ...countFilter[filter],
        ],
      })
      .then((res) => {
        const result = res?.rawData().map((li: any) => {
          return {
            dongCode: li["House.areaCode"],
            apt: li["House.apt"],
            com: li["House.com"],
            hous: li["House.hous"],
            noe: li["House.noe"],
            offtel: li["House.offtel"],
          };
        });
        console.log(result);
      });
  };

  return (
    <Flex flexDirection="column" gap="2rem">
      <Flex w="100%" alignItems="center" flexDirection="row-reverse" gap="1rem">
        <Switch
          size="lg"
          onChange={(e) => {
            if (e.target.checked) {
              mapViewHandler();
            } else {
              mapViewHandler();
            }
          }}
        />
        <IconButton
          aria-label="reset filter"
          icon={<SpinnerIcon />}
          onClick={resetFilter}
          bgColor="transparent"
          _hover={{
            color: "primary.reverse.font",
          }}
        />
      </Flex>
      <Flex flexDirection="row" w="100%">
        {/* <Text fontSize="1.6rem">나이</Text> */}
        <RadioTagGroup
          radioValue={filter}
          radioData={[
            {
              text: <InnerText text="5" hasDown={true} />,
              value: 1,
            },
            { text: <InnerText text="6 ~ 10" />, value: 2 },
            { text: <InnerText text="11 ~ 15" />, value: 3 },
            { text: <InnerText text="16 ~ 20" />, value: 4 },
            { text: <InnerText text="20" hasUp={true} />, value: 5 },
            { text: <InnerText text="50" hasUp={true} />, value: 6 },
          ]}
          onChange={(val) => setFilter(val)}
        />
      </Flex>
      <Button onClick={searchHander}>조회</Button>
    </Flex>
  );
};

const FilterSale = ({ areaCode }: { areaCode: string }) => {
  const [filter, setFilter] = useState<any>({
    minUpjong: null,
  });
  const mapViewHandler = () => {
    console.log(`\non/off view enter`);
  };
  const resetFilter = () => {
    console.log(`\nreset FloatPopulation`);
  };
  const searchHander = () => {
    console.log(`\nstart search FloatPopulation`);
    console.log(filter);
    //apiService(filter).then((res) => {})
  };

  return (
    <Flex flexDirection="column" gap="2rem">
      <Flex w="100%" alignItems="center" flexDirection="row-reverse" gap="1rem">
        <Switch
          size="lg"
          onChange={(e) => {
            if (e.target.checked) {
              mapViewHandler();
            } else {
              mapViewHandler();
            }
          }}
        />
        <IconButton
          aria-label="reset filter"
          icon={<SpinnerIcon />}
          onClick={resetFilter}
          bgColor="transparent"
          _hover={{
            color: "primary.reverse.font",
          }}
        />
      </Flex>
      <Flex flexDirection="row" w="100%">
        {/* <Text fontSize="1.6rem">나이</Text> */}
        <CheckboxTagGroup
          chkValue={filter.age}
          chkboxData={[
            { text: <InnerText text="1000만" hasUp={true} />, value: 1000 },
            { text: <InnerText text="2000만" hasUp={true} />, value: 2000 },
            { text: <InnerText text="4000만" hasUp={true} />, value: 4000 },
            { text: <InnerText text="5000만" hasUp={true} />, value: 5000 },
            { text: <InnerText text="6000만" hasUp={true} />, value: 6000 },
            { text: <InnerText text="1억" hasUp={true} />, value: 10000 },
          ]}
          onChange={(val) => setFilter({ ...filter, age: val })}
          activeTotal={false}
        />
      </Flex>
      <Button onClick={searchHander}>조회</Button>
    </Flex>
  );
};

const FilterBrand = () => {
  return <Flex>test</Flex>;
};

const FilterBrandSet = () => {
  return <Flex>test</Flex>;
};

const FilterBuilding = () => {
  return <Flex>test</Flex>;
};

const FilterStore = () => {
  return <Flex>test</Flex>;
};

const FilterBsns = () => {
  return <Flex>test</Flex>;
};

const FilterRent = () => {
  return <Flex>test</Flex>;
};

export default FilterInfoCom;
