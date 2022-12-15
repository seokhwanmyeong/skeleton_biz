import React from "react";
import FormSample from "@src/components/form/FormSample";
import { Flex } from "@chakra-ui/react";
import { formTest } from "@src/util/data/formData";

type Props = {};

const ErpForm = (props: Props) => {
  const onSubmitTest = (val: any) => {
    console.log("Result Form", val);
  };

  return (
    <Flex>
      <FormSample form={formTest} onSubmit={onSubmitTest} />
    </Flex>
  );
};

export default ErpForm;
