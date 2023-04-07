//  LIB
import { List, ListItem, Text, Highlight } from "@chakra-ui/react";

const ViewList = () => {
  return (
    <List width="100%">
      <ListItem w="100%" m={"1rem 0"} display="flex" gap="1rem">
        <Text w="50%" textStyle="list.title" fontSize="md">
          상권유형
        </Text>
        <Text w="100%" textStyle="list.text" fontSize="md">
          <Highlight
            query={["34%", "31%", "28%", "3%", "4"]}
            styles={{
              fontWeight: "900",
              color: "#6363f1",
            }}
          >
            상업지역 34% (주거지역 31%, 역세권 28%, 오피스가 3%, 그 외 4%)
          </Highlight>
        </Text>
      </ListItem>
      <ListItem w="100%" m={"1rem 0"} display="flex" gap="1rem">
        <Text w="50%" textStyle="list.title" fontSize="md">
          상권점수
        </Text>
        <Text w="100%" textStyle="list.text" fontSize="md">
          <Highlight
            query={["454점"]}
            styles={{
              fontWeight: "900",
              color: "#6363f1",
            }}
          >
            454점 (1,000점 기준)
          </Highlight>
        </Text>
      </ListItem>
      <ListItem w="100%" m={"1rem 0"} display="flex" gap="1rem">
        <Text w="50%" textStyle="list.title" fontSize="md">
          상권등급
        </Text>
        <Text w="100%" textStyle="list.text" fontSize="md">
          <Highlight
            query={["3"]}
            styles={{
              fontWeight: "900",
              color: "#6363f1",
            }}
          >
            3등급 (5등급 기준)
          </Highlight>
        </Text>
      </ListItem>
      <ListItem w="100%" m={"1rem 0"} display="flex" gap="1rem">
        <Text w="50%" textStyle="list.title" fontSize="md">
          유동인구수
        </Text>
        <Text w="100%" textStyle="list.text" fontSize="md">
          <Highlight
            query={["12,394"]}
            styles={{
              fontWeight: "900",
              color: "#6363f1",
            }}
          >
            12,394 명
          </Highlight>
        </Text>
      </ListItem>
      <ListItem w="100%" m={"1rem 0"} display="flex" gap="1rem">
        <Text w="50%" textStyle="list.title" fontSize="md">
          주거인구수
        </Text>
        <Text w="100%" textStyle="list.text" fontSize="md">
          <Highlight
            query={["56,631"]}
            styles={{
              fontWeight: "900",
              color: "#6363f1",
            }}
          >
            56,631 명
          </Highlight>
        </Text>
      </ListItem>
      <ListItem w="100%" m={"1rem 0"} display="flex" gap="1rem">
        <Text w="50%" textStyle="list.title" fontSize="md">
          직장인구수
        </Text>
        <Text w="100%" textStyle="list.text" fontSize="md">
          <Highlight
            query={["8,328"]}
            styles={{
              fontWeight: "900",
              color: "#6363f1",
            }}
          >
            8,328 명
          </Highlight>
        </Text>
      </ListItem>
      <ListItem w="100%" m={"1rem 0"} display="flex" gap="1rem">
        <Text w="50%" textStyle="list.title" fontSize="md">
          세대수
        </Text>
        <Text w="100%" textStyle="list.text" fontSize="md">
          <Highlight
            query={["28,683", "9,736", "18,947"]}
            styles={{
              fontWeight: "900",
              color: "#6363f1",
            }}
          >
            28,683 세대 (아파트 9,736 세대, 비아파트 18,947 세대)
          </Highlight>
        </Text>
      </ListItem>
      <ListItem w="100%" m={"1rem 0"} display="flex" gap="1rem">
        <Text w="50%" textStyle="list.title" fontSize="md">
          동종 업종수
        </Text>
        <Text w="100%" textStyle="list.text" fontSize="md">
          <Highlight
            query={["7"]}
            styles={{
              fontWeight: "900",
              color: "#6363f1",
            }}
          >
            7
          </Highlight>
        </Text>
      </ListItem>
      <ListItem w="100%" m={"1rem 0"} display="flex" gap="1rem">
        <Text w="50%" textStyle="list.title" fontSize="md">
          평균 결제 금액
        </Text>
        <Text w="100%" textStyle="list.text" fontSize="md">
          <Highlight
            query={["23,823"]}
            styles={{
              fontWeight: "900",
              color: "#6363f1",
            }}
          >
            23,823 원
          </Highlight>
        </Text>
      </ListItem>
      <ListItem w="100%" m={"1rem 0"} display="flex" gap="1rem">
        <Text w="50%" textStyle="list.title" fontSize="md">
          월 평균 매출
        </Text>
        <Text w="100%" textStyle="list.text" fontSize="md">
          <Highlight
            query={["2,294"]}
            styles={{
              fontWeight: "900",
              color: "#6363f1",
            }}
          >
            2,294 만원
          </Highlight>
        </Text>
      </ListItem>
      <ListItem w="100%" m={"1rem 0"} display="flex" gap="1rem">
        <Text w="50%" textStyle="list.title" fontSize="md">
          지역정보
        </Text>
        <Text w="100%" textStyle="list.text" fontSize="md">
          학교수(2), 직장수(2), 지하철(1), 버스정류장(12)
        </Text>
      </ListItem>
    </List>
  );
};

export default ViewList;
