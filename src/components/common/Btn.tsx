import { Button, IconButton, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//  Icon
import {
  IcoPlusSquare,
  IcoDelete,
  IcoDownload,
  IcoUpdate,
  IcoVisible,
  IcoHidden,
  IcoArrowBack,
  IcoCloseCircle,
  IcoDetail,
  IcoPlusSquare02,
  IcoSearch,
} from "@assets/icons/icon";

type Props = {};

type BtnProps = {
  onClick: any;
  isDisabled?: boolean;
  isActive?: boolean;
  text?: string;
  style?: any;
  rest?: string[];
};

interface BtnEditProps extends BtnProps {
  update?: boolean;
}

interface IcoBtnEyeProps extends BtnProps {
  isShow?: boolean;
}

const Btn = (props: any) => {
  const { btnProps, text } = props;

  return <Button {...btnProps}>{text}</Button>;
};

const BtnEditor = ({
  onClick,
  isDisabled,
  update,
  text = "생성하기",
  ...rest
}: BtnEditProps) => {
  return (
    <Button
      variant="editor"
      onClick={onClick}
      isDisabled={isDisabled}
      aria-label="생성하기"
      {...rest}
    >
      <IcoPlusSquare02 w="0.875rem" h="0.875rem" />
      {text}
    </Button>
  );
};

const BtnDownload = ({
  onClick,
  isDisabled,
  update,
  text = "다운로드",
  ...rest
}: BtnEditProps) => {
  return (
    <Button
      variant="editor"
      onClick={onClick}
      isDisabled={isDisabled}
      aria-label="다운로드"
      {...rest}
    >
      <IcoDownload w="0.75rem" h="0.75rem" />
      {text}
    </Button>
  );
};

const IcoBtnDownload = ({ onClick, isDisabled, ...rest }: BtnProps) => {
  return (
    <IconButton
      onClick={onClick}
      isDisabled={isDisabled}
      aria-label="다운로드"
      icon={<IcoDownload />}
      w="1rem"
      h="1rem"
      bg="transparent"
      color="font.main"
      _hover={{
        bg: "transparent",
      }}
      {...rest}
    />
  );
};

const BtnDelete = ({
  onClick,
  isDisabled,
  update,
  text = "삭제",
  ...rest
}: BtnEditProps) => {
  return (
    <Button
      variant="editor"
      onClick={onClick}
      isDisabled={isDisabled}
      aria-label="다운로드"
      {...rest}
    >
      <IcoDelete w="0.75rem" h="0.75rem" />
      {text}
    </Button>
  );
};

const BtnFilterSearch = ({
  onClick,
  isDisabled,
  text = "조회",
  ...rest
}: BtnProps) => {
  return (
    <Button
      variant="filterSearch"
      onClick={onClick}
      isDisabled={isDisabled}
      aria-label="조회하기"
      {...rest}
    >
      <IcoSearch width="0.875rem" height="0.875rem" color="primary.inverse" />
      {text}
    </Button>
  );
};

const IcoBtnDelete = ({ onClick, isDisabled, style, ...rest }: BtnProps) => {
  return (
    <IconButton
      onClick={onClick}
      isDisabled={isDisabled}
      aria-label="삭제"
      icon={<IcoDelete />}
      w="1rem"
      h="1rem"
      bg="transparent"
      color="font.main"
      _hover={{
        bg: "transparent",
      }}
      {...rest}
    />
  );
};

const IcoBtnUpdate = ({
  onClick,
  isActive = false,
  isDisabled,
  style,
  ...rest
}: BtnProps) => {
  return (
    <IconButton
      onClick={onClick}
      isActive={isActive}
      isDisabled={isDisabled}
      aria-label="수정"
      icon={<IcoUpdate />}
      w="1rem"
      h="1rem"
      bg="transparent"
      color="font.title"
      _hover={{
        bg: "transparent",
        color: "primary.type7",
      }}
      _active={{
        bg: "transparent",
        color: "primary.type7",
      }}
      {...style}
      {...rest}
    />
  );
};

const IcoBtnClose = ({
  onClick,
  isActive = false,
  isDisabled,
  style,
  ...rest
}: BtnProps) => {
  return (
    <IconButton
      onClick={onClick}
      isDisabled={isDisabled}
      isActive={isActive}
      aria-label="취소"
      icon={<IcoCloseCircle />}
      w="1rem"
      h="1rem"
      bg="transparent"
      color="font.title"
      _hover={{
        bg: "transparent",
        color: "primary.type7",
      }}
      {...style}
      {...rest}
    />
  );
};

const IcoBtnEye = ({
  onClick,
  isShow,
  isDisabled,
  ...rest
}: IcoBtnEyeProps) => {
  return (
    <IconButton
      onClick={onClick}
      isDisabled={isDisabled}
      aria-label="수정"
      icon={
        isShow ? (
          <IcoHidden viewBox="0 0 36 26" color="primary.type7" />
        ) : (
          <IcoVisible
            viewBox="0 0 16 16"
            color="font.placeholder"
            _hover={{ color: "primary.type7" }}
          />
        )
      }
      w="1rem"
      h="1rem"
      bg="transparent"
      color="primary.type7"
      _hover={{
        bg: "transparent",
        color: "primary.type8",
      }}
      _active={{
        bg: "transparent",
        color: "primary.type8",
      }}
      {...rest}
    />
  );
};

const IcoBtnBack = (props: any) => {
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => {
        navigate(-1);
      }}
      aria-label="뒤로가기"
      icon={<IcoArrowBack />}
      w="1rem"
      h="1rem"
      bg="transparent"
      color="font.title"
      _hover={{
        bg: "transparent",
        color: "primary.type7",
      }}
      {...props.style}
    />
  );
};

