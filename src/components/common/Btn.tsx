import { Button, IconButton } from "@chakra-ui/react";
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
} from "@assets/icons/icon";

type Props = {};

type IcoBtnProps = {
  onClick: any;
  isDisabled?: boolean;
  style?: any;
};

interface IcoBtnEditProps extends IcoBtnProps {
  update?: boolean;
}

interface IcoBtnEyeProps extends IcoBtnProps {
  isShow?: boolean;
}

const Btn = (props: any) => {
  const { btnProps, text } = props;

  return <Button {...btnProps}>{text}</Button>;
};

const IcoBtnEditor = ({
  onClick,
  isDisabled,
  update,
  ...rest
}: IcoBtnEditProps) => {
  return (
    <IconButton
      onClick={onClick}
      isDisabled={isDisabled}
      aria-label="생성하기"
      icon={<IcoPlusSquare />}
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

const IcoBtnDownload = ({ onClick, isDisabled, ...rest }: IcoBtnProps) => {
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

const IcoBtnDelete = ({ onClick, isDisabled, style, ...rest }: IcoBtnProps) => {
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

const IcoBtnUpdate = ({ onClick, isDisabled, style, ...rest }: IcoBtnProps) => {
  return (
    <IconButton
      onClick={onClick}
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

export {
  Btn,
  IcoBtnEditor,
  IcoBtnDownload,
  IcoBtnDelete,
  IcoBtnUpdate,
  IcoBtnEye,
  IcoBtnBack,
};
