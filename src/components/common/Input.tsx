import { Fragment, useState, useRef, useMemo } from "react";
import {
  chakra,
  Input as ChakraInput,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { importDateConverter, exportDateConverter } from "@src/util/time/date";
import * as XLSX from "xlsx";
import BaseTable from "../table/BaseTable";
//  LIB
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { BaseColumns, Sample } from "@util/type/tableType";

interface InputProps {
  fieldKey?: string;
  type?: string;
  value?: any;
  _onChange: any;
  variant?: string;
  inputProps?: {};
  placeholder?: string;
  _placeholder?: Object;
  focusBorderColor?: string;
  errorBorderColor?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
}

interface PropsPwd extends InputProps {
  type?: "single" | "chk";
  groupProps?: {};
  addonProps?: {};
  btnProps?: {};
  autoComplete?: "on" | "off";
}

interface PropsAddon extends InputProps {
  groupProps?: {};
  addonText?: string;
  addonType?: string;
  addonProps?: Object;
}

interface PropsDate extends InputProps {
  type?: "single" | "double";
  value?: { start: string; end: string } | string | undefined;
  groupProps?: {};
  addonProps?: {};
  btnProps?: {};
}

interface PropsFile extends InputProps {
  accept: ".xlsx";
  type: "file";
  groupProps?: {};
  addonProps?: {};
  btnProps?: {};
}

const Input = ({
  fieldKey,
  type = "text",
  value,
  _onChange,
  variant,
  inputProps,
  placeholder,
  _placeholder,
  focusBorderColor,
  errorBorderColor,
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  isRequired = false,
  ...rest
}: InputProps) => {
  return (
    <ChakraInput
      id={fieldKey}
      type={type}
      value={value}
      onChange={(e: any) => _onChange(e.target.value)}
      variant={variant}
      placeholder={placeholder}
      _placeholder={_placeholder}
      focusBorderColor={focusBorderColor}
      errorBorderColor={errorBorderColor}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      {...rest}
    />
  );
};

const InputPwd = ({
  fieldKey,
  type = "single",
  value,
  _onChange,
  groupProps,
  addonProps,
  btnProps,
  inputProps,
  placeholder,
  _placeholder,
  focusBorderColor,
  errorBorderColor,
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  isRequired = false,
  variant = "filled",
  autoComplete = "off",
}: PropsPwd) => {
  const [show, setShow] = useState(false);
  const [chkVal, setChkVal] = useState(undefined);
  const handleClick = () => setShow(!show);

  return (
    <>
      <InputGroup {...groupProps} variant={variant}>
        <ChakraInput
          id={fieldKey}
          {...inputProps}
          value={value}
          onChange={(e: any) => _onChange(e.target.value)}
          placeholder={placeholder}
          _placeholder={_placeholder}
          focusBorderColor={focusBorderColor}
          errorBorderColor={errorBorderColor}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
        />
        <InputRightElement {...addonProps}>
          <Button {...btnProps} onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      {type === "chk" && (
        <ChakraInput
          {...inputProps}
          id={`${fieldKey}-chk`}
          onChange={(e: any) => setChkVal(e.target.value)}
          placeholder={placeholder}
          _placeholder={_placeholder}
          focusBorderColor={focusBorderColor}
          errorBorderColor={errorBorderColor}
          isDisabled={isDisabled}
          isInvalid={chkVal === undefined ? false : chkVal !== value}
          isReadOnly={isReadOnly}
          isRequired={true}
          autoComplete="off"
        />
      )}
    </>
  );
};

const InputPhone = () => {};

const InputEmail = () => {};

const InputDate = ({
  fieldKey,
  type = "single",
  value: date,
  _onChange,
  variant,
  inputProps,
  placeholder,
  _placeholder,
  focusBorderColor,
  errorBorderColor,
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  isRequired = false,
  ...rest
}: PropsDate) => {
  const validate = (startD: any, endD: any) =>
    new Date(startD).getTime() > new Date(endD).getTime();

  const dateHandler = (dateVal: string, both: "start" | "end") => {
    if (typeof date === ("string" || undefined) && type === "single") {
      _onChange(dateVal);
    } else if (typeof date === "object") {
      if (both === "start") {
        _onChange({ start: dateVal, end: date.end });
      } else if (both === "end") {
        _onChange({ start: date.start, end: dateVal });
      }
    }
  };

  return (
    <>
      <ChakraInput
        id={fieldKey}
        type="date"
        value={
          date === undefined
            ? String(new Date())
            : typeof date === "string"
            ? date
            : date.start
        }
        onChange={(e: any) => dateHandler(e.target.value, "start")}
        variant={variant}
        placeholder={placeholder}
        _placeholder={_placeholder}
        focusBorderColor={focusBorderColor}
        errorBorderColor={errorBorderColor}
        isDisabled={isDisabled}
        isInvalid={
          typeof date === "object" && date
            ? validate(date.start, date.end)
            : isInvalid
        }
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        {...rest}
      />
      {type === "double" && typeof date === "object" && (
        <ChakraInput
          id={`${fieldKey}-end`}
          type="date"
          value={date.end === undefined ? String(new Date()) : date.end}
          onChange={(e: any) => dateHandler(e.target.value, "end")}
          variant={variant}
          placeholder={placeholder}
          _placeholder={_placeholder}
          focusBorderColor={focusBorderColor}
          errorBorderColor={errorBorderColor}
          isDisabled={isDisabled}
          isInvalid={validate(date.start, date.end)}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
          {...rest}
        />
      )}
    </>
  );
};

const InputBtn = (props: any) => {
  const {
    groupProps,
    addonProps,
    btnProps,
    btnText,
    event,
    inputProps,
    placeholder,
    _placeholder,
    focusBorderColor,
    errorBorderColor,
    isDisabled,
    isInvalid,
    isReadOnly,
    isRequired,
  } = props;

  return (
    <InputGroup {...groupProps}>
      <Input
        {...inputProps}
        placeholder={placeholder}
        _placeholder={_placeholder}
        focusBorderColor={focusBorderColor}
        errorBorderColor={errorBorderColor}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
      />
      <InputRightElement {...addonProps}>
        <Button {...btnProps} onClick={event}>
          {btnText}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

const InputAddon = ({
  groupProps,
  addonProps,
  addonType = "left", // left, right
  addonText,
  inputProps,
  placeholder,
  _placeholder,
  focusBorderColor,
  errorBorderColor,
  isDisabled,
  isInvalid,
  isReadOnly,
  isRequired,
}: PropsAddon) => {
  return (
    <InputGroup {...groupProps}>
      {addonType === "left" && (
        <InputLeftAddon children={addonText} {...addonProps} />
      )}
      <ChakraInput
        placeholder={placeholder}
        _placeholder={_placeholder}
        focusBorderColor={focusBorderColor}
        errorBorderColor={errorBorderColor}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        {...inputProps}
      />
      {addonType === "right" && (
        <InputRightAddon children={addonText} {...addonProps} />
      )}
    </InputGroup>
  );
};

const InputFile = ({
  fieldKey,
  accept,
  value,
  _onChange,
  variant,
  inputProps,
  groupProps,
  addonProps,
  btnProps,
  placeholder,
  _placeholder,
  focusBorderColor,
  errorBorderColor,
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  isRequired = false,
  ...rest
}: PropsFile) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [tmpData, setData] = useState<any[]>([]);

  const uploadBtnHandler = (e: any) => {
    fileRef.current?.click();
  };

  const uploadFileHandler = (e: any) => {
    console.log(e.target);
    const { files } = e.target;

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log("enter");
      try {
        console.log("loading");
        const { result } = e.target;
        const workbook = XLSX.read(result, { type: "binary" });
        let data: any[] = [];

        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            //    sheet_to_json     excel    json
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
        // message.success("success load");
        console.log(data);
        setData(data[1].tableData);
      } catch (e) {
        console.log("error", e);
      }
    };

    fileReader.readAsBinaryString(files[0]);
  };

  const columnHelper = createColumnHelper<any>();

  const columntest = [
    columnHelper.accessor("errorCode", {
      header: "에러 코드",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("desc", {
      header: "설명",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("messageKey", {
      header: "messageKey",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("message", {
      header: "message",
      cell: (info) => info.getValue(),
    }),
  ];

  const test: any = useMemo(() => {
    console.log(tmpData);
    return tmpData;
  }, [tmpData]);

  return (
    <>
      <InputGroup {...groupProps} variant={variant}>
        <ChakraInput
          id={fieldKey}
          {...inputProps}
          type="file"
          value={value}
          onChange={(e: any) => uploadFileHandler(e)}
          placeholder={placeholder}
          _placeholder={_placeholder}
          focusBorderColor={focusBorderColor}
          errorBorderColor={errorBorderColor}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
          aria-hidden="true"
          accept={`${accept}`}
          ref={fileRef}
        />
        <InputRightElement {...addonProps}>
          <Button {...btnProps} onClick={uploadBtnHandler}>
            File Upload
          </Button>
        </InputRightElement>
      </InputGroup>
      <BaseTable
        actviePage={true}
        registersPerPage={10}
        columns={columntest}
        data={test}
      />
    </>
  );
};

export { Input, InputBtn, InputAddon, InputPwd, InputFile, InputDate };
