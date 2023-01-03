//  Lib
import { useCallback, useEffect, useId, useState } from "react";
import { Flex, Select as ChakraSelect } from "@chakra-ui/react";
//  Services
import { addrApiHandler } from "@services/address/sgisDepthAddr";
//  Util: Data
import { addrHCode } from "@util/data/address";

type PropsSlct = {
  selectProps?: {};
  variant?: string;
  defalutValue?: string;
  defaultText?: string;
  data: any[];
  opBaseTxt: string;
  opBaseId: string;
  opBaseKey: string;
  _onChange: any;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
};

type PropSlctAddr = {
  variant?: string;
  value: string;
  _onChange: any;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
};

const Select = ({
  selectProps,
  variant,
  defaultText = "선택",
  defalutValue,
  data,
  opBaseTxt,
  opBaseId,
  opBaseKey,
  _onChange,
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
      onChange={_onChange}
      defaultValue={defaultId}
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
            <option key={`${idx}-${opKey}`} value={opKey} id={opId}>
              {opTxt}
            </option>
          );
        })}
    </ChakraSelect>
  );
};

const SelectAddr = ({
  variant,
  value,
  _onChange,
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
  const [addrList, setAddrList] = useState<any>({
    top: [{ code: "", address: "전체" }, ...addrHCode],
    mid: [],
    bot: [],
  });

  const selectAddrHandler = (e: any, step: "top" | "mid" | "bot") => {
    const value = e.target.value;
    let result: string = "total";

    switch (step) {
      case "top":
        if (value) {
          addrApiHandler(value).then((res) => {
            setAddr({ top: value, mid: "", bot: "" });
            setAddrList({
              ...addrList,
              mid: res ? [{ code: "", address: "전체" }, ...res] : [],
              bot: [],
            });
          });
        } else {
          setAddr({ top: value, mid: "", bot: "" });
          setAddrList({
            ...addrList,
            mid: [],
            bot: [],
          });
        }
        result = value ? value : "total";
        break;
      case "mid":
        if (value) {
          console.log(value);
          addrApiHandler(value).then((res) => {
            setAddr({ ...addr, mid: value.slice(2, 5), bot: "" });
            setAddrList({
              ...addrList,
              bot: res ? [{ code: "", address: "전체" }, ...res] : [],
            });
          });
        } else {
          setAddr({ ...addr, mid: value, bot: "" });
          setAddrList({
            ...addrList,
            bot: [],
          });
        }
        result = value ? value : addr.top;
        break;
      case "bot":
        setAddr({ ...addr, bot: value.slice(5, 8) });
        result = value ? value : addr.top + addr.mid;
        break;
      default:
        result = value;
        break;
    }
    _onChange(result);
  };

  return (
    <Flex gap={2}>
      <Select
        variant={variant}
        data={addrList.top}
        opBaseTxt="address"
        opBaseId="code"
        opBaseKey="code"
        _onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          selectAddrHandler(e, "top")
        }
        defaultText="전체"
        defalutValue="total"
      />
      <Select
        variant={variant}
        data={addrList.mid}
        opBaseTxt="address"
        opBaseId="code"
        opBaseKey="code"
        _onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          selectAddrHandler(e, "mid")
        }
        isDisabled={addrList.mid.length > 0 ? false : true}
        defaultText="시/군/구"
      />
      <Select
        variant={variant}
        data={addrList.bot}
        opBaseTxt="address"
        opBaseId="code"
        opBaseKey="code"
        _onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          selectAddrHandler(e, "bot")
        }
        isDisabled={addrList.bot.length > 0 ? false : true}
        defaultText="읍/면/동"
      />
    </Flex>
  );
};

export { Select, SelectAddr };
