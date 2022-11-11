// Lib
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
// Style
import { Flex } from "@chakra-ui/react";
// Components
import Header from "../header/Header";
import Footer from "../footer/Footer";
import SideMenu from "../menu/SideMenu";

const MainFrame = (children: any) => {
  const location = useLocation();
  const [rootState, setRootState] = useState("/");

  const sideMenu: any = {
    maps: [
      {
        title: "map01",
        hasChild: true,
        path: "",
        children: [
          { title: "map01-Sub01", path: "/maps/map01" },
          { title: "map01-Sub02", path: "/maps/map01" },
          { title: "map01-Sub03", path: "/maps/map01" },
        ],
      },
      {
        title: "map02",
        hasChild: true,
        path: "",
        children: [
          { title: "map02-Sub01", path: "/maps/map02" },
          { title: "map02-Sub02", path: "/maps/map02" },
          { title: "map02-Sub03", path: "/maps/map02" },
        ],
      },
    ],
    erp: [
      {
        title: "erp01",
        hasChild: true,
        path: "",
        children: [
          { title: "erp01-Sub01", path: "/maps/map01" },
          { title: "erp01-Sub02", path: "/maps/map01" },
          { title: "erp01-Sub03", path: "/maps/map01" },
        ],
      },
      {
        title: "erp02",
        hasChild: true,
        path: "",
        children: [
          { title: "erp02-Sub01", path: "/maps/map02" },
          { title: "erp02-Sub02", path: "/maps/map02" },
          { title: "erp02-Sub03", path: "/maps/map02" },
        ],
      },
    ],
  };

  useEffect(() => {
    setRootState(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <Flex flexDirection="column" minH="100vh">
      <Header />
      <Flex w="100%" p="1rem 0" flexDirection="row" flex="auto">
        {(rootState === "maps" || rootState === "erp") && (
          <SideMenu menuList={sideMenu[`${rootState}`]} />
        )}
        <Flex w="100%" p="1rem 2rem" flexDirection="column" flex="1">
          <Outlet />
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default MainFrame;
