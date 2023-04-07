//  LIB
import { useState } from "react";
import { useRecoilValue } from "recoil";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Button,
} from "@chakra-ui/react";
//  Components
import FormBsnsD from "@components/form/map/FormBsnsD";
//  State
import { atomCreateArea } from "@src/states/sementicMap/stateMap";

type Props = {
  isOpen: boolean;
  onOpen: (props?: any) => any;
  onClose: (props?: any) => any;
};

const ModalBsnsDEditor = ({ isOpen, onOpen, onClose }: Props) => {
  const { pathType, path, center } = useRecoilValue(atomCreateArea);

  const [initData, setInitData] = useState({
    storeName: "",
    storeCode: "",
    storeStatus: "",
    storeRank: "",
    phone: "",
    biz_number: "",
    owner_name: "",
    owner_phone: "",
    addr: "",
    addrDetail: "",
    linkBsns: [],
  });

  const submitHandler = (val: any) => {
    console.log("click");
    console.log(val);
  };

  return (
    <>
      {isOpen && pathType && path && (
        <Drawer isOpen={isOpen} onClose={onClose} placement="right">
          <DrawerOverlay />
          <DrawerContent maxW="fit-content">
            <DrawerBody pos="relative" p="0" width="18.5rem">
              <Button
                variant="search"
                position="absolute"
                top="0rem"
                right="1rem"
                zIndex={1}
                onClick={onClose}
              >
                상권 등록
              </Button>
              <FormBsnsD
                fixMode={true}
                initVal={initData}
                setValues={submitHandler}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default ModalBsnsDEditor;
