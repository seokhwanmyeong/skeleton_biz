//  LIB
import { memo } from "react";
import { Flex } from "@chakra-ui/react";
//  Components
import Form from "@components/form/Form";

const SearchBox = ({ setReq, form }: any) => {
  const onSubmitSearch = (val: any) => {
    console.log("search val", val);
    setReq(val);
  };

  return (
    <Flex
      p="2rem 2rem"
      border="1px solid"
      borderColor="primary.main.bdColor"
      borderRadius="base"
    >
      <Form form={form} onSubmit={onSubmitSearch} />
    </Flex>
  );
};

export default memo(SearchBox);
