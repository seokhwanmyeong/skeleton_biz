//  Lib
import { Button, Flex, FormLabel, Text } from "@chakra-ui/react";
//  Icon
import { IcoPlusSquare02, IcoUpdate } from "@assets/icons/icon";
//  Type
import type { RentInfo } from "@api/bizSub/type";

type Props = {};

const RentBasicInfo = ({ info }: { info: RentInfo | null }) => {
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
        gap="0.5rem"
      >
        <Flex w="100%" gap="0.25rem">
          <Flex
            w="20%"
            h="62px"
            direction="column"
            justify="center"
            align="center"
            gap="0.75rem"
            bgColor="neutral.gray2"
            border="1px dashed"
            borderColor="neutral.gray5"
            borderRadius="2px"
          >
            <Text
              fontFamily="main"
              fontWeight="regular"
              fontSize="xs"
              lineHeight="1.375rem"
              color="font.secondary"
            >
              No Image
            </Text>
          </Flex>
          <Flex
            w="20%"
            h="62px"
            direction="column"
            justify="center"
            align="center"
            gap="0.75rem"
            bgColor="neutral.gray2"
            border="1px dashed"
            borderColor="neutral.gray5"
            borderRadius="2px"
          >
            <Text
              fontFamily="main"
              fontWeight="regular"
              fontSize="xs"
              lineHeight="1.375rem"
              color="font.secondary"
            >
              No Image
            </Text>
          </Flex>
          <Flex
            w="20%"
            h="62px"
            direction="column"
            justify="center"
            align="center"
            gap="0.75rem"
            bgColor="neutral.gray2"
            border="1px dashed"
            borderColor="neutral.gray5"
            borderRadius="2px"
          >
            <Text
              fontFamily="main"
              fontWeight="regular"
              fontSize="xs"
              lineHeight="1.375rem"
              color="font.secondary"
            >
              No Image
            </Text>
          </Flex>
          <Flex
            w="20%"
            h="62px"
            direction="column"
            justify="center"
            align="center"
            gap="0.75rem"
            bgColor="neutral.gray2"
            border="1px dashed"
            borderColor="neutral.gray5"
            borderRadius="2px"
          >
            <Text
              fontFamily="main"
              fontWeight="regular"
              fontSize="xs"
              lineHeight="1.375rem"
              color="font.secondary"
            >
              No Image
            </Text>
          </Flex>
          <Flex
            w="20%"
            h="62px"
            direction="column"
            justify="center"
            align="center"
            gap="0.75rem"
            bgColor="neutral.gray2"
            border="1px dashed"
            borderColor="neutral.gray5"
            borderRadius="2px"
          >
            <Text
              fontFamily="main"
              fontWeight="regular"
              fontSize="xs"
              lineHeight="1.375rem"
              color="font.secondary"
            >
              No Image
            </Text>
          </Flex>
        </Flex>
        <ElementLine title="매물타입" content={info?.rentType || ""} />
        <ElementLine
          title="입점 가능일"
          content={String(info?.availableDay) || ""}
        />
        <ElementLine
          title="주소"
          content={(info?.addrNew || "") + (info?.addrDetail || "")}
        />
        <ElementLine title="현업종" content={info?.curUpjong || ""} />
        <ElementLine title="실평수" content={info?.size || ""} />
        <ElementLine title="층수" content={info?.floor || ""} />
        <ElementLine title="권리금" content={info?.premiumFee || ""} />
        <ElementLine title="관리비" content={info?.manageFee || ""} />
        <ElementLine title="임대료" content={info?.rentalFee || ""} />
        <ElementLine title="보증금" content={info?.depositFee || ""} />
      </Flex>
      <Flex w="100%" direction="column" align="center" gap="0.25rem">
        <Button
          variant="modalSubmit"
          w="70%"
          bg="transparent"
          color="primary.type8"
          zIndex={1}
          _hover={{
            bg: "transparent",
          }}
          onClick={() => {
            console.log("click");
          }}
        >
          <IcoUpdate width="0.875rem" height="0.875rem" />
          수정하기
        </Button>
        <Button
          variant="modalSubmit"
          w="70%"
          bg="primary.type7"
          color="font.inverse"
          zIndex={1}
          _hover={{
            bg: "primary.type7",
            color: "font.inverse",
          }}
          onClick={() => {
            console.log("click");
          }}
        >
          <IcoPlusSquare02 width="0.875rem" height="0.875rem" />
          매장 등록
        </Button>
      </Flex>
    </Flex>
  );
};

const ElementLine = ({
  noborder = false,
  title,
  content,
}: {
  noborder?: boolean;
  title: string;
  content: string | number;
}) => {
  return (
    <Flex
      pb={noborder ? "0" : "0.5rem"}
      w="100%"
      align="center"
      borderBottom={noborder ? "none" : "1px solid"}
    >
      <FormLabel
        display="flex"
        alignItems="flex-start"
        m="0"
        minW="4.4rem"
        w="40%"
        flex="none"
        textStyle="base"
        fontSize="sm"
        fontWeight="strong"
        lineHeight="1.5rem"
      >
        {title}
      </FormLabel>
      <Text
        textStyle="base"
        fontSize="sm"
        fontWeight="medium"
        color="font.primary"
        lineHeight="1.5rem"
      >
        {content}
      </Text>
    </Flex>
  );
};

export default RentBasicInfo;
