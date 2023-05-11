import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

type Props = {};

const BaseSpinner = (props: { [x: string]: any }) => {
  return (
    <Flex
      position="absolute"
      top={0}
      left={0}
      zIndex={100}
      w="100%"
      h="100%"
      justify="center"
      align="center"
      _after={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        display: "block",
        w: "100%",
        h: "100%",
        bgColor: "#00000090",
      }}
      {...props}
    >
      <Spinner
        zIndex={101}
        w="3rem"
        h="3rem"
        speed="2s"
        color="primary.type7"
        emptyColor="#eeeeee"
        thickness="7px"
      />
    </Flex>
  );
};

const ReportSpinner = () => {
  return (
    <Flex
      position="absolute"
      top={0}
      left={0}
      zIndex={100}
      w="100%"
      h="100%"
      justify="center"
      align="center"
      _after={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        display: "block",
        w: "100%",
        h: "100%",
        bgColor: "#00000090",
      }}
    >
      <Spinner
        zIndex={101}
        w="3rem"
        h="3rem"
        speed="2s"
        color="primary.type7"
        emptyColor="#eeeeee"
        thickness="7px"
      />
    </Flex>
  );
};

export { BaseSpinner, ReportSpinner };
