import { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Highlight,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import ChartStackBar from "@src/components/charts/ChartStackBar";

type Props = any;

const ReportResi = ({ data }: Props) => {
  const [ageMan, setAgeMan] = useState<any>(null);
  const [ageWoman, setAgeWoman] = useState<any>(null);
  const [max, setMax] = useState<any>(null);

  useEffect(() => {
    console.log(data);
    if (data) {
      const man =
        data?.housCustM10 +
        data?.housCustM20 +
        data?.housCustM30 +
        data?.housCustM40 +
        data?.housCustM50;

      const woman =
        data?.housCustW10 +
        data?.housCustW20 +
        data?.housCustW30 +
        data?.housCustW40 +
        data?.housCustW50;

      const age = {
        "10대": data?.housCustM10 + data?.housCustW10,
        "20대": data?.housCustM20 + data?.housCustW20,
        "30대": data?.housCustM30 + data?.housCustW30,
        "40대": data?.housCustM40 + data?.housCustW40,
        "50대": data?.housCustM50 + data?.housCustW50,
      };
      const ageManGroup = {
        "10대": data?.housCustM10,
        "20대": data?.housCustM20,
        "30대": data?.housCustM30,
        "40대": data?.housCustM40,
        "50대": data?.housCustM50,
      };
      const ageWomanGroup = {
        "10대": data?.housCustW10,
        "20대": data?.housCustW20,
        "30대": data?.housCustW30,
        "40대": data?.housCustW40,
        "50대": data?.housCustW50,
      };

      const ageVal = Object.values(age);
      const maxAge = Math.max.apply(null, ageVal);
      const ageIdx = ageVal.indexOf(maxAge);

      setAgeMan(ageManGroup);
      setAgeWoman(ageWomanGroup);
      setMax({
        sex: man > woman ? "남성" : "여성",
        age: Object.keys(age)[ageIdx],
      });
    }
  }, [data]);

  return (
    <Flex p="0" w="100%" h="100%" direction="column" gap="1rem">
      <Flex
        padding="1rem"
        w="100%"
        h="9.25rem"
        direction="column"
        justifyContent="flex-start"
        bgColor="rgba(255, 255, 255, 0.69)"
        boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1)"
        border="1px solid"
        borderColor="neutral.gray6"
        borderRadius="base"
      >
        <Heading
          w="100%"
          textStyle="base"
          fontWeight="strong"
          fontSize="md"
          lineHeight="1.25rem"
          color="font.primary"
        >
          주거 인구 요약
        </Heading>
        <Divider
          m="0.5rem 0"
          borderBottomWidth="2px"
          borderColor="neutral.gray6"
        />
        <List p="0 0.75rem" w="100%">
          {data?.housCustCnt && (
            <ListItem w="100%" display="flex" gap="4rem">
              <Text
                w="100%"
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.75rem"
              >
                <Highlight
                  query={[`${data.housCustCnt.toLocaleString("ko-KR")}명`]}
                  styles={{
                    w: "100%",
                    textStyle: "base",
                    fontSize: "sm",
                    fontWeight: "strong",
                    lineHeight: "1.75rem",
                    color: "primary.type10",
                    borderBottom: "1px solid",
                    borderColor: "primary.type9",
                  }}
                >
                  {max
                    ? `선택 영역의 주거 인구수는 ${data.housCustCnt.toLocaleString(
                        "ko-KR"
                      )}명 이며`
                    : `선택 영역의 주거 인구수는 ${data.housCustCnt.toLocaleString(
                        "ko-KR"
                      )}명 입니다`}
                </Highlight>
              </Text>
            </ListItem>
          )}
          {max && (
            <ListItem w="100%" display="flex" gap="4rem">
              <Text
                w="100%"
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.75rem"
              >
                <Highlight
                  query={[`${max.sex}, ${max.age}`]}
                  styles={{
                    w: "100%",
                    textStyle: "base",
                    fontSize: "sm",
                    fontWeight: "strong",
                    lineHeight: "1.75rem",
                    color: "primary.type10",
                    borderBottom: "1px solid",
                    borderColor: "primary.type9",
                  }}
                >
                  {`성별/연령별 주거 인구수는 ${max.sex ? `${max.sex}, ` : ""}${
                    max.age
                  } 입니다`}
                </Highlight>
              </Text>
            </ListItem>
          )}
        </List>
      </Flex>
      <Flex
        pos="relative"
        padding="1rem"
        w="100%"
        direction="column"
        justifyContent="center"
        bgColor="rgba(255, 255, 255, 0.69)"
        boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1)"
        border="1px solid"
        borderColor="neutral.gray6"
        borderRadius="base"
      >
        <Flex justify="space-between" align="center">
          <Heading
            w="100%"
            textStyle="base"
            fontWeight="strong"
            fontSize="md"
            lineHeight="1.25rem"
            color="font.primary"
          >
            성별 연령대 추이
          </Heading>
          <Flex align="center" gap="0.75rem">
            <Flex align="center" gap="0.25rem">
              <Box
                w="0.5rem"
                h="0.5rem"
                background="#36CFC9"
                borderRadius="2px"
              />
              <Text
                textStyle="base"
                fontSize="0.625rem"
                fontWeight="regular"
                color="font.secondary"
                whiteSpace="nowrap"
                lineHeight="1px"
              >
                남자
              </Text>
            </Flex>
            <Flex align="center" gap="0.25rem">
              <Box
                w="0.5rem"
                h="0.5rem"
                background="#FF7A45"
                borderRadius="2px"
              />
              <Text
                textStyle="base"
                fontSize="0.625rem"
                fontWeight="regular"
                color="font.secondary"
                whiteSpace="nowrap"
                lineHeight="1px"
              >
                여자
              </Text>
            </Flex>
            <Text
              textStyle="base"
              fontSize="0.625rem"
              fontWeight="regular"
              color="font.secondary"
              whiteSpace="nowrap"
              lineHeight="1px"
            >
              단위 : 명
            </Text>
          </Flex>
        </Flex>
        <Divider
          m="0.5rem 0"
          borderBottomWidth="2px"
          borderColor="neutral.gray6"
        />
        {ageMan && ageWoman && (
          <ChartStackBar
            p="0 2rem"
            height="15rem"
            options={{
              plugins: {
                title: {
                  display: false,
                  text: "성별 연령대별 추이",
                },
                legend: {
                  display: false,
                  position: "bottom" as const,
                },
              },
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  stacked: true,
                  beginAtZero: false,
                  grid: {
                    display: false,
                    drawBorder: false,
                  },
                },
                y: {
                  stacked: true,
                },
              },
            }}
            data={{
              labels: [...Object.keys(ageMan)],
              datasets: [
                {
                  label: "남자",
                  data: [...Object.values(ageMan)],
                  backgroundColor: "#36CFC9",
                  barThickness: 40,
                },
                {
                  label: "여자",
                  data: [...Object.values(ageWoman)],
                  backgroundColor: "#FF7A45",
                  barThickness: 40,
                },
              ],
            }}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default ReportResi;
