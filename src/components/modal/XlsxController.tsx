//  LIB
import { Flex, Button, Text } from "@chakra-ui/react";
//  Components
import { InputFile } from "@components/common/Input";
//  Util
import { exportFormCsv } from "@util/file/manageFile";
import { TypeFormCsv } from "@util/data/fileCSV";

const XlsxController = ({
  csvInfo,
  onChange,
}: {
  csvInfo: TypeFormCsv;
  onChange: any;
}) => {
  return (
    <Flex flexDirection="column" gap={5} w="100%">
      <Flex flexDirection="row" alignItems="center" gap={2}>
        <Button variant="base" onClick={() => exportFormCsv(csvInfo)}>
          양식 다운로드
        </Button>
        <Text textStyle="base">{csvInfo.fileName + ".csv"}</Text>
      </Flex>
      <InputFile
        accept={".xlsx, .csv"}
        form={csvInfo}
        addonProps={{ width: "auto" }}
        onChange={onChange}
      />
    </Flex>
  );
};

export default XlsxController;
