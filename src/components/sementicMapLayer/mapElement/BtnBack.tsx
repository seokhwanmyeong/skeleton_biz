//  Lib
import React from "react";
import { Button } from "@chakra-ui/react";
//  State

type Props = {
  onClick: (props?: any) => any;
  disabled?: boolean;
};

const BtnBack = ({ onClick, disabled = false }: Props) => {
  return (
    <Button color="#000000" disabled={disabled} onClick={onClick}>
      위치 지정
    </Button>
  );
};

export default BtnBack;
