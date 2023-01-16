//  Components
import { Radio, RadioGroup } from "@chakra-ui/react";

type RadioProps = {
  radioProps?: {};
  onChange: any;
  value: any;
  fieldKey: string;
  values?: { text: string; value: string | number }[];
  variant?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
};

const RadioBox = ({
  radioProps,
  onChange,
  value,
  fieldKey,
  values,
  variant,
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  isRequired = false,
}: RadioProps) => {
  return (
    <RadioGroup
      key={`radioG=${fieldKey}`}
      name={fieldKey}
      onChange={(value: any) => onChange(value)}
      value={value}
      variant={variant}
      display="flex"
      alignItems="center"
      gap={2}
      {...radioProps}
    >
      {values &&
        values.map((li: { text: string; value: string | number }) => (
          <Radio
            key={`radio-${li.value}`}
            value={li.value}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            isReadOnly={isReadOnly}
            isRequired={isRequired}
          >
            {li.text}
          </Radio>
        ))}
    </RadioGroup>
  );
};

export { RadioBox, type RadioProps };
