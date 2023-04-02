import { Textarea as ChakraTextarea } from "@chakra-ui/react";

type Props = {};

const TextArea = ({ onChange, ...props }: any) => {
  return (
    <ChakraTextarea
      onChange={(e) => {
        let inputValue = e.target.value;
        onChange(inputValue);
      }}
      {...props}
    />
  );
};

export default TextArea;
