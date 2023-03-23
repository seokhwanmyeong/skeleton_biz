import { Button, IconButton } from "@chakra-ui/react";
//  Icon
import { IcoPlusSquare, IcoDelete, IcoDownload } from "@assets/icons/icon";

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
      color="font.main"
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
      color="font.main"
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
      color="font.main"
      {...rest}
    />
  );
};

export { Btn, IcoBtnEditor, IcoBtnDownload, IcoBtnDelete };