const IcoBtnBsns = (props: any) => {
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => {
        navigate("/maps");
      }}
      aria-label="상권영역으로 가기"
      icon={<IcoArrowBack />}
      w="1rem"
      h="1rem"
      bg="transparent"
      color="font.title"
      _hover={{
        bg: "transparent",
        color: "primary.type7",
      }}
      {...props.style}
    />
  );
};

const IcoBtnBsnsFix = (props: any) => {
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => {
        navigate("/maps");
      }}
      aria-label="상권수정하러가기"
      icon={<IcoArrowBack />}
      w="1rem"
      h="1rem"
      bg="transparent"
      color="font.title"
      _hover={{
        bg: "transparent",
        color: "primary.type7",
      }}
      {...props.style}
    />
  );
};

const IcoBtnDetail = ({ onClick, isDisabled, ...rest }: BtnProps) => {
  return (
    <IconButton
      onClick={onClick}
      isDisabled={isDisabled}
      aria-label="상세보기"
      icon={<IcoDetail />}
      w="1rem"
      h="1rem"
      bg="transparent"
      color="font.main"
      _hover={{
        bg: "transparent",
      }}
      {...rest}
    />
  );
};

const IcoBtnPrev = ({ onClick, isDisabled, ...rest }: BtnProps) => {
  return (
    <IconButton
      onClick={onClick}
      isDisabled={isDisabled}
      aria-label="이전 슬라이드"
      icon={<IcoArrowBack />}
      w="1rem"
      h="1rem"
      bg="transparent"
      color="font.main"
      _hover={{
        bg: "transparent",
      }}
      {...rest}
    />
  );
};

const IcoBtnNext = ({ onClick, isDisabled, ...rest }: BtnProps) => {
  return (
    <IconButton
      onClick={onClick}
      isDisabled={isDisabled}
      aria-label="다음슬라이드"
      icon={<IcoArrowBack />}
      w="1rem"
      h="1rem"
      bg="transparent"
      color="font.main"
      _hover={{
        bg: "transparent",
      }}
      {...rest}
    />
  );
};

export {
  Btn,
  BtnEditor,
  BtnFilterSearch,
  BtnDownload,
  IcoBtnDownload,
  BtnDelete,
  IcoBtnDelete,
  IcoBtnUpdate,
  IcoBtnEye,
  IcoBtnBack,
  IcoBtnClose,
  IcoBtnBsns,
  IcoBtnBsnsFix,
  IcoBtnDetail,
  IcoBtnPrev,
  IcoBtnNext,
};
