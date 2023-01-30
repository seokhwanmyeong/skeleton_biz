//  Lib
import { HTMLProps, useRef, useEffect } from "react";
import {
  Flex,
  Checkbox as ChakraCheckbox,
  CheckboxGroup as ChakraCheckboxGroup,
} from "@chakra-ui/react";
//  Components
import Tag from "@components/common/Tag";

type ChekboxProps = {
  title?: string;
  isChecked?: boolean;
  onChange?: any;
  value?: any;
};

interface ChekboxTagProps extends ChekboxProps {
  isDisabled?: boolean;
  isCustom?: boolean;
  children?: any;
}

const CheckBox = ({ title, isChecked, onChange, value }: ChekboxProps) => {
  return (
    <ChakraCheckbox isChecked={isChecked} onChange={onChange} value={value}>
      {title}
    </ChakraCheckbox>
  );
};

const CheckBoxTag = ({
  title,
  isChecked,
  isDisabled = false,
  onChange,
  value,
}: ChekboxTagProps) => {
  return (
    <ChakraCheckbox
      variant="withTag"
      isChecked={isChecked}
      onChange={onChange}
      value={value}
      isDisabled={isDisabled}
    >
      <Tag
        variant="checkbox"
        key={`tag-${title}`}
        text={title ?? ""}
        hasBtn={false}
        tagBtn={true}
        isChecked={isChecked}
      />
    </ChakraCheckbox>
  );
};

const TableCheckBox = ({
  indeterminate,
  checked,
  onChange,
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <ChakraCheckbox
      key={`td-chk-total`}
      ref={ref}
      isChecked={checked}
      onChange={(e) => {
        e.stopPropagation();
        onChange && onChange(e);
      }}
    />
  );
};

const CheckboxGroup = ({
  chkboxData,
  chkValue,
  defaultValue = [],
  isDisabled = false,
  onChange,
  variant,
  activeTotal = false,
  parseTotalTxt = "전체",
}: {
  chkboxData: { text: string; value: string | number }[];
  chkValue: (string | number)[];
  defaultValue?: (string | number)[];
  isDisabled?: boolean;
  onChange: (value: (string | number)[] | string) => void;
  variant?: string;
  activeTotal?: boolean;
  parseTotalTxt?: string;
}) => {
  const originLength = chkboxData.length;

  const chkHandler = (val: (string | number)[]) => {
    const exceptTotal = val.filter((l: string | number) => l !== "total");

    if (activeTotal) {
      if (exceptTotal.length === originLength) {
        onChange("total");
      } else {
        onChange(exceptTotal.length === 0 ? "total" : exceptTotal);
      }
    } else {
      onChange(exceptTotal);
    }
  };

  const totalTrans = () => {
    if (activeTotal) {
      if (Array.isArray(chkValue)) {
        return chkValue.length === originLength ? ["total"] : chkValue;
      } else {
        return ["total"];
      }
    } else {
      return chkValue;
    }
  };

  return (
    <ChakraCheckboxGroup
      defaultValue={activeTotal ? ["total"] : defaultValue}
      value={activeTotal ? totalTrans() : chkValue}
      isDisabled={isDisabled}
      onChange={chkHandler}
      variant={variant}
    >
      <Flex w="100%" justifyContent="space-between">
        {activeTotal && (
          <ChakraCheckbox
            onChange={() => onChange("total")}
            key={`check-total`}
            value={"total"}
            fontSize="xs"
            lineHeight="1.2rem"
          >
            {parseTotalTxt}
          </ChakraCheckbox>
        )}
        {chkboxData.map((data: { text: string; value: string | number }) => (
          <ChakraCheckbox
            key={`check-${data.value}`}
            value={data.value}
            fontSize="xs"
            lineHeight="1.2rem"
          >
            {data.text}
          </ChakraCheckbox>
        ))}
      </Flex>
    </ChakraCheckboxGroup>
  );
};

export { CheckBox, CheckBoxTag, TableCheckBox, CheckboxGroup };
