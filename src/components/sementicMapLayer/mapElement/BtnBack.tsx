//  Lib
import { Button, Text } from "@chakra-ui/react";
//  Icon
import { IcoAreaBack } from "@assets/icons/icon";

type Props = {
  onClick: (props?: any) => any;
  disabled?: boolean;
};

const BtnBack = ({ onClick, disabled = false }: Props) => {
  return (
    <Button variant="backBtn" disabled={disabled} onClick={onClick}>
      <IcoAreaBack />
      <Text>Back</Text>
    </Button>
  );
};

export default BtnBack;
