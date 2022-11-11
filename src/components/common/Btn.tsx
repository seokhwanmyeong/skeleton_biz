import { Button } from "@chakra-ui/react";

type Props = {};

const Btn = (props: any) => {
  const { btnProps, text } = props;

  return <Button {...btnProps}>{text}</Button>;
};

export default Btn;
