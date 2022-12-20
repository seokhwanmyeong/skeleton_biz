//  LIB
import { ReactNode } from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";

type NoContentProps = {
  text: string;
  children?: ReactNode;
  noShadow?: boolean;
};

const NoContent = ({ text, noShadow }: NoContentProps) => {
  return (
    <Flex
      mt="8"
      mb="12"
      p="10"
      borderRadius="8"
      direction="column"
      align="center"
      justify="center"
      boxShadow={noShadow ? "unset" : "sm"}
      h="100%"
    >
      <Text mt="4">{text}</Text>
    </Flex>
  );
};

export default NoContent;
export { type NoContentProps };
