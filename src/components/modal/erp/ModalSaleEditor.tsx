//  LIB
import { useState, Fragment } from "react";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
//  Components
import Modal from "@components/modal/Modal";
import XlsxController from "@components/modal/XlsxController";
//  Util
import { csvStoreSale } from "@util/data/fileCSV";
//  Icon
import { IcoUpload } from "@assets/icons/icon";

const ModalSaleEditor = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileData, setFileData] = useState([]);

  const bottomBtn = (fileData: any) => {
    const onSubmiFile = (result: any) => {
      console.log(`\nimport Api Start`);
      console.log(fileData);
      onClose();
    };

    return (
      <Button variant="base" onClick={() => onSubmiFile(fileData)}>
        매출파일 등록
      </Button>
    );
  };

  return (
    <Fragment>
      <Button variant={"upload"} onClick={onOpen}>
        <IcoUpload w="0.875rem" h="0.875rem" color={"#00000040"} />
        Click to Upload
      </Button>
      <Modal
        title={"매출추가"}
        cancelText={"취소"}
        botBtnComponent={bottomBtn(fileData)}
        isOpen={isOpen}
        onClose={onClose}
      >
        <Flex flexDirection="column" minW="50rem">
          <XlsxController csvInfo={csvStoreSale} onChange={setFileData} />
        </Flex>
      </Modal>
    </Fragment>
  );
};

export default ModalSaleEditor;
