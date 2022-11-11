//  Lib
import React from "react";
import { Select as ChakraSelect } from "@chakra-ui/react";

type Props = {};

const Select = (props: any) => {
  const {
    selectProps,
    defaultText,
    data,
    opBaseTxt,
    opBaseId,
    opBaseKey,
    event,
    isDisabled,
    isInvalid,
    isReadOnly,
    isRequired,
  } = props;

  return (
    <ChakraSelect
      {...selectProps}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      onChange={event}
    >
      <option hidden disabled>
        {defaultText}
      </option>
      {data.map((option: any) => {
        const opKey = option[opBaseKey];
        const opId = option[opBaseId];
        const opTxt = option[opBaseTxt];

        return (
          <option key={opKey} value={option} id={opId}>
            {opTxt}
          </option>
        );
      })}
    </ChakraSelect>
  );
};

export default Select;
