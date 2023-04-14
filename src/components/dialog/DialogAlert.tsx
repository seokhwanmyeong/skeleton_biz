//  Lib
import { useEffect } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  CloseButton,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
//  Icon
import { IcoCloseCircle } from "@src/assets/icons/icon";
//  Type
import type { Dispatch, SetStateAction } from "react";
//  Animation
import { alertAnimation } from "@styles/animation/keyFremes";

type Props = {};

const DialogAlert = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  const closeHandler = () => {
    onClose();
    setShow(false);
  };

  useEffect(() => {
    show ? !isVisible && onOpen() : !isVisible && onClose();
  }, [show]);

  return isVisible ? (
    <Alert
      as={motion.div}
      animation={alertAnimation}
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      zIndex={999}
      p="1rem 1.5rem"
      w="auto"
      h="auto"
      alignItems="flex-start"
      bgColor="conditional.popOver"
      border="1px solid"
      borderColor="neutral.gray6"
      boxShadow="0px 3px 6px -4px rgba(0, 0, 0, 0.25)"
      borderRadius="base"
    >
      <IcoCloseCircle
        mr="1rem"
        width="1.5rem"
        height="1.5rem"
        color="primary.type7"
      />
      <Flex direction="column" alignItems="flex-end">
        <AlertTitle m="0" mb="0.5rem" w="100%">
          <Heading variant="alertTitle">로그인 불가</Heading>
        </AlertTitle>
        <AlertDescription mb="1rem">
          <Text variant="alertContent">존재하지 않는 아이디입니다.</Text>
          <Text variant="alertContent">
            아이디를 확인하시거나 새로운 계정을 생성해주세요.
          </Text>
        </AlertDescription>
        <Button variant="alert" onClick={closeHandler}>
          확인
        </Button>
      </Flex>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={closeHandler}
      />
    </Alert>
  ) : null;
};

export default DialogAlert;
