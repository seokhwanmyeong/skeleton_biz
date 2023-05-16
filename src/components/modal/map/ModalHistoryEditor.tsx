//  LIB
import { Fragment, useState, useRef, useCallback, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  Button,
  Flex,
  Heading,
  IconButton,
  DrawerHeader,
  DrawerFooter,
  useDisclosure,
} from "@chakra-ui/react";
//  Component
import FormHistory from "@components/form/map/FormHistory";
import { DialogAlertCreateStore } from "@components/dialog/DialogAlertModal";
//  Type
import type { FormikValues } from "formik";
import type { StoreInfo } from "@page/erp/store/ErpStoreCreate";
import { IcoLeft, IcoPlusCircle } from "@src/assets/icons/icon";
import { Deco01 } from "@src/assets/deco/DecoSvg";

type Props = {
  isOpen: boolean;
  fixMode?: boolean;
  values?: any;
  onOpen: (props?: any) => any;
  onClose: (props?: any) => any;
  setOpenIdx?: (props?: any) => any;
};
const ModalHistoryEditor = ({
  isOpen,
  fixMode = false,
  values,
  onOpen,
  onClose,
  setOpenIdx,
}: Props) => {
  const submitRef = useRef<FormikValues>(null);
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const [initData, setInitData] = useState({
    id: "",
    writer: "김양일",
    title: "",
    content: "",
    curAddr: "",
    img: [],
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

  const createHistory = (val?: StoreInfo) => {
    console.log("create start");
    console.log(val);
    onClose();
    setOpenIdx && setOpenIdx(-1);
  };

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;
    naver.maps.Service.reverseGeocode(
      {
        coords: new naver.maps.LatLng(latitude, longitude),
        orders: [
          naver.maps.Service.OrderType.ADDR,
          naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(","),
      },
      (status, response) => {
        const road = response?.v2?.address?.jibunAddress;
        const jibun = response?.v2?.address?.roadAddress;
        if (road || jibun) {
          setInitData({ ...initData, curAddr: road || jibun || "" });
        }
      }
    );
  };

  useEffect(() => {
    const { geolocation } = navigator;
    if (values) {
      setInitData(values);
    }

    if (!geolocation) {
      return;
    }

    geolocation.getCurrentPosition(handleSuccess);
  }, [isOpen]);

  return (
    <Fragment>
      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerContent p="1rem 1.5625rem" maxW="786px" w="786px">
          <DrawerBody pos="relative" p="0" width="100%">
            <FormHistory
              initVal={initData}
              setValues={createHistory}
              ref={submitRef}
              fixMode={fixMode}
              onClose={onClose}
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
              히스토리 추가하기
            </Button>
            <Button onClick={onClose}>취소</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <DialogAlertCreateStore isOpen={isAlertOpen} onClose={onAlertClose} />
    </Fragment>
  );
};

export default ModalHistoryEditor;
