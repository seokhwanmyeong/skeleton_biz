//  LIB
import { Flex, Button } from "@chakra-ui/react";
//  Components
import Modal from "../Modal";
import FormSample from "@components/form/FormSample";
//  Form
import { formStoreInfo } from "@page/erp/store/form";

const ModalStoreEditor = ({
  info,
  update,
}: {
  info?: any;
  update: boolean;
}) => {
  const StoreInfoHandler = (val: any) => {
    console.log(val);
  };

  return (
    <Modal
      title={update ? "매장수정" : "매장생성"}
      openBtnText={update ? "매장수정" : "매장생성"}
      cancelBtnText={"Cancel"}
      botBtnComponent={bottomBtn(StoreInfoHandler)}
    >
      <Flex flexDirection="column">
        <FormSample
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

export default ModalStoreEditor;
