//  LIB
import { Fragment, useEffect, useRef, useCallback, useContext } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  Heading,
  Text,
  IconButton,
  List,
  ListItem,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  ModalHeader,
  ModalFooter,
} from "@chakra-ui/react";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
//  Type
import {
  IcoClose,
  IcoCloseCircle,
  IcoLeft,
  IcoPlusCircle,
} from "@assets/icons/icon";
import { bsDisColor } from "@src/util/define/map";
import FormBsnsD from "@src/components/form/map/FormBsnsD";
import { FormikValues } from "formik";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { atomFilterFlow } from "@src/states/sementicMap/stateFilter";
import { atomSlctCustom } from "@src/states/sementicMap/stateMap";
import { sementicViewState } from "@src/states/sementicMap/stateView";
import { NaverMapContext } from "@src/lib/src";
import DrawBox from "@src/components/sementicMapLayer/boxCreateDraw/DrawBox";

type Props = {
  id: string;
  name: string;
  code: string;
  isOpen: boolean;
  onClose: (props?: any) => any;
};

const ModalBsDisDetail = ({ id, name, code, isOpen, onClose }: Props) => {
  const { state } = useContext(NaverMapContext);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const setSlceCustom = useSetRecoilState(atomSlctCustom);
  const reserView = useResetRecoilState(sementicViewState);
  const {
    isOpen: modalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    isOpen: toolOpen,
    onOpen: onToolOpen,
    onClose: onToolClose,
  } = useDisclosure();
  const submitRef = useRef<FormikValues>(null);

  useEffect(() => {
    console.log(id);
  }, []);

  const submitHandler = useCallback(() => {
    console.log("submit start");
    console.log(submitRef.current);
    if (submitRef?.current) {
      const { errors, touched } = submitRef.current;
      if (Object.keys(touched).length > 0 || !errors) {
        submitRef?.current && submitRef.current.handleSubmit();
      } else {
        submitRef?.current && submitRef.current.handleSubmit();
      }
    }

    onClose();
  }, [submitRef.current]);

  const updateBsnsDis = (val: any) => {
    console.log("update start");
    const { bsDisName, bsDisCode, bsDisType } = val;
    console.log(val);

    // @ts-ignore
    if (!(path && center?._lat && center?._lng)) {
      alert("영역을 제대로 설정해주세요");
      return;
    } else if (!(bsDisName && bsDisCode)) {
      alert("입력 에러");
      return;
    }
  };

  const flowCustomNavigator = useCallback(() => {
    const type = "circle";
    if (state.map && state.objects) {
      const obj: any = state.objects.get(`bsDisArea-${id}`);
      const bounds = obj.getBounds();
      const center = bounds.getCenter();
      const type = obj.OVERLAY_TYPE;

      if (type === "Circle" && state.map && state.objects) {
        // @ts-ignore
        const geocoder = new kakao.maps.services.Geocoder();
        const range = obj.getRadius();

        geocoder.coord2RegionCode(center?._lng, center?._lat, (result: any) => {
          setSlceCustom({
            areaType: "circle",
            slctName: `상권: ${name}`,
            pathType: "circle",
            slctPath: bounds,
            range: range,
            center: center,
          });
          setFlow("custom");
          reserView();
        });
      } else {
        // @ts-ignore
        const geocoder = new kakao.maps.services.Geocoder();
        const path: any = obj?.getPath();

        if (!path || path.length - 1 <= 2) {
          alert("영역을 제대로 설정해주세요");
          return;
        }

        geocoder.coord2RegionCode(center?._lng, center?._lat, (result: any) => {
          setSlceCustom({
            areaType: "polygon",
            pathType: "polygon",
            slctName: `상권: ${name}`,
            slctPath: path._array,
            range: undefined,
            center: center,
          });
          setFlow("custom");
          reserView();
        });
      }
    }
  }, [state]);

  useEffect(() => {
    if (state.map) {
      const obj = state.objects.get(`bsDisArea-${id}`);
      console.log(obj);
    }

    return () => {
      const obj = state.objects.get(`bsDisArea-${id}`);
      console.log(obj);
    };
  }, [state]);

  return (
    <Fragment>
      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerContent p="0" maxW="fit-content">
          <DrawerBody pos="relative" p="1rem 1.5rem" width="390px">
            <Flex
              pos="relative"
              direction="column"
              justify="center"
              align="center"
              gap="1.125rem"
            >
              <IconButton
                aria-label="리스트로 돌아가기"
                onClick={onClose}
                icon={
                  <IcoLeft
                    width="1.25rem"
                    height="1.25rem"
                    color="font.primary"
                  />
                }
                position="absolute"
                top="4px"
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
                {name}
              </Heading>
              <Deco01 w="100%" h="auto" />
              <Flex
                pt="1rem"
                w="100%"
                h="100%"
                direction="column"
                justify="center"
                align="center"
              >
                <Flex
                  mb="2rem"
                  w="48px"
                  h="48px"
                  flex="none"
                  justify="center"
                  align="center"
                  // bgColor={bsDisColor[bsDisType]}
                  bgColor={bsDisColor["A"]}
                  borderRadius="50%"
                />
                <List
                  mb="3.5rem"
                  w="100%"
                  h="100%"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap="28px"
                >
                  <ListItem
                    w="50%"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Text
                      fontFamily="main"
                      fontWeight="strong"
                      fontSize="md"
                      lineHeight="1.5rem"
                    >
                      상권코드
                    </Text>
                    <Text
                      minW="3rem"
                      fontFamily="main"
                      fontWeight="medium"
                      fontSize="md"
                      lineHeight="1.5rem"
                      textAlign="left"
                    >
                      {code || " "}
                    </Text>
                  </ListItem>
                  <ListItem
                    w="50%"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Text
                      fontFamily="main"
                      fontWeight="strong"
                      fontSize="md"
                      lineHeight="1.5rem"
                    >
                      상권유형
                    </Text>
                    <Text
                      minW="3rem"
                      fontFamily="main"
                      fontWeight="medium"
                      fontSize="md"
                      lineHeight="1.5rem"
                      textAlign="left"
                    >
                      {"A"}
                    </Text>
                  </ListItem>
                  <ListItem
                    w="50%"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Text
                      fontFamily="main"
                      fontWeight="strong"
                      fontSize="md"
                      lineHeight="1.5rem"
                    >
                      연동매장
                    </Text>
                    <Text
                      minW="3rem"
                      fontFamily="main"
                      fontWeight="medium"
                      fontSize="md"
                      lineHeight="1.5rem"
                      textAlign="left"
                    >
                      종로점
                    </Text>
                  </ListItem>
                </List>
                <Flex w="100%" direction="column" align="center" gap="1.25rem">
                  <Button
                    variant="modalSubmit"
                    disabled={toolOpen}
                    w="80%"
                    bg="transparent"
                    fontSize="sm"
                    color="primary.type8"
                    lineHeight="1.2rem"
                    zIndex={1}
                    _hover={{
                      bg: "transparent",
                    }}
                    onClick={() => {
                      console.log("click");
                      onModalOpen();
                    }}
                  >
                    정보 수정
                  </Button>
                  <Button
                    variant="modalSubmit"
                    disabled={toolOpen}
                    w="80%"
                    bg="transparent"
                    fontSize="sm"
                    color="primary.type8"
                    lineHeight="1.2rem"
                    zIndex={1}
                    _hover={{
                      bg: "transparent",
                    }}
                  >
                    영역 수정
                  </Button>
                  <Button
                    variant="modalSubmit"
                    w="80%"
                    bg="transparent"
                    fontSize="sm"
                    color="primary.type8"
                    lineHeight="1.2rem"
                    zIndex={1}
                    _hover={{
                      bg: "transparent",
                    }}
                    onClick={() => {
                      onToolOpen();
                    }}
                  >
                    영역 다시 그리기
                  </Button>
                  {toolOpen && (
                    <Flex>
                      <DrawBox
                        setLocalModalIdx={() => {}}
                        onOpen={onToolOpen}
                        onClose={onToolClose}
                      />
                    </Flex>
                  )}
                  <Button
                    variant="modalSubmit"
                    disabled={toolOpen}
                    w="80%"
                    fontSize="sm"
                    lineHeight="1.2rem"
                    zIndex={1}
                    onClick={() => {
                      flowCustomNavigator();
                    }}
                  >
                    상권 분석
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {modalOpen && (
        <Modal isOpen={modalOpen} isCentered={true} onClose={onModalClose}>
          <ModalOverlay />
          <ModalContent w="480px" maxW="auto">
            <ModalHeader display="flex" justifyContent="flex-end">
              <IconButton
                onClick={onModalClose}
                aria-label="닫기"
                icon={<IcoClose color="font.primary" />}
                w="1rem"
                h="1rem"
                bg="transparent"
                color="neutral.gray6"
                _hover={{
                  bg: "transparent",
                  color: "neutral.gray9",
                }}
              />
            </ModalHeader>
            <ModalBody p="0rem 3rem">
              <FormBsnsD
                initVal={{}}
                setValues={updateBsnsDis}
                ref={submitRef}
              />
            </ModalBody>
            <ModalFooter w="100%" justifyContent="center">
              <Button
                variant="modalSubmit"
                w="80%"
                zIndex={1}
                onClick={submitHandler}
              >
                <IcoPlusCircle />
                정보 수정
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Fragment>
  );
};

export default ModalBsDisDetail;
