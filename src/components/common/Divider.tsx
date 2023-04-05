import { Divider as ChakraDivider } from "@chakra-ui/react";

const Divider = (props: any) => {
  return (
    <ChakraDivider color="font.title" borderBottomWidth="2px" {...props} />
  );
};

export default Divider;
