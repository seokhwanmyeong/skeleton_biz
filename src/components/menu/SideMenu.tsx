//  Lib
import { Fragment, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

type Props = {
  rootState: string;
};

type Menu = {
  title: string;
  hasChild: boolean;
  path: string;
  children: DepthMenu[];
};

type DepthMenu = {
  title: string;
  path: string;
};

const SideMenu = (props: Props) => {
  const { rootState } = props;
  const navigate = useNavigate();
  const menu: Menu[] = [
    {
      title: "Dash-Board",
      hasChild: false,
      path: "/erp",
      children: [],
    },
    {
      title: "erp01",
      hasChild: true,
      path: "",
      children: [
        { title: "erp01-Sub01", path: "/erp/erp01-Sub01" },
        { title: "erp01-Sub02", path: "/erp/erp01-Sub02" },
        { title: "erp01-Sub03", path: "/erp/erp01-Sub03" },
      ],
    },
    {
      title: "erp02",
      hasChild: true,
      path: "",
      children: [
        { title: "erp02-Sub01", path: "/erp/erp02-Sub01" },
        { title: "erp02-Sub02", path: "/erp/erp02-Sub02" },
        { title: "erp02-Sub03", path: "/erp/erp02-Sub03" },
      ],
    },
    {
      title: "erp03",
      hasChild: false,
      path: "/erp/erp03",
      children: [],
    },
    {
      title: "erp04",
      hasChild: false,
      path: "/erp/erp04",
      children: [],
    },
  ];

  const navigator = useCallback((path: string) => {
    const naviOption = {};
    navigate(path, naviOption);
  }, []);

  return (
    <Fragment>
      <Accordion
        allowMultiple
        style={{ borderRight: "1px solid", width: "180px" }}
      >
        {menu.map((menuLi: Menu, idx: number) => {
          return (
            <AccordionItem key={menuLi.title}>
              {menuLi.hasChild ? (
                <AccordionButton>
                  {menuLi.title}
                  <AccordionIcon />
                </AccordionButton>
              ) : (
                <AccordionButton
                  onClick={() => navigator(menuLi.path)}
                  style={{
                    fontWeight: menuLi.path === rootState ? "bold" : "",
                  }}
                >
                  {menuLi.title}
                </AccordionButton>
              )}
              {menuLi.hasChild && (
                <AccordionPanel>
                  <Accordion allowMultiple>
                    {menuLi.children.map((depthLi: DepthMenu) => {
                      return (
                        <AccordionItem key={depthLi.title}>
                          <AccordionButton
                            onClick={() => navigator(depthLi.path)}
                            style={{
                              fontWeight:
                                menuLi.path === rootState ? "bold" : "",
                            }}
                          >
                            {menuLi.title}
                          </AccordionButton>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </AccordionPanel>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </Fragment>
  );
};

export default SideMenu;
