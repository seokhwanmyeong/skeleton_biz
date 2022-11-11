//  Lib
import React from "react";
import { Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const backRouteHandler = (index: number) => {
    navigate(index);
  };

  return (
    <React.Fragment>
      <Heading>ErrorPage</Heading>
      <Button onClick={() => backRouteHandler(-1)}>To The Back</Button>
    </React.Fragment>
  );
};

export default ErrorPage;
