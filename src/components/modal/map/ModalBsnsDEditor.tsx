//  LIB
import { useCallback, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  Flex,
  Drawer,
  DrawerBody,
  DrawerContent,
  Button,
  Heading,
} from "@chakra-ui/react";
//  Components
import FormBsnsD from "@components/form/map/FormBsnsD";
//  State
import { atomCreateArea } from "@states/sementicMap/stateMap";
//  Icon
import { IcoCheck, IcoCloseCircle, IcoPlusSquare } from "@assets/icons/icon";
import { Deco01 } from "@assets/deco/DecoSvg";
//  Type
import { FormikValues } from "formik";

type Props = {
  isOpen: boolean;
  onOpen: (props?: any) => any;
  onClose: (props?: any) => any;
  toolOpen: (props?: any) => any;
};

type BsnsDisInfo = {
  bsDisName: string;
  bsDisCode: string;
  bsDisType?: "A" | "B" | "C" | "D" | "E";
  polygon: any;
  lat: number;
  lng: number;
  addr: string;
  linkStore: any[];
};

const ModalBsnsDEditor = ({ isOpen, onOpen, onClose, toolOpen }: Props) => {
  const createdArea = useRecoilValue(atomCreateArea);
  const submitRef = useRef<FormikValues>(null);

  const [initData, setInitData] = useState<BsnsDisInfo>({
    bsDisName: "",
    bsDisCode: "",
    bsDisType: undefined,
    polygon: "",
    lat: 0,
    lng: 0,
    addr: "",
    linkStore: [],
  });

  const submitHandler = () => {
    console.log("submit start");
    submitRef?.current && submitRef.current.handleSubmit();
  };

  const createBsnsDis = (val: BsnsDisInfo) => {
    console.log("create start");
    const { bsDisName, bsDisCode, bsDisType } = val;
    const { path, center } = createdArea;
    console.log(val);
    console.log(createdArea);

    // @ts-ignore
    if (!(path && center?._lat && center?._lng)) {
      alert("영역을 제대로 설정해주세요");
      return;
    } else if (!(bsDisName && bsDisCode)) {
      alert("입력 에러");
      return;
    }

    toolOpen(false);
    onClose();
  };

  const closeHandler = () => {
    toolOpen(false);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerContent maxW="fit-content">
        <DrawerBody pos="relative" p="0" width="18.5rem">
          <Flex justify="space-between">
            <Flex p="0 0.5rem" align="center" gap="1rem">
              <IcoPlusSquare
                width="0.875rem"
                height="0.875rem"
                color="primary.type7"
              />
              <Heading
                as={"h5"}
                fontSize="sm"
                lineHeight="normal"
                color="font.title"
                bg="none"
              >
                상권 등록
              </Heading>
            </Flex>
            <Flex gap="0.5rem">
              <Button variant="filterSearch" zIndex={1} onClick={submitHandler}>
                <IcoCheck />
                상권생성
              </Button>
              <Button
                variant="filterSearch"
                bgColor="#FFFFFF"
                border="1px solid"
                borderColor="primary.type7"
                color="primary.type7"
                _hover={{
                  bgColor: "primary.type7",
                  color: "#FFFFFF",
                }}
                zIndex={1}
                onClick={closeHandler}
              >
                <IcoCloseCircle />
                취소
              </Button>
            </Flex>
          </Flex>
          <Deco01
            margin="0.25rem 0 1.3125rem"
            p="0"
            width="100%"
            height="auto"
          />
          <FormBsnsD
            fixMode={true}
            initVal={initData}
            setValues={createBsnsDis}
            ref={submitRef}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ModalBsnsDEditor;
