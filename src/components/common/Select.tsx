//  Lib
import React from "react";
import { Select as ChakraSelect } from "@chakra-ui/react";

type Props = {};

const Select = ({
  selectProps,
  variant,
  defaultText = "선택",
  data,
  opBaseTxt,
  opBaseId,
  opBaseKey,
  _onChange,
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  isRequired = false,
}: {
  selectProps?: {};
  variant?: string;
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
}) => {
  return (
    <ChakraSelect
      {...selectProps}
      variant={variant}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      onChange={_onChange}
    >
      <option hidden disabled>
        {defaultText}
      </option>
      {data.map((option: any, idx: number) => {
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

const SelectApi = () => {};

export default Select;
