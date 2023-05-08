//  Lib
import { useCallback, useEffect, useId, useState } from "react";
import {
  Flex,
  Select as ChakraSelect,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  List,
  ListItem,
  Box,
  Text,
} from "@chakra-ui/react";
//  Services
import { addrApiHandler } from "@services/address/sgisDepthAddr";
//  Util: Data
import { addrHCode } from "@util/data/address";
import { IcoDown } from "@src/assets/icons/icon";

type PropsSlct = {
  selectProps?: {};
  variant?: string;
  defalutValue?: string | number;
  defaultText?: string;
  value?: any;
  data: any[];
  opBaseTxt: string;
  opBaseId: string;
  opBaseKey: string;
  onChange: any;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
};

type PropSlctAddr = {
  selectProps?: {};
  selectGroupProps?: {};
  variant?: string;
  value: string;
  onChange: any;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
};

const Select = ({
  selectProps,
  variant,
  value,
  defaultText = "선택",
  defalutValue,
  data,
  opBaseTxt,
  opBaseId,
  opBaseKey,
  onChange,
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  isRequired = false,
}: PropsSlct) => {
  const defaultId = defalutValue ? defalutValue : useId();

  return (
    <ChakraSelect
      {...selectProps}
      variant={variant}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      onChange={(e) => onChange(e.target.value)}
      // defaultValue={defaultId}
      value={value}
      iconSize="0.875rem"
      iconColor="font.placeholder"
      icon={<IcoDown />}
    >
      {!defalutValue && (
        <option key={defaultId} value={defaultId} hidden>
          {defaultText}
        </option>
      )}
      {data?.length > 0 &&
        data.map((option: any, idx: number) => {
          const opKey = option[opBaseKey];
          const opId = option[opBaseId];
          const opTxt = option[opBaseTxt];

          return (
            <option key={`${idx}-${opId}`} value={opKey} id={opId}>
              {opTxt}
            </option>
          );
        })}
    </ChakraSelect>
  );
};

const SelectMenu = () => {
  return (
    <Menu>
      {/* <MenuButton as={Button} rightIcon={<ChevronDownIcon />}> */}
      <MenuButton as={Button}>Your Cats</MenuButton>
      <MenuList>
        <MenuItem minH="48px">Fluffybuns the Destroyer</MenuItem>
        <MenuItem minH="48px">Fluffybuns the Destroyer</MenuItem>
      </MenuList>
    </Menu>
  );
};

const SelectAddr = ({
  selectProps,
  selectGroupProps,
  variant,
  value,
  onChange,
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  isRequired = false,
}: PropSlctAddr) => {
  const [addr, setAddr] = useState({
    top: value?.slice(0, 2) || "total",
    mid: value?.slice(2, 5) || "",
    bot: value?.slice(5, 8) || "",
  });
  const [addrTxt, setAddrTxt] = useState({
    top: value || "",
    mid: value || "",
    bot: value || "",
  });
  const [addrList, setAddrList] = useState<any>({
    top: [{ code: "", address: "전체" }, ...addrHCode],
    mid: [],
    bot: [],
  });

  const selectAddrHandler = (val: any, step: "top" | "mid" | "bot") => {
    let result: string = "total";
    console.log("click");
    switch (step) {
      case "top":
        if (val) {
          addrApiHandler(val).then((res) => {
            setAddr({ top: val, mid: "", bot: "" });
            setAddrList({
              ...addrList,
              mid: res ? [{ code: "", address: "전체" }, ...res] : [],
              bot: [],
            });
          });
        } else {
          setAddr({ top: val, mid: "", bot: "" });
          setAddrList({
            ...addrList,
            mid: [],
            bot: [],
          });
        }
        addrList.top?.map((li: any) => {
          if (li.code === val) {
            setAddrTxt({ ...addrTxt, top: li.address });
            onChange(li.address, val);
          }
        });
        result = val ? val : "total";
        break;
      case "mid":
        if (val) {
          addrApiHandler(val).then((res) => {
            setAddr({ ...addr, mid: val.slice(2, 5), bot: "" });
            setAddrList({
              ...addrList,
              bot: res ? [{ code: "", address: "전체" }, ...res] : [],
            });
          });
        } else {
          setAddr({ ...addr, mid: val, bot: "" });
          setAddrList({
            ...addrList,
            bot: [],
          });
        }

        addrList.mid?.map((li: any) => {
          if (li.code === val) {
            setAddrTxt({ ...addrTxt, mid: li.address });
            onChange(addrTxt.top + " " + li.address.val);
          }
        });
        result = val ? val : addr.top;
        break;
      case "bot":
        setAddr({ ...addr, bot: val.slice(5, 8) });

        addrList.bot?.map((li: any) => {
          if (li.code === val) {
            setAddrTxt({ ...addrTxt, bot: li.address });
            onChange(addrTxt.top + " " + addrTxt.mid + " " + li.address, val);
          }
        });
        result = val ? val : addr.top + addr.mid;
        break;
      default:
        result = val;
        break;
    }

    // onChange(result);
  };

  return (
    <Flex gap={"0.5rem"} w="100%" {...selectGroupProps}>
      <Select
        selectProps={selectProps}
        variant={variant}
        value={addr.top || "total"}
        data={addrList.top}
        opBaseTxt="address"
        opBaseId="code"
        opBaseKey="code"
        onChange={(val: any) => selectAddrHandler(val, "top")}
        defaultText="전체"
        defalutValue="total"
      />
      <Select
        selectProps={selectProps}
        variant={variant}
        value={addr.mid ? addr.top + addr.mid : ""}
        data={addrList.mid}
        opBaseTxt="address"
        opBaseId="code"
        opBaseKey="code"
        onChange={(val: any) => selectAddrHandler(val, "mid")}
        isDisabled={addrList.mid.length > 0 ? false : true}
        defaultText={addrList.mid.length > 0 ? "전체" : "시/군/구"}
        defalutValue=""
      />
      <Select
        selectProps={selectProps}
        variant={variant}
        value={addr.bot ? addr.top + addr.mid + addr.bot : ""}
        data={addrList.bot}
        opBaseTxt="address"
        opBaseId="code"
        opBaseKey="code"
        onChange={(val: any) => selectAddrHandler(val, "bot")}
        isDisabled={addrList.bot.length > 0 ? false : true}
        defaultText={addrList.bot.length > 0 ? "전체" : "읍/면/동"}
        defalutValue=""
      />
    </Flex>
  );
};

