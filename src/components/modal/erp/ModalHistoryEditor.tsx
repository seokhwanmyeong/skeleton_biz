//  LIB
import { useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
//  Components
import Modal from "../Modal";
import Form from "@components/form/Form";
//  Form
import { formHistoryInfo } from "@page/erp/history/form";

const ModalHistoryEditor = ({
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
      title={update ? "고객수정" : "히스토리 작성"}
      openBtnText={update ? "고객수정" : "히스토리 작성"}
      cancelBtnText={"취소"}
      botBtnComponent={bottomBtn()}
    >
      <Flex flexDirection="column" w="50rem">
        <Form
          form={
            update ? { ...formHistoryInfo, initVal: info } : formHistoryInfo
          }
          onSubmit={setFormData}
        />
      </Flex>
    </Modal>
  );
};

export default ModalHistoryEditor;
