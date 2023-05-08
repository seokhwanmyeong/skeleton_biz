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
  DrawerHeader,
  IconButton,
  DrawerFooter,
  useDisclosure,
} from "@chakra-ui/react";
//  Components
import FormBsnsD from "@components/form/map/FormBsnsD";
//  State
import { atomCreateArea } from "@states/sementicMap/stateMap";
//  Icon
import { IcoLeft, IcoPlusCircle } from "@assets/icons/icon";
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
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const [initData, setInitData] = useState<BsnsDisInfo>({
    bsDisName: "",
    bsDisCode: "",
    bsDisType: "A",
    polygon: "",
    lat: 0,
    lng: 0,
    addr: "",
    linkStore: [],
  });

  const submitHandler = useCallback(() => {
    console.log("submit start");
    console.log(submitRef.current);
    if (submitRef?.current) {
      const { errors, touched } = submitRef.current;
      if (Object.keys(touched).length > 0 || !errors) {
        submitRef?.current && submitRef.current.handleSubmit();
      } else {
        submitRef?.current && submitRef.current.handleSubmit();
        !isAlertOpen && onAlertOpen();
      }
    }
  }, [submitRef.current]);

  const createBsnsDis = (val: BsnsDisInfo) => {
    console.log("create start");
    const { bsDisName, bsDisCode, bsDisType } = val;
    const { pathType, path, center, range } = createdArea;
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

    closeHandler();
  };

  const closeHandler = () => {
    toolOpen(false);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={closeHandler} placement="right">
      <DrawerContent p="1rem 1.5625rem" maxW="25.3125rem" w="25.3125rem">
        <DrawerHeader pos="relative" p="0">
          <Flex direction="column" justify="center" align="center" gap="1rem">
            <IconButton
              aria-label="생성 취소"
              onClick={onClose}
              icon={
                <IcoLeft
                  width="1.25rem"
                  height="1.25rem"
                  color="font.primary"
                />
              }
              position="absolute"
              top="0.125rem"
              left="0rem"
              bg="transparent"
              color="font.primary"
              _hover={{
                bg: "transparent",
              }}
            />
            <Heading
              as={"h5"}
              fontSize="md"
              lineHeight="normal"
              color="font.primary"
              bg="none"
            >
              상권 등록
            </Heading>
          </Flex>
          <Deco01 margin="0.5rem 0 1.3125rem" width="100%" height="auto" />
        </DrawerHeader>
        <DrawerBody pos="relative" p="0" width="100%">
          <FormBsnsD
            fixMode={true}
            initVal={initData}
            setValues={createBsnsDis}
            ref={submitRef}
          />
        </DrawerBody>
        <DrawerFooter justifyContent="center">
          <Button
            variant="modalSubmit"
            w="80%"
            zIndex={1}
            onClick={submitHandler}
          >
            <IcoPlusCircle />
            상권생성
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ModalBsnsDEditor;
