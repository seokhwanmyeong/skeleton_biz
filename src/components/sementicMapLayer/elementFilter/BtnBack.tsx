//  Lib
import { Box, Button } from "@chakra-ui/react";
//  Icon
import { IcoAreaBack } from "@assets/icons/icon";

type Props = {
  onClick: (props?: any) => any;
  disabled?: boolean;
};

const BtnBack = ({ onClick, disabled = false }: Props) => {
  return (
    <Button variant="filterTop" disabled={disabled} onClick={onClick}>
      <Box>
        <IcoAreaBack width="1.125rem" height="1.125rem" />
      </Box>
      뒤로가기
    </Button>
  );
};

export default BtnBack;
