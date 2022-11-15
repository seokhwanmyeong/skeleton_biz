import React, { useState } from "react";
import { Flex, Button, Heading } from "@chakra-ui/react";
//  Components
import Circle from "@components/charts/Circle";
import Graph from "@components/charts/Graph";

type Props = {};

const SementicViewer = (props: Props) => {
  const [isOpen, setOpen] = useState(true);
  const [data] = useState([
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
  ])
  const onToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <Flex position="absolute" right="0" top="0" zIndex="100" h="100%">
      <Button bgColor="#555555" onClick={onToggle}>
        Toggle
      </Button>
      <Flex
        w={isOpen ? "400px" : "0"}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        borderLeft="1px solid"
        bgColor="#555555"
        overflow="hidden"
        transition="0.3s"
      >
        <Heading>SementicViewer</Heading>
        <Graph Data={data} />
      </Flex>
    </Flex>
  );
};

export default SementicViewer;
