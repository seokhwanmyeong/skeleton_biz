//  LIB
import { Flex, Button } from "@chakra-ui/react";
//  Components
import Modal from "../Modal";
import Form from "@components/form/Form";
//  Form
import { formStoreInfo } from "@page/erp/store/form";

const ModalBrandStandEditor = ({
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
      title={update ? "브밴드기준 수정" : "브밴드기준 생성"}
      openBtnText={update ? "브밴드기준 수정" : "브밴드기준 생성"}
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

const bottomBtn = (onClick: (val: any) => any) => {
  return (
    <Button variant="ghost" onClick={onClick}>
      Complete
    </Button>
  );
};

export default ModalBrandStandEditor;
