//  LIB
import { Flex, Button } from "@chakra-ui/react";
//  Components
import Modal from "../Modal";
import Form from "@components/form/Form";
//  Form
import { formStoreInfo } from "@page/erp/store/form";

const ModalAreaEditor = ({ info, update }: { info?: any; update: boolean }) => {
  const StoreInfoHandler = (val: any) => {
    console.log(val);
  };

  return (
    <Modal
      title={update ? "상권수정" : "상권생성"}
      openBtnText={update ? "상권수정" : "상권생성"}
      cancelBtnText={"Cancel"}
      botBtnComponent={bottomBtn(StoreInfoHandler)}
    >
      <Flex flexDirection="column">
        <Form
          form={update ? { ...formStoreInfo, initVal: info } : formStoreInfo}
          onSubmit={StoreInfoHandler}
        />
      </Flex>
    </Modal>
  );
};

const bottomBtn = (_onClick: (val: any) => any) => {
  return (
    <Button variant="ghost" onClick={_onClick}>
      Complete
    </Button>
  );
};

export default ModalAreaEditor;
