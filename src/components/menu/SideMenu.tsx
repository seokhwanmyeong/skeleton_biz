import { Fragment } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {};

const SideMenu = (props: any) => {
  const { menuList } = props;
  return (
    <Fragment>
      <Accordion allowMultiple>
        {menuList.map((menuLi: any) => {
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
                    {menuLi.children.map((depthLi: any) => {
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
