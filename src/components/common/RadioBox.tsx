import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

type RadioProps = {
  setFieldValue: (key: string, value: string) => {};
  value: any;
  fieldKey: string;
  values?: { text: string; value: string | number }[];
  variant?: string;
};

const RadioBox = ({
  setFieldValue,
  value,
  fieldKey,
  values,
  variant,
}: RadioProps) => {
  return (
    <RadioGroup
      key={`radioG=${fieldKey}`}
      name={fieldKey}
      onChange={(value: any) => setFieldValue(fieldKey, value)}
      value={value}
      variant={variant}
    >
      {values &&
        values.map((li: { text: string; value: string | number }) => (
          <Radio key={`radio-${li.value}`} value={li.value}>
            {li.text}
          </Radio>
        ))}
    </RadioGroup>
  );
};

export { RadioBox, type RadioProps };
