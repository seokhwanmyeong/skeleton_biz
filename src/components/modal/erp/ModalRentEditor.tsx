//  LIB
import { useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
//  Components
import Modal from "../Modal";
import Form from "@components/form/Form";
//  Form
import { formRentInfo } from "@page/erp/rent/form";

const ModalRentEditor = ({ info, update }: { info?: any; update: boolean }) => {
  const [formData, setFormData] = useState({});

  const bottomBtn = () => {
    const RentInfoHandler = (val: any) => {
      console.log(val);
    };

    return (
      <Button colorScheme="blue" onClick={() => RentInfoHandler(formData)}>
        {update ? "수정하기" : "추가하기"}
      </Button>
    );
  };

  return (
    <Modal
      title={update ? "매물 수정" : "매물 추가"}
      openBtnText={update ? "매물 수정" : "매물 추가"}
      cancelBtnText={"취소"}
      botBtnComponent={bottomBtn()}
    >
      <Flex flexDirection="column" w="50rem">
        <Form
          form={update ? { ...formRentInfo, initVal: info } : formRentInfo}
          onSubmit={setFormData}
        />
      </Flex>
    </Modal>
  );
};

export default ModalRentEditor;