const SelectForm = ({
  selectProps,
  variant,
  value,
  defaultText = "선택",
  defalutValue,
  data,
  opBaseTxt,
  opBaseId,
  opBaseKey,
  onChange,
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  isRequired = false,
}: PropsSlct) => {
  const defaultId = defalutValue ? defalutValue : useId();

  return (
    <ChakraSelect
      {...selectProps}
      variant={variant}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      onChange={onChange}
      value={value}
      iconSize="0.875rem"
      iconColor="font.placeholder"
      icon={<IcoDown />}
    >
      {!defalutValue && (
        <option key={defaultId} value={defaultId} hidden>
          {defaultText}
        </option>
      )}
      {data?.length > 0 &&
        data.map((option: any, idx: number) => {
          const opKey = option[opBaseKey];
          const opId = option[opBaseId];
          const opTxt = option[opBaseTxt];

          return (
            <option key={`${idx}-${opId}`} value={opKey} id={opId}>
              {opTxt}
            </option>
          );
        })}
    </ChakraSelect>
  );
};

const SelectBsDisLayer = ({
  value,
  onClick,
}: {
  value: string;
  onClick: any;
}) => {
  return (
    <List display="flex" w="100%" flexDirection="column" gap="0.5rem">
      <SlctList
        text="상권1"
        color="#FADB14"
        isActive={value === "A"}
        onClick={() => {
          value !== "A" && onClick("A");
        }}
      />
      <SlctList
        text="상권2"
        color="#DE9F9F"
        isActive={value === "B"}
        onClick={() => {
          value !== "B" && onClick("B");
        }}
      />
      <SlctList
        text="상권3"
        color="#74D8D2"
        isActive={value === "C"}
        onClick={() => {
          value !== "C" && onClick("C");
        }}
      />
      <SlctList
        text="상권4"
        color="#B3FFB1"
        isActive={value === "D"}
        onClick={() => {
          value !== "D" && onClick("D");
        }}
      />
      <SlctList
        text="상권5"
        color="#EFAEE1"
        isActive={value === "E"}
        onClick={() => {
          value !== "E" && onClick("E");
        }}
      />
    </List>
  );
};

const SlctList = ({
  text,
  isActive = false,
  color,
  onClick,
}: {
  text: string;
  isActive: boolean;
  color: string;
  onClick: any;
}) => {
  return (
    <ListItem
      display="flex"
      w="100%"
      h="2.625rem"
      justifyContent="center"
      alignItems="center"
      gap="2rem"
      border="1px solid"
      bgColor={isActive ? "primary.type7" : "transparent"}
      borderColor={isActive ? "primary.type7" : "system.accessible.gray.type5"}
      borderRadius="12px"
      transition="0.3s"
      cursor="pointer"
      p={{
        fontWeight: isActive ? "strong" : "regular",
        color: isActive ? "font.inverse" : "font.title",
        transition: "0.3s",
      }}
      _hover={{
        bgColor: "primary.type7",
        borderColor: "primary.type7",
        p: {
          fontWeight: "strong",
          color: "font.inverse",
          transition: "0.3s",
        },
      }}
      onClick={onClick}
    >
      <Box w="1.5rem" h="1.5rem" borderRadius="50%" bgColor={color} />
      <Text
        textStyle="base"
        fontSize="xs"
        fontWeight="regular"
        color="font.title"
        transition="0.3s"
      >
        {text}
      </Text>
    </ListItem>
  );
};

export { Select, SelectAddr, SelectBsDisLayer, SelectForm };
