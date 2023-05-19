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

type Props = {
  data: {
    apt?: number;
    com?: number;
    hous?: number;
    noe?: number;
    offtel?: number;
  };
};

const ReportHouse = ({ data }: Props) => {
  const [label, setLabel] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    console.log(data);
    if (data) {
      const label: any[] = [];
      const chartData = Object.values(data);

      Object.keys(data).map((key: string) => {
        if (key === "apt") {
          label.push("아파트");
        } else if (key === "hous") {
          label.push("세대수");
        } else if (key === "noe") {
          label.push("단독주택");
        } else if (key === "com") {
          label.push("복합주택");
        } else if (key === "offtel") {
          label.push("오피스텔");
        }
      });

      setLabel(label);
      setChartData(chartData);
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
          세대수 요약
        </Heading>
        <Divider
          m="0.5rem 0"
          borderBottomWidth="2px"
          borderColor="neutral.gray6"
        />
        <List p="0 0.75rem" w="100%">
          {data?.hous && (
            <ListItem w="100%" display="flex" gap="4rem">
              <Text
                w="100%"
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.75rem"
              >
                <Highlight
                  query={[`${data?.hous.toLocaleString("ko-KR")}세대`]}
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
                  {`선택 영역의 세대수는 ${data?.hous.toLocaleString(
                    "ko-KR"
                  )}세대 입니다.`}
                </Highlight>
              </Text>
            </ListItem>
          )}
          {data?.apt && (
            <ListItem w="100%" display="flex" gap="4rem">
              <Text
                w="100%"
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.75rem"
              >
                <Highlight
                  query={[`아파트 ${data?.apt.toLocaleString("ko-KR")}세대`]}
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
                  {`세대수 유형은 아파트 ${data?.apt.toLocaleString(
                    "ko-KR"
                  )}세대 입니다.`}
                </Highlight>
              </Text>
            </ListItem>
          )}
          {data?.hous && data?.apt && (
            <ListItem w="100%" display="flex" gap="4rem">
              <Text
                w="100%"
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.75rem"
              >
                <Highlight
                  query={[
                    `비아파트 ${(data?.hous - data?.apt).toLocaleString(
                      "ko-KR"
                    )}세대`,
                  ]}
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
                  {`세대수 유형은 비아파트 ${(
                    data?.hous - data?.apt
                  ).toLocaleString("ko-KR")}세대 입니다.`}
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
            세대 유형별 추이
          </Heading>
          <Flex align="center" gap="0.75rem">
            <Text
              textStyle="base"
              fontSize="0.625rem"
              fontWeight="regular"
              color="font.secondary"
              whiteSpace="nowrap"
              lineHeight="1px"
            >
              단위 : 세대
            </Text>
          </Flex>
        </Flex>
        <Divider
          m="0.5rem 0"
          borderBottomWidth="2px"
          borderColor="neutral.gray6"
        />
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
            labels: label,
            datasets: [
              {
                data: chartData,
                backgroundColor: "#36CFC9",
                barThickness: 40,
              },
            ],
          }}
        />
      </Flex>
    </Flex>
  );
};

export default ReportHouse;
