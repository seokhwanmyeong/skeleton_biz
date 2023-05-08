//  Lib
import React from "react";
import {
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
//  Icon
import { IcoClose, IcoCloseCircle, IcoInfoCircle } from "@assets/icons/icon";

type PropsAlert = {
  variant?: string;
  isOpen: boolean;
  onClose: () => void;
  onClick?: () => void;
};

type PropsModal = {
  variant?: string;
  children: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
};

const DialogAlertModal = (props: PropsModal) => {
  const { variant, isOpen, onClose, children } = props;

  return (
    <Modal
      variant={variant}
      isOpen={isOpen}
      isCentered={true}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent w="auto" maxW="auto">
        <ModalBody p="0">{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

const DialogAlertCreateStore = (props: PropsAlert) => {
  const { variant, isOpen, onClose } = props;

  return (
    <DialogAlertModal variant={variant} isOpen={isOpen} onClose={onClose}>
      <Flex p="1rem 1.5rem">
        <IcoCloseCircle
          mr="1rem"
          width="1.5rem"
          height="1.5rem"
          color="primary.type7"
        />
        <Flex mb="0.625rem" direction="column" align="flex-end">
          <Heading
            w="100%"
            textStyle="base"
            fontSize="md"
            fontWeight="strong"
            lineHeight="1.6rem"
            color="font.title"
          >
            매장 생성 불가
          </Heading>
          <Text
            w="100%"
            textStyle="base"
            fontSize="sm"
            fontWeight="regular"
            lineHeight="1.375rem"
            color="font.primary"
          >
            필수 입력란이 비어있어 매장생성이 불가능합니다.
          </Text>
          <Text
            w="100%"
            textStyle="base"
            fontSize="sm"
            fontWeight="regular"
            lineHeight="1.375rem"
            color="font.primary"
          >
            필수 입력란을 다시 한 번 확인해주세요
          </Text>
          <Button variant="alert" onClick={onClose}>
            확인
          </Button>
        </Flex>
        <Flex width="1.5rem" height="1.5rem" justify="center" align="center">
          <IconButton
            onClick={onClose}
            aria-label="닫기"
            icon={<IcoClose />}
            w="1rem"
            h="1rem"
            bg="transparent"
            color="neutral.gray6"
            _hover={{
              bg: "transparent",
              color: "neutral.gray9",
            }}
          />
        </Flex>
      </Flex>
    </DialogAlertModal>
  );
};

const DialogAlertCreateRent = (props: PropsAlert) => {
  const { variant, isOpen, onClose } = props;

  return (
    <DialogAlertModal variant={variant} isOpen={isOpen} onClose={onClose}>
      <Flex p="1rem 1.5rem">
        <IcoCloseCircle
          mr="1rem"
          width="1.5rem"
          height="1.5rem"
          color="primary.type7"
        />
        <Flex mb="0.625rem" direction="column" align="flex-end">
          <Heading
            w="100%"
            textStyle="base"
            fontSize="md"
            fontWeight="strong"
            lineHeight="1.6rem"
            color="font.title"
          >
            매물 생성 불가
          </Heading>
          <Text
            w="100%"
            textStyle="base"
            fontSize="sm"
            fontWeight="regular"
            lineHeight="1.375rem"
            color="font.primary"
          >
            필수 입력란이 비어있어 매물생성이 불가능합니다.
          </Text>
          <Text
            w="100%"
            textStyle="base"
            fontSize="sm"
            fontWeight="regular"
            lineHeight="1.375rem"
            color="font.primary"
          >
            필수 입력란을 다시 한 번 확인해주세요
          </Text>
          <Button variant="alert" onClick={onClose}>
            확인
          </Button>
        </Flex>
        <Flex width="1.5rem" height="1.5rem" justify="center" align="center">
          <IconButton
            onClick={onClose}
            aria-label="닫기"
            icon={<IcoClose />}
            w="1rem"
            h="1rem"
            bg="transparent"
            color="neutral.gray6"
            _hover={{
              bg: "transparent",
              color: "neutral.gray9",
            }}
          />
        </Flex>
      </Flex>
    </DialogAlertModal>
  );
};

const DialogAlertUpjong = (props: {
  name: string;
  icon: any;
  variant?: string;
  isOpen: boolean;
  onClose: () => void;
  onClick?: () => void;
}) => {
  const { name, icon, variant, isOpen, onClose, onClick } = props;

  return (
    <DialogAlertModal variant={variant} isOpen={isOpen} onClose={onClose}>
      <Flex p="1rem 1.5rem" w="27.75rem" direction="column">
        <Flex w="100%" justify="center">
          <Flex
            pos="relative"
            p="0 0.5rem 0.25rem"
            align="center"
            gap="0.75rem"
            borderBottom="4px solid"
            borderColor="primary.type7"
            _after={{
              content: '""',
              pos: "absolute",
              bottom: "1px",
              left: 0,
              display: "block",
              w: "100%",
              h: "3px",
              bgColor: "primary.type7",
            }}
          >
            <IcoInfoCircle width="1rem" height="1rem" color="primary.type7" />
            <Heading
              w="100%"
              textStyle="base"
              fontSize="md"
              fontWeight="strong"
              lineHeight="normal"
              color="font.title"
            >
              업종 변경
            </Heading>
          </Flex>
        </Flex>
        <Divider mb="1.75rem" borderColor="font.title" />
        <Flex
          w="100%"
          h="9.375rem"
          align="center"
          justify="center"
          direction="column"
          border="1px dashed"
          borderColor="neutral.gray5"
          borderRadius="8px"
          bgColor="neutral.gray2"
          sx={{
            svg: {
              mb: "1.25rem",
              width: "3rem",
              height: "3rem",
            },
          }}
        >
          {icon}
          <Text
            w="fit-content"
            textStyle="base"
            fontSize="md"
            fontWeight="strong"
            lineHeight="1.5rem"
            color="font.primary"
            textAlign="center"
          >
            현재 선택 업종
          </Text>
          <Text
            w="fit-content"
            textStyle="base"
            fontSize="sm"
            fontWeight="regular"
            lineHeight="1.375rem"
            color="font.primary"
            textAlign="center"
          >
            {name}
          </Text>
        </Flex>
        <Flex mb="0.625rem" direction="column" align="flex-end">
          <Text
            w="100%"
            textStyle="base"
            fontSize="md"
            fontWeight="regular"
            lineHeight="1.375rem"
            color="font.primary"
            textAlign="center"
          >
            업종 변경시 모든 필터 설정이 초기화됩니다.
          </Text>
          <Text
            w="100%"
            textStyle="base"
            fontSize="md"
            fontWeight="regular"
            lineHeight="1.375rem"
            color="font.primary"
            textAlign="center"
          >
            업종 변경을 하시겠습니까?
          </Text>
        </Flex>
        <Flex w="100%" justify="center" align="center" gap="1rem">
          <Button
            variant="alert"
            w="6.25rem"
            bgColor="transparent"
            border="1px solid"
            borderColor="neutral.gray5"
            color="font.secondary"
            fontWeight="regular"
            onClick={onClose}
            _hover={{
              bgColor: "transparent",
            }}
          >
            취소
          </Button>
          <Button
            variant="alert"
            w="6.25rem"
            bgColor="#B1B431"
            onClick={() => {
              onClick && onClick();
            }}
          >
            업종변경
          </Button>
        </Flex>
      </Flex>
    </DialogAlertModal>
  );
};

export { DialogAlertCreateStore, DialogAlertCreateRent, DialogAlertUpjong };
