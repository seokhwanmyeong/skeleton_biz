//  LIB
import { useState, useRef, useCallback, Fragment } from "react";
import { useRecoilState } from "recoil";
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
//  Components
import FormRentEditor from "@components/form/map/FormRentEditor";
import { DialogAlertCreateRent } from "@components/dialog/DialogAlertModal";
import { BaseSpinner } from "@components/common/Spinner";
//  State
import {
  Infocome,
  TypeFilterRent,
  infoComErpRent,
} from "@states/sementicMap/stateFilter";
//  Api
import { apiErpMap, apiErpRent } from "@api/bizSub/config";
//  Icons
import { Deco01 } from "@assets/deco/DecoSvg";
import { IcoLeft, IcoPlusCircle } from "@assets/icons/icon";
//  Type
import type { TypeCreateRent, TypeMapRentSearch } from "@api/bizSub/type";

type Props = {
  isOpen: boolean;
  onOpen: (props?: any) => any;
  onClose: (props?: any) => any;
  setOpenIdx: (props?: any) => any;
};

const ModalRentEditor = ({ isOpen, onOpen, onClose, setOpenIdx }: Props) => {
  const { getRentList } = apiErpMap;
  const { createRent } = apiErpRent;
  const [erpRent, setErpRent] =
    useRecoilState<Infocome<TypeFilterRent>>(infoComErpRent);
  const [filterRent, setFilterRent] = useState<TypeFilterRent>(erpRent.filter);
  const [isLoading, setLoading] = useState<boolean>(false);
  const submitRef = useRef<FormikValues>(null);
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const [initData, setInitData] = useState<TypeCreateRent["req"]>({
    brandCode: "3",
    rentName: "",
    rentType: undefined,
    curUpjong: "",
    availableDay: undefined,
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
    lat: 0,
    lng: 0,
    img: [],
  });

  const submitHandler = useCallback(() => {
    console.log("submit start");
    console.log(submitRef.current);
    if (submitRef?.current) {
      const { errors } = submitRef.current;

      if (Object.keys(errors).length === 0) {
        submitRef?.current && submitRef.current.handleSubmit();
      } else {
        !isAlertOpen && onAlertOpen();
      }
    }
  }, [submitRef.current]);

  const searchRentHandler = () => {
    console.log("rent search");
    console.log(filterRent);
    setLoading(true);
    // const tmp: any = { ...filterRent, brandCode: "3" };
    const tmp: any = { ...filterRent };
    delete tmp.areaCode;
    delete tmp.areaText;

    if (filterRent.rentType.length === 0) tmp.rentType = [];
    if (!filterRent.areaCode || filterRent.areaCode?.length <= 2)
      tmp.sidoCode = filterRent.areaCode;
    if (!filterRent.areaCode || filterRent.areaCode?.length <= 2)
      tmp.sidoCode = filterRent.areaCode;
    else if (
      filterRent.areaCode &&
      filterRent.areaCode.length > 2 &&
      filterRent.areaCode.length <= 4
    ) {
      tmp.sigunguCode = filterRent.areaCode;
    } else if (filterRent.areaCode.length > 4) {
      tmp.sigunguCode = filterRent.areaCode.slice(0, 4);
      tmp.dongCode = `${filterRent.areaCode.slice(
        4,
        filterRent.areaCode.length
      )}00`;
    }

    delete tmp.rentType;

    getRentList(tmp)
      .then((res: { data: TypeMapRentSearch["res"][] }) => {
        const { data } = res;
        console.log(res);
        data && data.length > 0
          ? setErpRent({
              filter: filterRent,
              active: true,
              show: true,
              data: data,
            })
          : setErpRent({
              filter: filterRent,
              active: true,
              show: true,
              data: [],
            });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const createRentHandler = (val: TypeCreateRent["req"]) => {
    console.log("create start");
    console.log(val);
    createRent(val).then((res) => {
      console.log(res);
      if (res) {
        searchRentHandler();
        onClose();
        setOpenIdx(-1);
      } else {
        onClose();
        setOpenIdx(-1);
      }
    });
  };

  return (
    <Fragment>
      {isLoading && <BaseSpinner zIndex={1000} />}
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
              setValues={createRentHandler}
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
