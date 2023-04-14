import { FormErrorMessage } from "@chakra-ui/react";

const FormErrorMsg = ({ children }: any) => {
  return (
    <FormErrorMessage
      m="0"
      p="0 0.25rem"
      textStyle="base"
      fontSize="xs"
      fontWeight="regular"
      lineHeight="1.375rem"
      color="system.default.red"
    >
      {children}
    </FormErrorMessage>
  );
};

export default FormErrorMsg;
