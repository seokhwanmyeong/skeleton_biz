//  LIB
import { useState } from "react";
import { Flex, Button, Text } from "@chakra-ui/react";
//  Components
import Modal from "../Modal";
import { InputFile } from "@components/common/Input";
//  Util
import { exportFormCsv } from "@util/file/manageFile";
import { TypeFormCsv } from "@util/data/fileCSV";

const ModalXlsxController = ({ csvInfo }: { csvInfo: TypeFormCsv }) => {
  const [fileData, setFileData] = useState([]);

  const onSubmiFile = () => {
    console.log(`\nimport Api Start`);
    console.log(fileData);
  };

  return (
    <Modal
      title="엑셀파일"
      openBtnText="엑셀파일"
      cancelBtnText={"Cancel"}
      botBtnComponent={bottomBtn(onSubmiFile)}
    >
      <Flex flexDirection="column" gap={5}>
        <Flex flexDirection="column" gap={2}>
          <Text>양식 다운로드</Text>
          <Button onClick={() => exportFormCsv(csvInfo)}>양식 다운로드</Button>
        </Flex>
        <Flex flexDirection="column" gap={2}>
          <Text>파일 업로드</Text>
          <InputFile
            accept={".xlsx, .csv"}
            form={csvInfo}
            addonProps={{ width: "auto" }}
            _onChange={setFileData}
          />
        </Flex>
      </Flex>
    </Modal>
  );
};

const bottomBtn = (_onClick: (val: any) => any) => {
  return (
    <Button variant="ghost" onClick={_onClick}>
      Import Data
    </Button>
  );
};

export default ModalXlsxController;
