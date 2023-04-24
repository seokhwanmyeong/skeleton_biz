import { Box, Flex, Heading, List, ListItem, Text } from "@chakra-ui/react";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";

type Props = {};

const FlowPopInfo = (props: Props) => {
  return (
    <Flex
      pos="relative"
      m="0.1875rem 0"
      p="1rem 1.375rem 1rem"
      w="19.25rem"
      h="50%"
      direction="column"
      border="1px solid"
      borderColor="neutral.gray6"
      borderLeft="none"
      bg="linear-gradient(270deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 100%)"
      backdropFilter="blur(2px)"
    >
      <Flex
        w="100%"
        h="fit-content"
        justify="center"
        align="center"
        gap="0.75rem"
      >
        <Heading
          as={"h5"}
          bg="none"
          fontSize="sm"
          lineHeight="1px"
          color="font.title"
          textAlign="center"
          letterSpacing="2.66667px"
        >
          일평균 유동인구
        </Heading>
      </Flex>
      <Deco01 margin="0.75rem 0 0.25rem" width="100%" height="auto" />
      <Flex direction="column">
        <Text
          mb="0.25rem"
          w="100%"
          textStyle="base"
          fontSize="0.5rem"
          textAlign="end"
          color="font.gray"
        >
          (명)
        </Text>
        <Flex mb="2rem" align="flex-end" gap="2px">
          <Box
            w="20%"
            h="0.75rem"
            borderRadius="base"
            bgColor="system.default.indigo"
          />
          <Box
            pos="relative"
            bgColor="font.secondary"
            w="1px"
            h="0.375rem"
            _after={{
              content: '"6,000"',
              display: "inline-block",
              pos: "absolute",
              top: "0.5rem",
              transform: "translateX(-50%)",
              textStyle: "base",
              fontSize: "0.5rem",
              textAlign: "end",
              color: "font.gray",
            }}
          />
          <Box
            w="20%"
            h="0.75rem"
            borderRadius="base"
            bgColor="system.default.blue"
          />
          <Box
            pos="relative"
            bgColor="font.secondary"
            w="1px"
            h="0.375rem"
            _after={{
              content: '"10,000"',
              display: "inline-block",
              pos: "absolute",
              top: "0.5rem",
              transform: "translateX(-50%)",
              textStyle: "base",
              fontSize: "0.5rem",
              textAlign: "end",
              color: "font.gray",
            }}
          />
          <Box
            w="20%"
            h="0.75rem"
            borderRadius="base"
            bgColor="system.default.yellow"
          />
          <Box
            pos="relative"
            bgColor="font.secondary"
            w="1px"
            h="0.375rem"
            _after={{
              content: '"13,000"',
              display: "inline-block",
              pos: "absolute",
              top: "0.5rem",
              transform: "translateX(-50%)",
              textStyle: "base",
              fontSize: "0.5rem",
              textAlign: "end",
              color: "font.gray",
            }}
          />
          <Box
            w="20%"
            h="0.75rem"
            borderRadius="base"
            bgColor="system.default.orange"
          />
          <Box
            pos="relative"
            bgColor="font.secondary"
            w="1px"
            h="0.375rem"
            _after={{
              content: '"16,000"',
              display: "inline-block",
              pos: "absolute",
              top: "0.5rem",
              transform: "translateX(-50%)",
              textStyle: "base",
              fontSize: "0.5rem",
              textAlign: "end",
              color: "font.gray",
            }}
          />
          <Box
            w="20%"
            h="0.75rem"
            borderRadius="base"
            bgColor="system.default.red"
          />
        </Flex>
        <List display="flex" flexDirection="column" gap="0.75rem">
          <ListItem
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            gap="0.75rem"
          >
            <Text textStyle="base" fontSize="sm">
              18,000 명 이상
            </Text>
            <Text textStyle="base" fontSize="md" fontWeight="strong">
              1 등급
            </Text>
            <Box
              w="0.75rem"
              h="0.75rem"
              borderRadius="50%"
              bgColor="system.default.red"
            />
          </ListItem>
          <ListItem
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            gap="0.75rem"
          >
            <Text textStyle="base" fontSize="sm">
              13,000 ~ 18,000 명
            </Text>
            <Text textStyle="base" fontSize="md" fontWeight="strong">
              2 등급
            </Text>
            <Box
              w="0.75rem"
              h="0.75rem"
              borderRadius="50%"
              bgColor="system.default.orange"
            />
          </ListItem>
          <ListItem
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            gap="0.75rem"
          >
            <Text textStyle="base" fontSize="sm">
              10,000 ~ 13,000 명
            </Text>
            <Text textStyle="base" fontSize="md" fontWeight="strong">
              3 등급
            </Text>
            <Box
              w="0.75rem"
              h="0.75rem"
              borderRadius="50%"
              bgColor="system.default.yellow"
            />
          </ListItem>
          <ListItem
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            gap="0.75rem"
          >
            <Text textStyle="base" fontSize="sm">
              6,000 ~ 10,000 명
            </Text>
            <Text textStyle="base" fontSize="md" fontWeight="strong">
              4 등급
            </Text>
            <Box
              w="0.75rem"
              h="0.75rem"
              borderRadius="50%"
              bgColor="system.default.blue"
            />
          </ListItem>
          <ListItem
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            gap="0.75rem"
          >
            <Text textStyle="base" fontSize="sm">
              6,000 명 이하
            </Text>
            <Text textStyle="base" fontSize="md" fontWeight="strong">
              5 등급
            </Text>
            <Box
              w="0.75rem"
              h="0.75rem"
              borderRadius="50%"
              bgColor="system.default.indigo"
            />
          </ListItem>
        </List>
      </Flex>
    </Flex>
  );
};

export default FlowPopInfo;
