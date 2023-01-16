//  LIB
import { useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
//  Components
import Modal from "../Modal";
import Form from "@components/form/Form";
//  Form
import { formClientInfo } from "@page/erp/client/form";

const ModalClientEditor = ({
  info,
  update,
}: {
  info?: any;
  update: boolean;
}) => {
  const [formData, setFormData] = useState({});

  const bottomBtn = () => {
    const RentInfoHandler = (val: any) => {
      console.log(val);
    };

    return (
      <Button colorScheme="blue" onClick={() => RentInfoHandler(formData)}>
        {update ? "수정하기" : "등록하기"}
      </Button>
    );
  };

  return (
    <Modal
      title={update ? "고객수정" : "고객등록"}
      openBtnText={update ? "고객수정" : "고객등록"}
      cancelBtnText={"취소"}
      botBtnComponent={bottomBtn()}
    >
      <Flex flexDirection="column" w="50rem">
        <Form
          form={update ? { ...formClientInfo, initVal: info } : formClientInfo}
          onSubmit={setFormData}
        />
      </Flex>
    </Modal>
  );
};

export default ModalClientEditor;
