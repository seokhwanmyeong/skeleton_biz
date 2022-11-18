//  Lib
import { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Heading, Flex } from "@chakra-ui/react";
//  Components
import SideMenu from "@components/menu/SideMenu";

const Erp = () => {
  const location = useLocation();
  const [rootState, setRootState] = useState("/");

  useEffect(() => {
    setRootState(location.pathname);
  }, [location]);

  return (
    <Fragment>
      <SideMenu rootState={rootState} />
      <Flex>
        <Heading>ERP: {rootState}</Heading>
      </Flex>
    </Fragment>
  );
};

export default Erp;
