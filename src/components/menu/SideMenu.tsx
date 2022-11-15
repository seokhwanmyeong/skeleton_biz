//  Lib
import { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

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

const SideMenu = () => {
  const menu: Menu[] = [
    {
      title: "erp01",
      hasChild: true,
      path: "",
      children: [
        { title: "erp01-Sub01", path: "/erp/erp01" },
        { title: "erp01-Sub02", path: "/erp/erp01" },
        { title: "erp01-Sub03", path: "/erp/erp01" },
      ],
    },
    {
      title: "erp02",
      hasChild: true,
      path: "",
      children: [
        { title: "erp02-Sub01", path: "/erp/erp02" },
        { title: "erp02-Sub02", path: "/erp/erp02" },
        { title: "erp02-Sub03", path: "/erp/erp02" },
      ],
    },
  ];

  return (
    <Fragment>
      <Accordion
        allowMultiple
        style={{ borderRight: "1px solid", width: "180px" }}
      >
        {menu.map((menuLi: Menu) => {
          return (
            <AccordionItem key={menuLi.title}>
              <AccordionButton>
                <Box>
                  {menuLi.hasChild ? (
                    <Fragment>
                      {menuLi.title}
                      <AccordionIcon />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Link to={menuLi.path}>{menuLi.title}</Link>
                    </Fragment>
                  )}
                </Box>
              </AccordionButton>
              {menuLi.hasChild && (
                <AccordionPanel>
                  <Accordion allowMultiple>
                    {menuLi.children.map((depthLi: DepthMenu) => {
                      return (
                        <AccordionItem key={depthLi.title}>
                          <AccordionButton>
                            <Box>
                              <Link to={depthLi.path}>{depthLi.title}</Link>
                            </Box>
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
