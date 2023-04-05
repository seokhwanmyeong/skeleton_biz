//  LIB
import { Fragment, useState, useRef, useCallback } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { FormikProps } from "formik";
//  Components
import Modal from "@components/modal/Modal";
import Form from "@components/form/Form";
//  Form
import { formRentInfo } from "@page/erp/rent/form";

const ModalRentEditor = ({ info, update }: { info?: any; update: boolean }) => {
  const formRef = useRef<any>();

  const rentInfoHandler = useCallback(() => {
    console.log(formRef.current);
  }, [formRef]);

  const bottomBtn = () => {
    return (
      <Button colorScheme="blue" onClick={rentInfoHandler}>
        {update ? "수정하기" : "추가하기"}
      </Button>
    );
  };

  return (
    <Modal
      isOpen={false}
      onClose={() => {}}
      title={update ? "매물 수정" : "매물 추가"}
      // openBtnText={update ? "매물 수정" : "매물 추가"}
      cancelText={"취소"}
      botBtnComponent={bottomBtn()}
    >
      <Flex flexDirection="column" w="50rem">
        <Form
          innerRef={formRef}
          form={update ? { ...formRentInfo, initVal: info } : formRentInfo}
          activeBtn={false}
          // onSubmit={submitForm}
        />
      </Flex>
    </Modal>
  );
};

export default ModalRentEditor;
