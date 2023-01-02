//  LIB
import { ColumnDef, AccessorColumnDef } from "@tanstack/react-table";
import { read, utils, writeFile, WorkSheet, write } from "xlsx";

const {
  sheet_to_json,
  sheet_to_csv,
  json_to_sheet,
  aoa_to_sheet,
  book_new,
  book_append_sheet,
} = utils;

const errorCode = {
  "0x00": "#NULL!",
  "0x07": "#DIV/0!",
  "0x0F": "#VALUE!",
  "0x17": "#REF!",
  "0x1D": "#NAME?",
  "0x24": "#NUM!",
  "0x2A": "#N/A",
  "0x2B": "#GETTING_DATA",
};

type File = {
  fileName: string;
  data: any;
};

type CsvColumn = {
  title: string;
  key: string;
  t: "b" | "e" | "n" | "d" | "s" | "z";
  isRequired: boolean;
  v: string | number;
  w?: string;
  z?: string;
};

type FormCsv = {
  fileName: string;
  sheetName: string;
  desc: string;
  columns: CsvColumn[];
};

const importFileXlsx = async (
  e: any,
  form: FormCsv
): Promise<File | undefined> => {
  const { files } = e.target;
  const fileExtension = files[0]?.name?.split(".").at(-1);
  const fileName: string = files[0]?.name;

  if (!files || files.length === 0) {
    console.log("Not Import File");
    return;
  } else if (fileExtension === "xlsx" || fileExtension === "csv") {
    return await new Promise<File>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(files[0]);
      fileReader.onload = (e) => {
        let data: any[] = [];
        const error: string[] = [];

        try {
          if (!e.target) {
            console.log("Target not found");
            throw Error;
          }

          const { result } = e.target;
          const xlsxFile = read(result, { type: "binary" });
          for (const sheet in xlsxFile.Sheets) {
            if (xlsxFile.Sheets.hasOwnProperty(sheet)) {
              const transHeader: {
                [key: string]: { key: string; isRequired: boolean };
              } = {};
              const formHeader = form.columns.map((column) => {
                transHeader[column.title] = {
                  key: column.key,
                  isRequired: column.isRequired,
                };

                return column.title;
              });
              const sheetData = sheet_to_json(xlsxFile.Sheets[sheet], {
                range: 1,
              });
              const filterData = sheetData.map((li: any, colIdx: number) => {
                let tmp: { [key: string]: any } = {};

                //  Header Checker
                if (colIdx === 0) {
                  formHeader.map((header: string) => {
                    const dataKeys = Object.keys(li);
                    if (
                      !dataKeys.includes(header) &&
                      transHeader[header].isRequired
                    ) {
                      error.push(`${header} 데이터 열 부재`);
                    }
                  });
                }

                //  isRequired Checker & Trans Header Text
                formHeader.map((key: string, rowIdx: number) => {
                  if (li[key]) {
                    tmp[transHeader[key].key] = li[key];
                  } else if (transHeader[key].isRequired) {
                    error.push(
                      `${rowIdx + 1}열 (${key})-${colIdx + 3}번 행 필수값 오류`
                    );
                  }
                });

                return tmp;
              });

              console.log("File Data", filterData);
              console.log("error", error);
              data = filterData;
            }
          }

          if (error.length > 0) {
            reject(error);
          } else {
            resolve({
              data: data,
              fileName: fileName,
            });
          }
        } catch (e) {
          console.log("error", e);
          reject(e);
        }
      };
    });
  } else {
    alert(`\nfile Extension is not .xlsx or .csv\n`);
    console.log(`\nfile Extension is not .xlsx or .csv\n`);
  }

  return;
};

const exportFileCSV = async (data: any, columns: ColumnDef<any>[]) => {
  let exportHeader: { [key: string]: string } = {};
  const exportKey = columns
    .filter((column: any) => (column?.accessorKey ? true : false))
    .map((column: any) => {
      exportHeader[column.accessorKey] = column.header;
      return column.accessorKey;
    });

  const exportData = data.map((li: any) => {
    let result: { [key: string]: string } = {};
    exportKey.map((key: string) => {
      result[exportHeader[key]] = li[key];
    });

    return result;
  });

  const sheet = json_to_sheet(exportData);
  const workBook = book_new();

  book_append_sheet(workBook, sheet, "매장정보");
  await writeFile(workBook, `매장정보_${Date.now()}.csv`, { bookType: "csv" });
};

const exportFormCsv = (form: FormCsv) => {
  const { fileName, sheetName, desc, columns } = form;
  const header = columns.map((column: CsvColumn) => column.title);
  const sampleColumn = columns.map((column: CsvColumn) => {
    return {
      t: column.t,
      v: column.v,
      w: column.w,
      z: column.z,
    };
  });
  const data = [[desc], [...header], [...sampleColumn]];
  const sheet = aoa_to_sheet(data);
  const workBook = book_new();

  book_append_sheet(workBook, sheet, sheetName);
  writeFile(workBook, `${fileName}.csv`, { bookType: "csv" });
};

export { importFileXlsx, exportFileCSV, exportFormCsv };
export type { FormCsv };
