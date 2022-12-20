//  Components
import { Radio, RadioGroup } from "@chakra-ui/react";

type RadioProps = {
  _onChange: any;
  value: any;
  fieldKey: string;
  values?: { text: string; value: string | number }[];
  variant?: string;
};

const RadioBox = ({
  _onChange,
  value,
  fieldKey,
  values,
  variant,
}: RadioProps) => {
  return (
    <RadioGroup
      key={`radioG=${fieldKey}`}
      name={fieldKey}
      onChange={(value: any) => _onChange(value)}
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
