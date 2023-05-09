//  Lib
import { useState, useEffect } from "react";
import {
  Divider,
  Flex,
  Heading,
  Highlight,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
//  Component
import ChartLine from "@components/charts/ChartLine";

type Props = {};

const ReportUpjong = ({ data }: any) => {
  const [label, setLabel] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [textArr, setTextArr] = useState({
    storeCnt: null,
    avgStoreOprYear: null,
    growthSalesUpjong: null,
  });

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      const list = data[i];
      if (list.storeCnt && list.avgStoreOprYear && list.growthSalesUpjong) {
        setTextArr({
          storeCnt: list.storeCnt,
          avgStoreOprYear: list.avgStoreOprYear,
          growthSalesUpjong: list.growthSalesUpjong.split(",")[0],
        });
        break;
      }
    }
    const chartLabel: string[] = [];
    const chartData: string[] = [];

    data.map((yearData: any) => {
      const key = yearData.yyyymm.slice(2, 6).replace(/(.{2})/, "$1.");
      chartLabel.push(key);
      chartData.push(yearData.storeCnt);
    });

    setLabel(chartLabel);
    setChartData(chartData);
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
          업종 요약
        </Heading>
        <Divider
          m="0.5rem 0"
          borderBottomWidth="2px"
          borderColor="neutral.gray6"
        />
        <List p="0 0.75rem" w="100%">
          {textArr?.storeCnt && (
            <ListItem w="100%" display="flex" gap="4rem">
              <Text
                w="100%"
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.75rem"
              >
                <Highlight
                  query={[`${textArr?.storeCnt || 0}개`]}
                  styles={{
                    w: "100%",
                    textStyle: "base",
                    fontSize: "sm",
                    fontWeight: "strong",
                    lineHeight: "1.75rem",
                    color: "primary.type10",
                    textDecoration: "underline",
                  }}
                >
                  {`선택 영역의 업종수는 ${textArr?.storeCnt || 0}개 입니다.`}
                </Highlight>
              </Text>
            </ListItem>
          )}
          {textArr?.avgStoreOprYear && textArr?.avgStoreOprYear > 0 && (
            <ListItem w="100%" display="flex" gap="4rem">
              <Text
                w="100%"
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.75rem"
              >
                <Highlight
                  query={[`${textArr?.avgStoreOprYear || 0}년`]}
                  styles={{
                    w: "100%",
                    textStyle: "base",
                    fontSize: "sm",
                    fontWeight: "strong",
                    lineHeight: "1.75rem",
                    color: "primary.type10",
                    textDecoration: "underline",
                  }}
                >
                  {`평균 운영 연수는 ${
                    textArr?.avgStoreOprYear || 0
                  }년 입니다.`}
                </Highlight>
              </Text>
            </ListItem>
          )}
          {textArr?.growthSalesUpjong && (
            <ListItem w="100%" display="flex" gap="4rem">
              <Text
                w="100%"
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.75rem"
              >
                <Highlight
                  query={[`${textArr?.growthSalesUpjong}`]}
                  styles={{
                    w: "100%",
                    textStyle: "base",
                    fontSize: "sm",
                    fontWeight: "strong",
                    lineHeight: "1.75rem",
                    color: "primary.type10",
                    textDecoration: "underline",
                  }}
                >
                  {`매출 성장 업종은 ${textArr?.growthSalesUpjong} 입니다.`}
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
            월별 추이
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
              단위 : 개
            </Text>
          </Flex>
        </Flex>
        <Divider
          m="0.5rem 0"
          borderBottomWidth="2px"
          borderColor="neutral.gray6"
        />
        <ChartLine
          p="0 2rem"
          height="15rem"
          options={{
            plugins: {
              title: {
                display: false,
              },
              legend: {
                display: false,
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
            elements: {
              line: {
                tension: 0.1,
                capBezierPoints: false,
              },
            },
          }}
          data={{
            labels: label,
            datasets: [
              {
                label: "업종 수",
                data: chartData,
                borderColor: "#AD8B00",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                segment: {
                  borderWidth: 1,
                  borderColor: "#AD8B00",
                },
                pointStyle: "circle",
                pointBorderWidth: 1,
                pointRadius: 3,
                pointhoverRadius: 6,
                pointBackgroundColor: "#FFFFFF",
                pointBorderColor: "#AD8B00",
              },
            ],
          }}
        />
      </Flex>
    </Flex>
  );
};

export default ReportUpjong;
