//  Lib
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
import { DecoRankTag } from "@components/sementicMapLayer/elementDeco/Deco";
import {
  IcoGroup,
  IcoMonitoring,
  IcoNice2,
  IcoNice3,
  IcoResident,
  IcoWorkspace,
} from "@src/assets/icons/icon";

type Props = {
  direction?: "left" | "right";
};

const BoxRanking = ({ direction = "left" }: Props) => {
  return direction === "left" ? (
    <Flex
      pos="relative"
      p="1rem 1.375rem 0rem"
      w="100%"
      h="fit-content"
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
          평창동
        </Heading>
      </Flex>
      <Deco01 margin="0.75rem 0rem 0rem" width="100%" height="auto" />
      <Flex gap="0.25rem">
        <Flex w="100%" direction="column">
          <Flex
            p="0.25rem 0"
            borderBottom="1px solid"
            borderColor="neutral.gray7"
          >
            <Flex pos="relative" w="50%" justify="flex-end" gap="0.25rem">
              <Text
                fontFamily='"Oxanium", cursive'
                fontWeight="500"
                fontSize="sm"
                color="font.primary"
              >
                23,751
              </Text>
              <DecoRankTag fillColor="#FF7A45">
                <IcoResident
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
                <Text
                  zIndex="1"
                  fontFamily='"Oxanium", cursive'
                  fontWeight="500"
                  fontSize="xs"
                  color="font.primary"
                  lineHeight={1.7}
                >
                  03
                </Text>
              </DecoRankTag>
            </Flex>
            <Box
              m="0 0.25rem"
              width="1px"
              height="100%"
              bgColor="neutral.gray7"
            />
            <Flex pos="relative" w="50%" justify="flex-end" gap="0.25rem">
              <Text
                fontFamily='"Oxanium", cursive'
                fontWeight="500"
                fontSize="sm"
                color="font.primary"
              >
                23,751
              </Text>
              <DecoRankTag fillColor="#FADB14">
                <IcoGroup
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
                <Text
                  zIndex="1"
                  fontFamily='"Oxanium", cursive'
                  fontWeight="500"
                  fontSize="xs"
                  color="font.primary"
                  lineHeight={1.7}
                >
                  03
                </Text>
              </DecoRankTag>
            </Flex>
          </Flex>
          <Flex
            p="0.25rem 0"
            borderBottom="1px solid"
            borderColor="neutral.gray7"
          >
            <Flex pos="relative" w="50%" justify="flex-end" gap="0.25rem">
              <Text
                fontFamily='"Oxanium", cursive'
                fontWeight="500"
                fontSize="sm"
                color="font.primary"
              >
                23,751
              </Text>
              <DecoRankTag fillColor="#36CFC9">
                <IcoWorkspace
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
                <Text
                  zIndex="1"
                  fontFamily='"Oxanium", cursive'
                  fontWeight="500"
                  fontSize="xs"
                  color="font.primary"
                  lineHeight={1.7}
                >
                  03
                </Text>
              </DecoRankTag>
            </Flex>
            <Box
              m="0 0.25rem"
              width="1px"
              height="100%"
              bgColor="neutral.gray7"
            />
            <Flex pos="relative" w="50%" justify="flex-end" gap="0.25rem">
              <Text
                fontFamily='"Oxanium", cursive'
                fontWeight="500"
                fontSize="sm"
                color="font.primary"
              >
                23,751
              </Text>
              <DecoRankTag fillColor="#FADB14">
                <IcoNice2
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
                <Text
                  zIndex="1"
                  fontFamily='"Oxanium", cursive'
                  fontWeight="500"
                  fontSize="xs"
                  color="font.primary"
                  lineHeight={1.7}
                >
                  03
                </Text>
              </DecoRankTag>
            </Flex>
          </Flex>
          <Flex p="0.25rem 0">
            <Flex pos="relative" w="50%" justify="flex-end" gap="0.25rem">
              <Text
                fontFamily='"Oxanium", cursive'
                fontWeight="500"
                fontSize="sm"
                color="font.primary"
              >
                23,751
              </Text>
              <DecoRankTag fillColor="#D9D9D9">
                <IcoMonitoring
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
                <Text
                  zIndex="1"
                  fontFamily='"Oxanium", cursive'
                  fontWeight="500"
                  fontSize="xs"
                  color="font.primary"
                  lineHeight={1.7}
                >
                  03
                </Text>
              </DecoRankTag>
            </Flex>
            <Box
              m="0 0.25rem"
              width="1px"
              height="100%"
              bgColor="neutral.gray7"
            />
            <Flex pos="relative" w="50%" justify="flex-end" gap="0.25rem">
              <Text
                fontFamily='"Oxanium", cursive'
                fontWeight="500"
                fontSize="sm"
                color="font.primary"
              >
                23,751
              </Text>
              <DecoRankTag fillColor="#36CFC9">
                <IcoNice3
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
                <Text
                  zIndex="1"
                  fontFamily='"Oxanium", cursive'
                  fontWeight="500"
                  fontSize="xs"
                  color="font.primary"
                  lineHeight={1.7}
                >
                  03
                </Text>
              </DecoRankTag>
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column" justify="center" align="center">
          <Text
            fontFamily='"Oxanium", cursive'
            fontWeight="300"
            fontSize="sm"
            color="font.primary"
            lineHeight="1.25rem"
          >
            Total
          </Text>
          <Text
            fontFamily='"Oxanium", cursive'
            fontWeight="700"
            fontSize="md"
            color="font.primary"
            lineHeight="1.25rem"
          >
            RANK
          </Text>
          <Text
            fontFamily='"Oxanium", cursive'
            fontStyle="italic"
            fontWeight="900"
            fontSize="2rem"
            color="font.primary"
            lineHeight={1}
          >
            01
          </Text>
        </Flex>
      </Flex>
    </Flex>
  ) : (
    <Flex
      pos="relative"
      p="1rem 1.375rem 0rem"
      w="100%"
      h="fit-content"
      direction="column"
      border="1px solid"
      borderColor="neutral.gray6"
      borderRight="none"
      bg="linear-gradient(90deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 100%)"
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
          평창동
        </Heading>
      </Flex>
      <Deco01 margin="0.75rem 0rem 0rem" width="100%" height="auto" />
      <Flex gap="0.25rem">
        <Flex direction="column" justify="center" align="center">
          <Text
            fontFamily='"Oxanium", cursive'
            fontWeight="300"
            fontSize="sm"
            color="font.primary"
            lineHeight="1.25rem"
          >
            Total
          </Text>
          <Text
            fontFamily='"Oxanium", cursive'
            fontWeight="700"
            fontSize="md"
            color="font.primary"
            lineHeight="1.25rem"
          >
            RANK
          </Text>
          <Text
            fontFamily='"Oxanium", cursive'
            fontStyle="italic"
            fontWeight="900"
            fontSize="2rem"
            color="font.primary"
            lineHeight={1}
          >
            01
          </Text>
        </Flex>
        <Flex w="100%" direction="column">
          <Flex
            p="0.25rem 0"
            borderBottom="1px solid"
            borderColor="neutral.gray7"
          >
            <Flex w="50%" justify="flex-start" gap="0.25rem">
              <DecoRankTag fillColor="#FADB14">
                <IcoGroup
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
                <Text
                  zIndex="1"
                  fontFamily='"Oxanium", cursive'
                  fontWeight="500"
                  fontSize="xs"
                  color="font.primary"
                  lineHeight={1.7}
                >
                  03
                </Text>
              </DecoRankTag>
              <Text
                fontFamily='"Oxanium", cursive'
                fontWeight="500"
                fontSize="sm"
                color="font.primary"
              >
                23,751
              </Text>
            </Flex>
            <Box
              m="0 0.25rem"
              width="1px"
              height="100%"
              bgColor="neutral.gray7"
            />
            <Flex w="50%" justify="flex-start" gap="0.25rem">
              <DecoRankTag fillColor="#FF7A45">
                <IcoResident
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
                <Text
                  zIndex="1"
                  fontFamily='"Oxanium", cursive'
                  fontWeight="500"
                  fontSize="xs"
                  color="font.primary"
                  lineHeight={1.7}
                >
                  03
                </Text>
              </DecoRankTag>
              <Text
                fontFamily='"Oxanium", cursive'
                fontWeight="500"
                fontSize="sm"
                color="font.primary"
              >
                23,751
              </Text>
            </Flex>
          </Flex>
          <Flex
            p="0.25rem 0"
            borderBottom="1px solid"
            borderColor="neutral.gray7"
          >
            <Flex w="50%" justify="flex-start" gap="0.25rem">
              <DecoRankTag fillColor="#FADB14">
                <IcoNice2
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
                <Text
                  zIndex="1"
                  fontFamily='"Oxanium", cursive'
                  fontWeight="500"
                  fontSize="xs"
                  color="font.primary"
                  lineHeight={1.7}
                >
                  03
                </Text>
              </DecoRankTag>
              <Text
                fontFamily='"Oxanium", cursive'
                fontWeight="500"
                fontSize="sm"
                color="font.primary"
              >
                23,751
              </Text>
            </Flex>
            <Box
              m="0 0.25rem"
              width="1px"
              height="100%"
              bgColor="neutral.gray7"
            />
            <Flex w="50%" justify="flex-start" gap="0.25rem">
              <DecoRankTag fillColor="#36CFC9">
                <IcoWorkspace
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
                <Text
                  zIndex="1"
                  fontFamily='"Oxanium", cursive'
                  fontWeight="500"
                  fontSize="xs"
                  color="font.primary"
                  lineHeight={1.7}
                >
                  03
                </Text>
              </DecoRankTag>
              <Text
                fontFamily='"Oxanium", cursive'
                fontWeight="500"
                fontSize="sm"
                color="font.primary"
              >
                23,751
              </Text>
            </Flex>
          </Flex>
          <Flex p="0.25rem 0">
            <Flex w="50%" justify="flex-start" gap="0.25rem">
              <DecoRankTag fillColor="#36CFC9">
                <IcoNice3
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
                <Text
                  zIndex="1"
                  fontFamily='"Oxanium", cursive'
                  fontWeight="500"
                  fontSize="xs"
                  color="font.primary"
                  lineHeight={1.7}
                >
                  03
                </Text>
              </DecoRankTag>
              <Text
                fontFamily='"Oxanium", cursive'
                fontWeight="500"
                fontSize="sm"
                color="font.primary"
              >
                23,751
              </Text>
            </Flex>
            <Box
              m="0 0.25rem"
              width="1px"
              height="100%"
              bgColor="neutral.gray7"
            />
            <Flex w="50%" justify="flex-start" gap="0.25rem">
              <DecoRankTag fillColor="#D9D9D9">
                <IcoMonitoring
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
                <Text
                  zIndex="1"
                  fontFamily='"Oxanium", cursive'
                  fontWeight="500"
                  fontSize="xs"
                  color="font.primary"
                  lineHeight={1.7}
                >
                  03
                </Text>
              </DecoRankTag>
              <Text
                fontFamily='"Oxanium", cursive'
                fontWeight="500"
                fontSize="sm"
                color="font.primary"
              >
                23,751
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const BoxRankingDong = () => {
  return (
    <Flex
      pos="relative"
      p="1rem 1.375rem 1rem"
      w="19.25rem"
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
          평창동
        </Heading>
      </Flex>
      <Deco01 margin="0.75rem 0rem 0rem" width="100%" height="auto" />
      <Flex h="100%" gap="0.25rem">
        <Flex w="100%" direction="column" gap="0.5rem">
          <Flex
            pos="relative"
            p="0.25rem 0"
            w="100%"
            borderBottom="1px solid"
            borderColor="neutral.gray7"
            justify="flex-end"
            gap="0.25rem"
          >
            <Text
              fontFamily='"Oxanium", cursive'
              fontWeight="500"
              fontSize="md"
              color="font.primary"
            >
              23,751
            </Text>
            <DecoRankTag width="3.125rem" height="1.5rem" fillColor="#FADB14">
              <IcoGroup
                width="1rem"
                height="1rem"
                zIndex="1"
                color="neutral.gray9"
              />
              <Text
                zIndex="1"
                fontFamily='"Oxanium", cursive'
                fontWeight="500"
                fontSize="1.25rem"
                color="font.primary"
                lineHeight={1.5}
              >
                03
              </Text>
            </DecoRankTag>
          </Flex>
          <Flex
            pos="relative"
            p="0.25rem 0"
            w="100%"
            borderBottom="1px solid"
            borderColor="neutral.gray7"
            justify="flex-end"
            gap="0.25rem"
          >
            <Text
              fontFamily='"Oxanium", cursive'
              fontWeight="500"
              fontSize="md"
              color="font.primary"
            >
              23,751
            </Text>
            <DecoRankTag width="3.125rem" height="1.5rem" fillColor="#FADB14">
              <IcoNice2
                width="1rem"
                height="1rem"
                zIndex="1"
                color="neutral.gray9"
              />
              <Text
                zIndex="1"
                fontFamily='"Oxanium", cursive'
                fontWeight="500"
                fontSize="1.25rem"
                color="font.primary"
                lineHeight={1.5}
              >
                03
              </Text>
            </DecoRankTag>
          </Flex>
          <Flex
            pos="relative"
            p="0.25rem 0"
            w="100%"
            borderBottom="1px solid"
            borderColor="neutral.gray7"
            justify="flex-end"
            gap="0.25rem"
          >
            <Text
              fontFamily='"Oxanium", cursive'
              fontWeight="500"
              fontSize="md"
              color="font.primary"
            >
              23,751
            </Text>
            <DecoRankTag width="3.125rem" height="1.5rem" fillColor="#36CFC9">
              <IcoNice3
                width="1rem"
                height="1rem"
                zIndex="1"
                color="neutral.gray9"
              />
              <Text
                zIndex="1"
                fontFamily='"Oxanium", cursive'
                fontWeight="500"
                fontSize="1.25rem"
                color="font.primary"
                lineHeight={1.5}
              >
                03
              </Text>
            </DecoRankTag>
          </Flex>
          <Flex
            pos="relative"
            p="0.25rem 0"
            w="100%"
            borderBottom="1px solid"
            borderColor="neutral.gray7"
            justify="flex-end"
            gap="0.25rem"
          >
            <Text
              fontFamily='"Oxanium", cursive'
              fontWeight="500"
              fontSize="md"
              color="font.primary"
            >
              23,751
            </Text>
            <DecoRankTag width="3.125rem" height="1.5rem" fillColor="#FF7A45">
              <IcoResident
                width="1rem"
                height="1rem"
                zIndex="1"
                color="neutral.gray9"
              />
              <Text
                zIndex="1"
                fontFamily='"Oxanium", cursive'
                fontWeight="500"
                fontSize="1.25rem"
                color="font.primary"
                lineHeight={1.5}
              >
                03
              </Text>
            </DecoRankTag>
          </Flex>
          <Flex
            pos="relative"
            p="0.25rem 0"
            w="100%"
            borderBottom="1px solid"
            borderColor="neutral.gray7"
            justify="flex-end"
            gap="0.25rem"
          >
            <Text
              fontFamily='"Oxanium", cursive'
              fontWeight="500"
              fontSize="md"
              color="font.primary"
            >
              23,751
            </Text>
            <DecoRankTag width="3.125rem" height="1.5rem" fillColor="#36CFC9">
              <IcoWorkspace
                width="1rem"
                height="1rem"
                zIndex="1"
                color="neutral.gray9"
              />
              <Text
                zIndex="1"
                fontFamily='"Oxanium", cursive'
                fontWeight="500"
                fontSize="1.25rem"
                color="font.primary"
                lineHeight={1.5}
              >
                03
              </Text>
            </DecoRankTag>
          </Flex>
          <Flex
            pos="relative"
            p="0.25rem 0"
            w="100%"
            borderBottom="1px solid"
            borderColor="neutral.gray7"
            justify="flex-end"
            gap="0.25rem"
          >
            <Text
              fontFamily='"Oxanium", cursive'
              fontWeight="500"
              fontSize="md"
              color="font.primary"
            >
              23,751
            </Text>
            <DecoRankTag width="3.125rem" height="1.5rem" fillColor="#D9D9D9">
              <IcoMonitoring
                width="1rem"
                height="1rem"
                zIndex="1"
                color="neutral.gray9"
              />
              <Text
                zIndex="1"
                fontFamily='"Oxanium", cursive'
                fontWeight="500"
                fontSize="1.25rem"
                color="font.primary"
                lineHeight={1.5}
              >
                03
              </Text>
            </DecoRankTag>
          </Flex>
        </Flex>
        <Flex direction="column" justify="center" align="center">
          <Text
            fontFamily='"Oxanium", cursive'
            fontWeight="300"
            fontSize="md"
            color="font.primary"
            lineHeight="1.25rem"
          >
            Total
          </Text>
          <Text
            fontFamily='"Oxanium", cursive'
            fontWeight="700"
            fontSize="1.5rem"
            color="font.primary"
            lineHeight="1.25rem"
          >
            RANK
          </Text>
          <Text
            fontFamily='"Oxanium", cursive'
            fontStyle="italic"
            fontWeight="900"
            fontSize="3rem"
            color="font.primary"
            lineHeight={1}
          >
            01
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export { BoxRanking, BoxRankingDong };
