//  LIB
import { Fragment, useState, useRef, useCallback, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  Button,
  DrawerFooter,
  useDisclosure,
} from "@chakra-ui/react";
//  Component
import FormHistory from "@components/form/map/FormHistory";
import { DialogAlertCreateStore } from "@components/dialog/DialogAlertModal";
//  Api
import { erpHistoryApi } from "@api/bizSub/config";
//  Icon
import { IcoLeft, IcoPlusCircle } from "@assets/icons/icon";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
//  Type
import type { FormikValues } from "formik";
import type { TypeHistoryCreate } from "@api/bizSub/type";

type Props = {
  id: string | number;
  isOpen: boolean;
  fixMode?: boolean;
  values?: any;
  onOpen: (props?: any) => any;
  onClose: (props?: any) => any;
  refresh?: (props?: any) => any;
  setOpenIdx?: (props?: any) => any;
};
const ModalHistoryEditor = ({
  id,
  isOpen,
  fixMode = false,
  values,
  onOpen,
  onClose,
  refresh,
  setOpenIdx,
}: Props) => {
  const { createHistory, getHistoryDetail } = erpHistoryApi;
  const submitRef = useRef<FormikValues>(null);
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const [initData, setInitData] = useState({
    id: id,
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
      const { errors } = submitRef.current;

      if (Object.keys(errors).length === 0) {
        submitRef?.current && submitRef.current.handleSubmit();
      } else {
        !isAlertOpen && onAlertOpen();
      }
    }
  }, [submitRef.current]);

  const createHistoryHandler = (val: TypeHistoryCreate["req"]) => {
    console.log("create start");
    console.log(val);
    createHistory(val).then((res) => {
      if (res) {
        onClose();
        setOpenIdx && setOpenIdx(-1);
        refresh && refresh();
      } else {
        onClose();
        setOpenIdx && setOpenIdx(-1);
      }
    });
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
    if (fixMode) {
      const { geolocation } = navigator;
      if (values) {
        setInitData(values);
      }

      if (!geolocation) {
        return;
      }

      geolocation.getCurrentPosition(handleSuccess);
    } else {
      getHistoryDetail({ id: String(id) }).then((res) => {
        if (res.data) {
          setInitData(res.data);
        } else {
          onClose();
        }
      });
    }
  }, [isOpen, fixMode]);

  return (
    <Fragment>
      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerContent p="1rem 1.5625rem" maxW="786px" w="786px">
          <DrawerBody pos="relative" p="0" width="100%">
            <FormHistory
              initVal={initData}
              setValues={createHistoryHandler}
              ref={submitRef}
              fixMode={fixMode}
              onClose={onClose}
            />
          </DrawerBody>
          <DrawerFooter justifyContent="center">
            {fixMode && (
              <Button
                variant="modalSubmit"
                w="80%"
                zIndex={1}
                onClick={submitHandler}
              >
                <IcoPlusCircle />
                히스토리 추가하기
              </Button>
            )}
            <Button onClick={onClose}>취소</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <DialogAlertCreateStore isOpen={isAlertOpen} onClose={onAlertClose} />
    </Fragment>
  );
};

export default ModalHistoryEditor;
