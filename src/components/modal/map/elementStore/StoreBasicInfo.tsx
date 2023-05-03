import { Flex, FormLabel, Text } from "@chakra-ui/react";
import React from "react";
//  Type
import type { TypeMapStoreInfo } from "@api/biz/type";

type Props = {};

const StoreBasicInfo = ({ info }: { info: TypeMapStoreInfo["res"] | null }) => {
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
        <ElementLine title="매장코드" content={info?.storeCode || "-"} />
        <ElementLine title="매장타입" content={info?.storeType || "-"} />
        <ElementLine title="매장상태" content={info?.storeStatus || "-"} />
        <ElementLine title="매장 연락처" content={info?.storePhone || "-"} />
        <ElementLine title="사업자 등록번호" content={info?.bsNum || "-"} />
        <ElementLine title="대표자" content={info?.ownerName || "-"} />
        <ElementLine title="대표자 연락처" content={info?.ownerPhone || "-"} />
        <ElementLine
          title="주소"
          content={(info?.addr || "") + (info?.addrDetail || "")}
        />
        <ElementLine title="" content={info?.addrDetail || "-"} />
        <ElementLineList title="연동상권" content={info?.linkBsDis || []} />
      </Flex>
    </Flex>
  );
};

const ElementLine = ({
  title,
  content,
}: {
  title: string;
  content: string;
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

const ElementLineList = ({
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

export default StoreBasicInfo;
