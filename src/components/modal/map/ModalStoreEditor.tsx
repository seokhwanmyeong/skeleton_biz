//  LIB
import { Fragment, useState, useRef, useCallback } from "react";
import { useRecoilState } from "recoil";
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
import type { FormikValues } from "formik";
//  Component
import FormStoreEditor from "@components/form/map/FormStoreEditor";
import { DialogAlertCreateStore } from "@components/dialog/DialogAlertModal";
import { BaseSpinner } from "@components/common/Spinner";
//  Api
import { apiErpMap, apiErpStore } from "@api/bizSub/config";
//  State
import {
  Infocome,
  TypeFilterStore,
  infoComErpStore,
} from "@states/sementicMap/stateFilter";
//  Icon
import { IcoLeft, IcoPlusCircle } from "@assets/icons/icon";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
//  Type
import type { TypeCreateStore, TypeMapStoreSearch } from "@api/bizSub/type";

type Props = {
  isOpen: boolean;
  onOpen: (props?: any) => any;
  onClose: (props?: any) => any;
  setOpenIdx: (props?: any) => any;
};
const ModalStoreEditor = ({ isOpen, onOpen, onClose, setOpenIdx }: Props) => {
  const { getStoreList } = apiErpMap;
  const { createStore } = apiErpStore;
  const [erpStore, setErpStore] =
    useRecoilState<Infocome<TypeFilterStore>>(infoComErpStore);
  const [filterStore, setFilterStore] = useState<TypeFilterStore>(
    erpStore.filter
  );
  const [isLoading, setLoading] = useState<boolean>(false);
  const submitRef = useRef<FormikValues>(null);
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const [initData, setInitData] = useState<TypeCreateStore["req"]>({
    brandCode: "3",
    storeName: "",
    storeCode: "",
    storeStatus: "open",
    storeType: undefined,
    bsNum: "",
    ownerName: "",
    ownerPhone: "",
    addrNew: "",
    addrOld: "",
    addrDetail: "",
    addrCode: "",
    addrHCode: "",
    openDate: undefined,
    lat: 0,
    lng: 0,
    linkBsDis: [],
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

  const createStoreHandler = (val: TypeCreateStore["req"]) => {
    console.log("create start");
    console.log(val);
    createStore(val).then((res) => {
      if (res) {
        searchStoreHandler();
        onClose();
        setOpenIdx(-1);
      } else {
        onClose();
        setOpenIdx(-1);
      }
    });
  };

  const searchStoreHandler = () => {
    console.log("store search");
    console.log(filterStore);
    setLoading(true);
    const tmp: any = { ...filterStore, brandCode: "3" };
    // const tmp: any = { ...filterStore };

    if (
      filterStore.storeType.length === 0 ||
      filterStore.storeType.length === 5
    )
      tmp.storeType = [];
    if (
      filterStore.storeStatus.length === 0 ||
      filterStore.storeStatus.length === 5
    )
      tmp.storeStatus = ["open", "ready", "rest", "close", "etc"];
    // tmp.storeStatus = [];
    if (!filterStore.areaCode || filterStore.areaCode?.length <= 2)
      tmp.sidoCode = filterStore.areaCode;
    else if (
      filterStore.areaCode &&
      filterStore.areaCode.length > 2 &&
      filterStore.areaCode.length <= 4
    ) {
      tmp.sigunguCode = filterStore.areaCode;
    } else if (filterStore.areaCode.length > 4) {
      tmp.sigunguCode = filterStore.areaCode.slice(0, 4);
      tmp.dongCode = `${filterStore.areaCode.slice(
        4,
        filterStore.areaCode.length
      )}00`;
    }

    delete tmp.areaCode;
    delete tmp.areaText;
    delete tmp.storeType;

    getStoreList(tmp)
      .then((res: TypeMapStoreSearch["res"]) => {
        const { data } = res;
        if (data && data.length > 0) {
          const tmp = data.filter((li) => li.location.coordinates);

          setErpStore({
            filter: filterStore,
            active: true,
            show: true,
            data: tmp,
          });
        } else {
          setErpStore({
            filter: filterStore,
            active: true,
            show: true,
            data: [],
          });
        }
        setOpenIdx(0);
        setLoading(false);
      })
      .catch(() => {
        setOpenIdx(0);
        setLoading(false);
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
                매장 등록
              </Heading>
            </Flex>
            <Deco01 margin="0.5rem 0 1.3125rem" width="100%" height="auto" />
          </DrawerHeader>
          <DrawerBody pos="relative" p="0" width="100%">
            <FormStoreEditor
              initVal={initData}
              setValues={createStoreHandler}
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
              매장생성
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <DialogAlertCreateStore isOpen={isAlertOpen} onClose={onAlertClose} />
    </Fragment>
  );
};

export default ModalStoreEditor;
