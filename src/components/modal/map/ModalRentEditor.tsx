//  LIB
import { useState, useRef, useCallback, Fragment } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  Button,
  Flex,
  Heading,
  DrawerHeader,
  IconButton,
  DrawerFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { FormikValues } from "formik";
import dayjs from "dayjs";
//  Components
import FormRentEditor from "@components/form/map/FormRentEditor";
import { DialogAlertCreateRent } from "@components/dialog/DialogAlertModal";
//  Icons
import { Deco01 } from "@assets/deco/DecoSvg";
import { IcoLeft, IcoPlusCircle } from "@assets/icons/icon";
//  Type
import type { RentInfo } from "@page/erp/rent/ErpRentCreate";

type Props = {
  isOpen: boolean;
  onOpen: (props?: any) => any;
  onClose: (props?: any) => any;
  setOpenIdx: (props?: any) => any;
};

const ModalRentEditor = ({ isOpen, onOpen, onClose, setOpenIdx }: Props) => {
  const submitRef = useRef<FormikValues>(null);
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const [initData, setInitData] = useState<RentInfo>({
    rentName: "",
    rentType: undefined,
    availableDay: undefined,
    curUpjong: "",
    size: 0,
    floor: 0,
    rentalFee: 0,
    depositFee: 0,
    premiumFee: 0,
    manageFee: 0,
    addrNew: "",
    addrOld: "",
    addrCode: "",
    addrHCode: "",
    addrDetail: "",
    img: [],
    lat: 0,
    lng: 0,
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

  const createRent = (val?: RentInfo) => {
    console.log("create start");
    console.log(val);
    onClose();
    setOpenIdx(-1);
  };

  return (
    <Fragment>
      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
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
                매물 등록
              </Heading>
            </Flex>
            <Deco01 margin="0.5rem 0 1.3125rem" width="100%" height="auto" />
          </DrawerHeader>
          <DrawerBody pos="relative" p="0" width="100%">
            <FormRentEditor
              initVal={initData}
              setValues={createRent}
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
              <IcoPlusCircle width="0.875rem" height="0.875rem" />
              매물생성
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <DialogAlertCreateRent isOpen={isAlertOpen} onClose={onAlertClose} />
    </Fragment>
  );
};

export default ModalRentEditor;
