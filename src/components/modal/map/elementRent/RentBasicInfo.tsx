import { Flex, FormLabel, Text } from "@chakra-ui/react";
import React from "react";
//  Type
import type { TypeMapRentInfo } from "@api/biz/type";

type Props = {};

const RentBasicInfo = ({ info }: { info: TypeMapRentInfo["res"] | null }) => {
  console.log(info);
  return (
    <Flex w="100%" h="100%" direction="column">
      <Flex
        position="relative"
        mb="1.25rem"
        w="100%"
        justify="center"
        align="center"
        direction="column"
        gap="1.875rem"
      >
        <ElementLine title="매물타입" content={info?.rentType || ""} />
        <ElementLine title="입점 가능일" content={info?.availableDay || ""} />
        <ElementLine
          title="주소"
          content={(info?.addr || "") + (info?.addrDetail || "")}
        />
        <ElementLine title="현업종" content={info?.curUpjong || ""} />
        <ElementLine title="실평수" content={info?.realArea || ""} />
        <ElementLine title="층수" content={info?.floor || ""} />
        <ElementLine title="권리금" content={info?.premiumFee || ""} />
        <ElementLine title="관리비" content={info?.manageFee || ""} />
        <ElementLine title="임대료" content={info?.rentalFee || ""} />
        <ElementLine title="보증금" content={info?.depositFee || ""} />
      </Flex>
    </Flex>
  );
};

const ElementLine = ({
  title,
  content,
}: {
  title: string;
  content: string | number;
}) => {
  return (
    <Flex w="100%" align="center">
      <FormLabel
        display="flex"
        alignItems="flex-start"
        m="0"
        minW="4.4rem"
        w="30%"
        flex="none"
        textStyle="base"
        fontSize="xs"
        fontWeight="strong"
      >
        {title}
      </FormLabel>
      <Text
        textStyle="base"
        fontSize="sm"
        fontWeight="medium"
        color="font.primary"
      >
        {content}
      </Text>
    </Flex>
  );
};

const ElementImgList = ({
  title,
  content,
}: {
  title: string;
  content?: {
    bsDisCode: string;
    bsDisName: string;
  }[];
}) => {
  return (
    <Flex w="100%" align="center">
      <FormLabel
        display="flex"
        alignItems="flex-start"
        m="0"
        minW="4.4rem"
        w="30%"
        flex="none"
        textStyle="base"
        fontSize="xs"
        fontWeight="strong"
      >
        {title}
      </FormLabel>
      {content?.map((li) => {
        return (
          <Text
            textStyle="base"
            fontSize="sm"
            fontWeight="medium"
            color="font.primary"
          >
            {li.bsDisName}
          </Text>
        );
      })}
    </Flex>
  );
};

export default RentBasicInfo;
