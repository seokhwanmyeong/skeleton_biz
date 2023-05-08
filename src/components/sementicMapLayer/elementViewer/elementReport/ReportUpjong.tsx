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
import ChartLine from "@components/charts/ChartLine";

type Props = {};

const ReportUpjong = (props: Props) => {
  return (
    <Flex p="0" w="34.25rem" h="100%" direction="column" gap="1rem">
      <Flex
        padding="1rem"
        w="100%"
        h="9.25rem"
        direction="column"
        justifyContent="flex-start"
        bgColor="rgba(255, 255, 255, 0.69)"
        boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1)"
        border="1px solid"
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
          <ListItem w="100%" display="flex" gap="4rem">
            <Text
              w="100%"
              textStyle="base"
              fontSize="sm"
              fontWeight="regular"
              lineHeight="1.75rem"
            >
              <Highlight
                query={["남성", "32개"]}
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
                선택 영역의 업종수는 32개 입니다.
              </Highlight>
            </Text>
          </ListItem>
          <ListItem w="100%" display="flex" gap="4rem">
            <Text
              w="100%"
              textStyle="base"
              fontSize="sm"
              fontWeight="regular"
              lineHeight="1.75rem"
            >
              <Highlight
                query={["3.5년"]}
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
                평균 운영 연수는 3.5년 입니다.
              </Highlight>
            </Text>
          </ListItem>
          <ListItem w="100%" display="flex" gap="4rem">
            <Text
              w="100%"
              textStyle="base"
              fontSize="sm"
              fontWeight="regular"
              lineHeight="1.75rem"
            >
              <Highlight
                query={["분식 / 떡볶이"]}
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
                매출 성장 업종은 분식 / 떡볶이 입니다.
              </Highlight>
            </Text>
          </ListItem>
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
            labels: [
              "22.02",
              "22.03",
              "22.04",
              "22.05",
              "22.06",
              "22.07",
              "22.08",
              "22.09",
              "22.10",
              "22.11",
              "22.12",
              "23.01",
            ],
            datasets: [
              {
                label: "업종 수",
                data: [
                  500, 1000, 3000, 200, 500, 300, 500, 1000, 3000, 200, 500,
                  300,
                ],
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
