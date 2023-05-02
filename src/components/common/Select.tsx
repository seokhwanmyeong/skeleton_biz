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
            onChange(li.address);
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
            onChange(addrTxt.top + " " + li.address);
          }
        });
        result = val ? val : addr.top;
        break;
      case "bot":
        setAddr({ ...addr, bot: val.slice(5, 8) });

        addrList.bot?.map((li: any) => {
          if (li.code === val) {
            setAddrTxt({ ...addrTxt, bot: li.address });
            onChange(addrTxt.top + " " + addrTxt.mid + " " + li.address);
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

const SelectBsDisLayer = () => {
  return null;
};

export { Select, SelectAddr, SelectBsDisLayer };
