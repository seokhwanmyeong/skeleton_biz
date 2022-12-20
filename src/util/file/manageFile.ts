import * as XLSX from "xlsx";

const fileXlsxHandler = (e: any) => {
  const { files } = e.target;
  const fileReader = new FileReader();

  fileReader.onload = (e) => {
    try {
      if (!e.target) {
        console.log("e.target not found");
        return;
      }

      const { result } = e.target;
      const workbook = XLSX.read(result, { type: "binary" });
      let data: any[] = [];

      for (const sheet in workbook.Sheets) {
        if (workbook.Sheets.hasOwnProperty(sheet)) {
          const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

          let sheetName: string = "",
            sheetHeader: any[] = [],
            tableData: any[] = [];

          sheetData.map((li: any, idx: number) => {
            if (idx === 0) {
              sheetName = li?.__EMPTY;
            } else if (idx === 1) {
              sheetHeader = Object.values(li);
            } else {
              let tmp: { [key: string | number]: string | number } = {};
              let tdKey: (string | number)[] = Object.values(li);
              sheetHeader.forEach((header, headerIdx) => {
                tmp[header] = tdKey[headerIdx];
              });

              tableData[idx - 2] = tmp;
            }
          });

          const formatData = {
            sheetName: sheetName,
            header: sheetHeader,
            tableData: tableData,
          };
          formatData.sheetName && data.push(formatData);
        }
      }
      console.log("File Data", data);
    } catch (e) {
      console.log("error", e);
    }
  };

  fileReader.readAsBinaryString(files[0]);
};

const fileImgHandler = () => {};

export { fileXlsxHandler, fileImgHandler };
