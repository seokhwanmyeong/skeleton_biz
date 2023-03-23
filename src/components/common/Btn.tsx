import { Button, IconButton } from "@chakra-ui/react";
//  Icon
import {
  IcoPlusSquare,
  IcoDelete,
  IcoDownload,
  IcoUpdate,
} from "@assets/icons/icon";

type Props = {};

type IcoBtnProps = {
  onClick: any;
  isDisabled?: boolean;
};

interface IcoBtnEditProps extends IcoBtnProps {
  update?: boolean;
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

const IcoBtnDelete = ({ onClick, isDisabled, ...rest }: IcoBtnProps) => {
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

const IcoBtnUpdate = ({ onClick, isDisabled, ...rest }: IcoBtnProps) => {
  return (
    <IconButton
      onClick={onClick}
      isDisabled={isDisabled}
      aria-label="수정"
      icon={<IcoUpdate />}
      w="1rem"
      h="1rem"
      bg="transparent"
      color="primary.type7"
      _hover={{
        bg: "transparent",
        color: "primary.type8",
      }}
      {...rest}
    />
  );
};

export { Btn, IcoBtnEditor, IcoBtnDownload, IcoBtnDelete, IcoBtnUpdate };
