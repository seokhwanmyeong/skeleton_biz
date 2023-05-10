//  Lib
import { Fragment } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
//  Icon
import {
  IcoGroup,
  IcoMonitoring,
  IcoNice2,
  IcoNice3,
  IcoResident,
  IcoWorkspace,
} from "@assets/icons/icon";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
import { DecoRankTag } from "@components/sementicMapLayer/elementDeco/DecoCenter";
//  Type
import type { RankType } from "@states/sementicMap/stateFilter";

type Props = {
  rankData: RankType;
  direction?: "left" | "right";
};

const BoxRanking = ({ rankData, direction = "left" }: Props) => {
  const { dongName, rank, categoryRanks } = rankData;

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
      <ElementHeader name={dongName} />
      <Flex gap="0.5rem">
        <Flex w="100%" direction="column">
          <Flex
            p="0.25rem 0"
            borderBottom="1px solid"
            borderColor="neutral.gray7"
          >
            <ElementList
              icon={
                <IcoResident
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
              }
              fillColor="#FF7A45"
              rank={categoryRanks?.housCnt?.rank}
              amount={categoryRanks?.housCnt?.amount}
            />
            <ElementDivider />
            <ElementList
              icon={
                <IcoGroup
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
              }
              fillColor="#FADB14"
              rank={categoryRanks?.inflowCustCnt?.rank}
              amount={categoryRanks?.inflowCustCnt?.amount}
            />
          </Flex>
          <Flex
            p="0.25rem 0"
            borderBottom="1px solid"
            borderColor="neutral.gray7"
          >
            <ElementList
              icon={
                <IcoWorkspace
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
              }
              fillColor="#36CFC9"
              rank={categoryRanks?.storeCnt?.rank}
              amount={categoryRanks?.storeCnt?.amount}
            />
            <ElementDivider />
            <ElementList
              icon={
                <IcoNice2
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
              }
              fillColor="#FADB14"
              rank={categoryRanks?.housCustCnt?.rank}
              amount={categoryRanks?.housCustCnt?.amount}
            />
          </Flex>
          <Flex p="0.25rem 0">
            <ElementList
              icon={
                <IcoMonitoring
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
              }
              fillColor="#D9D9D9"
              rank={categoryRanks?.admiSaleAmt?.rank}
              amount={categoryRanks?.admiSaleAmt?.amount}
              isSale={true}
            />
            <ElementDivider />
            <ElementList
              icon={
                <IcoNice3
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
              }
              fillColor="#36CFC9"
              rank={categoryRanks?.jobCustCnt?.rank}
              amount={categoryRanks?.jobCustCnt?.amount}
            />
          </Flex>
        </Flex>
        <ElementRank rank={rank} />
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
      <ElementHeader name={dongName} />
      <Flex gap="0.5rem">
        <ElementRank rank={rank} />
        <Flex w="100%" direction="column">
          <Flex
            p="0.25rem 0"
            borderBottom="1px solid"
            borderColor="neutral.gray7"
          >
            <ElementList
              icon={
                <IcoGroup
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
              }
              fillColor="#FADB14"
              rank={categoryRanks?.inflowCustCnt?.rank}
              amount={categoryRanks?.inflowCustCnt?.amount || null}
              direction="right"
            />
            <ElementDivider />
            <ElementList
              icon={
                <IcoResident
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
              }
              fillColor="#FF7A45"
              rank={categoryRanks?.housCnt?.rank}
              amount={categoryRanks?.housCnt?.amount || null}
              direction="right"
            />
          </Flex>
          <Flex
            p="0.25rem 0"
            borderBottom="1px solid"
            borderColor="neutral.gray7"
          >
            <ElementList
              icon={
                <IcoNice2
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
              }
              fillColor="#FADB14"
              rank={categoryRanks?.housCustCnt?.rank}
              amount={categoryRanks?.housCustCnt?.amount || null}
              direction="right"
            />
            <ElementDivider />
            <ElementList
              icon={
                <IcoWorkspace
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
              }
              fillColor="#36CFC9"
              rank={categoryRanks?.storeCnt?.rank}
              amount={categoryRanks?.storeCnt?.amount || null}
              direction="right"
            />
          </Flex>
          <Flex p="0.25rem 0">
            <ElementList
              icon={
                <IcoNice3
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
              }
              fillColor="#36CFC9"
              rank={categoryRanks?.jobCustCnt?.rank}
              amount={categoryRanks?.jobCustCnt?.amount || null}
              direction="right"
            />
            <ElementDivider />
            <ElementList
              icon={
                <IcoMonitoring
                  width="0.875rem"
                  height="0.875rem"
                  zIndex="1"
                  color="neutral.gray9"
                />
              }
              fillColor="#D9D9D9"
              rank={categoryRanks?.admiSaleAmt?.rank}
              amount={categoryRanks?.admiSaleAmt?.amount || null}
              direction="right"
              isSale={true}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const BoxRankingDong = ({ rankData }: { rankData: RankType }) => {
  const { dongName, rank, categoryRanks } = rankData;

  return (
    <Flex
      pos="relative"
      p="1rem 0.875rem 1rem"
      direction="column"
      border="1px solid"
      borderColor="neutral.gray6"
      borderLeft="none"
      bg="linear-gradient(270deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 100%)"
      backdropFilter="blur(2px)"
    >
      <ElementHeader name={dongName} />
      <Flex h="100%" gap="0.75rem">
        <Flex w="100%" direction="column" gap="0.5rem">
          <ElementListOne
            icon={
              <IcoGroup
                width="1rem"
                height="1rem"
                zIndex="1"
                color="neutral.gray9"
              />
            }
            fillColor="#FADB14"
            amount={categoryRanks?.inflowCustCnt?.amount || null}
            rank={categoryRanks?.inflowCustCnt?.rank}
          />
          <ElementListOne
            icon={
              <IcoNice2
                width="1rem"
                height="1rem"
                zIndex="1"
                color="neutral.gray9"
              />
            }
            fillColor="#FADB14"
            amount={categoryRanks?.housCustCnt?.amount || null}
            rank={categoryRanks?.housCustCnt?.rank}
          />
          <ElementListOne
            icon={
              <IcoNice3
                width="1rem"
                height="1rem"
                zIndex="1"
                color="neutral.gray9"
              />
            }
            fillColor="#36CFC9"
            amount={categoryRanks?.jobCustCnt?.amount || null}
            rank={categoryRanks?.jobCustCnt?.rank}
          />
          <ElementListOne
            icon={
              <IcoResident
                width="1rem"
                height="1rem"
                zIndex="1"
                color="neutral.gray9"
              />
            }
            fillColor="#FF7A45"
            amount={categoryRanks?.housCnt?.amount || null}
            rank={categoryRanks?.housCnt?.rank}
          />
          <ElementListOne
            icon={
              <IcoWorkspace
                width="1rem"
                height="1rem"
                zIndex="1"
                color="neutral.gray9"
              />
            }
            fillColor="#36CFC9"
            amount={categoryRanks?.storeCnt?.amount || null}
            rank={categoryRanks?.storeCnt?.rank}
          />
          <ElementListOne
            icon={
              <IcoMonitoring
                width="1rem"
                height="1rem"
                zIndex="1"
                color="neutral.gray9"
              />
            }
            fillColor="#D9D9D9"
            amount={categoryRanks?.admiSaleAmt?.amount || null}
            rank={categoryRanks?.admiSaleAmt?.rank}
            isSale={true}
          />
        </Flex>
        <ElementRank rank={rank} />
      </Flex>
    </Flex>
  );
};

const ElementHeader = ({ name }: { name: string }) => {
  return (
    <Fragment>
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
          {name || ""}
        </Heading>
      </Flex>
      <Deco01 margin="0.75rem 0rem 0rem" width="100%" height="auto" />
    </Fragment>
  );
};

const ElementDivider = () => {
  return (
    <Box m="0 0.25rem" width="1px" height="100%" bgColor="neutral.gray7" />
  );
};

const ElementRank = ({ rank }: { rank: number }) => {
  return (
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
        pos="relative"
        top="2px"
        left="-3px"
        fontFamily='"Oxanium", cursive'
        fontStyle="italic"
        fontWeight="900"
        fontSize="2.3rem"
        lineHeight={1}
        color={
          rank && rank === 1
            ? "primary.type6"
            : rank === 2
            ? "secondary.second.type5"
            : rank === 3
            ? "secondary.third.type5"
            : "font.primary"
        }
        textShadow={
          rank && rank <= 3
            ? "-1px 0 #595959, 0 1px #595959, 1px 0 #595959, 0 -1px #595959"
            : "none"
        }
      >
        {rank && rank < 10 && "0"}
        {rank || "-"}
      </Text>
    </Flex>
  );
};

const ElementList = ({
  icon,
  fillColor,
  amount,
  rank,
  direction = "left",
  isSale = false,
}: {
  icon: any;
  fillColor: string;
  amount?: number;
  rank?: number;
  direction?: "left" | "right";
  isSale?: boolean;
}) => {
  return (
    <Flex
      pos="relative"
      w="50%"
      justify="flex-end"
      direction={direction === "left" ? "row" : "row-reverse"}
      gap="0.25rem"
    >
      <Text
        fontFamily='"Oxanium", cursive'
        fontWeight="500"
        fontSize="sm"
        color="font.primary"
        whiteSpace="nowrap"
      >
        {isSale && amount
          ? `${Math.round(amount / 10000) || "s"}`
          : amount
          ? amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
          : "-"}
        {isSale && amount && (
          <Text
            as={"span"}
            textStyle="base"
            fontWeight="5400"
            fontSize="sm"
            color="font.primary"
          >
            만원
          </Text>
        )}
      </Text>
      <DecoRankTag fillColor={fillColor}>
        {icon}
        <Text
          w="0.875rem"
          zIndex="1"
          fontFamily='"Oxanium", cursive'
          fontWeight="500"
          fontSize="xs"
          color="font.primary"
          lineHeight={1.7}
          textAlign="center"
        >
          {rank && rank < 10 && "0"}
          {rank || "-"}
        </Text>
      </DecoRankTag>
    </Flex>
  );
};

const ElementListOne = ({
  icon,
  fillColor,
  amount,
  rank,
  isSale = false,
}: {
  icon: any;
  fillColor: string;
  amount?: number;
  rank?: number;
  isSale?: boolean;
}) => {
  return (
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
        {isSale && amount
          ? `${Math.round(amount / 10000)} `
          : amount
          ? amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
          : "-"}
        {isSale && amount && (
          <Text
            as={"span"}
            textStyle="base"
            fontWeight="500"
            fontSize="md"
            color="font.primary"
            line-height="1"
          >
            만원
          </Text>
        )}
      </Text>
      <DecoRankTag width="3.125rem" height="1.5rem" fillColor={fillColor}>
        {icon}
        <Text
          zIndex="1"
          fontFamily='"Oxanium", cursive'
          fontWeight="500"
          fontSize="1.25rem"
          color="font.primary"
          lineHeight={1.5}
        >
          {rank && rank < 10 && "0"}
          {rank || "-"}
        </Text>
      </DecoRankTag>
    </Flex>
  );
};

export { BoxRanking, BoxRankingDong };
