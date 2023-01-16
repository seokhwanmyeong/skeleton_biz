//  LIB
import { useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
//  Components
import Modal from "@components/modal/Modal";
import XlsxController from "@components/modal/XlsxController";
//  Util
import { csvStoreSale } from "@util/data/fileCSV";

const ModalSaleEditor = () => {
  const [fileData, setFileData] = useState([]);

  return (
    <Modal
      title="매출추가"
      openBtnText="매출추가"
      cancelBtnText={"Cancel"}
      botBtnComponent={bottomBtn(fileData)}
    >
      <Flex flexDirection="column" w="50rem">
        <XlsxController csvInfo={csvStoreSale} onChange={setFileData} />
      </Flex>
    </Modal>
  );
};

const bottomBtn = (fileData: any) => {
  const onSubmiFile = (result: any) => {
    console.log(`\nimport Api Start`);
    console.log(fileData);
  };

  return (
    <Button variant="base" onClick={() => onSubmiFile(fileData)}>
      매출파일 등록
    </Button>
  );
};

export default ModalSaleEditor;
