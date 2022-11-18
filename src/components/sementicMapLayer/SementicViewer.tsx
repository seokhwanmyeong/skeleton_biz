import React, { useState } from "react";
import { Flex, Button, Heading, useColorMode } from "@chakra-ui/react";
//  Components
import ChartCircle from "@components/charts/ChartCircle";
import ChartGraph from "@components/charts/ChartGraph";

type Props = {};

const SementicViewer = (props: Props) => {
  const [isOpen, setOpen] = useState(true);
  const mode = useColorMode();
  const [data] = useState({
    data1: [
      { date: "2022-01", population: 5000 },
      { date: "2022-02", population: 100 },
      { date: "2022-03", population: 3500 },
      { date: "2022-04", population: 1000 },
      { date: "2022-05", population: 9000 },
      { date: "2022-05", population: 1000 },
      { date: "2022-08", population: 8000 },
      { date: "2022-10", population: 677 },
      { date: "2022-11", population: 800 },
      { date: "2022-12", population: 3000 },
      { date: "2022-12", population: 3000 },
      { date: "2022-12", population: 3000 },
      { date: "2022-12", population: 8000 },
    ],
    data2: [
      { age: "10th", count: 2000 },
      { age: "20th", count: 5000 },
      { age: "30th", count: 12359 },
      { age: "40th", count: 4560 },
      { age: "50th", count: 1500 },
      { age: "60th", count: 1290 },
    ],
  });
  const onToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <Flex position="absolute" right="0" top="0" zIndex="100" h="100%">
      <Button
        borderRadius="0px 0px 0px 5px"
        bgColor="#646464"
        onClick={onToggle}
        transition="0.5s"
        color="#ffffff"
        _hover={{
          bgColor: "#000000",
        }}
      >
        Viewer
      </Button>
      <Flex
        w={isOpen ? "400px" : "0"}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        borderLeft={isOpen ? "1px solid #ededed" : ""}
        bgColor={mode.colorMode === "dark" ? "#646464" : "#ffffff"}
        overflow="hidden"
        transition="0.3s"
      >
        <Heading>SementicViewer</Heading>
        <ChartGraph Data={data.data1} />
        <ChartCircle
          Data={data.data2}
          title=""
          keyName="age"
          valName="count"
          zKey=""
          Group={false}
          width={360}
          height={300}
          innerRadius={0}
          outerRadius={148}
          labelRadius={110}
          arcColor={[
            "#98abc5",
            "#8a89a6",
            "#7b6888",
            "#6b486b",
            "#a05d56",
            "#555555",
          ]}
          stroke="none"
          strokeWidth={1}
          strokeLinejoin="round"
          padAngle={0}
          svgStyle={{
            width: "10px",
            height: "auto",
          }}
        />
      </Flex>
    </Flex>
  );
};

export default SementicViewer;
