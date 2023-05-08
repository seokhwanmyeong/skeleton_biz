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

type Props = {};

const ReportFacility = (props: Props) => {
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
          지역정보 요약
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
                query={["2개"]}
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
                선택 영역내 학교는 2개 입니다.
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
                query={["23개"]}
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
                선택 영역내 직장수는 23개 입니다.
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
                query={["1개", "12개"]}
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
                선택 영역내 지하철은 1개 , 버스정류장은 12개 입니다.
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
            지역 유형별 추이
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
            labels: ["아파트", "단독주택", "복합주택", "오피스텔"],
            datasets: [
              {
                data: [300, 500, 1000, 500],
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

export default ReportFacility;
