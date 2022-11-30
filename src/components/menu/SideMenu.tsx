//  Lib
import { Fragment, useCallback, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
//  State
import { subMenuSelector } from "@states/menu/stateMenu";
//  Type
import { SubMenuType, DepthMenuType } from "@util/type/menuType";

const SideMenu = () => {
  const location = useLocation();
  const menu = useRecoilValue(subMenuSelector("erp"));
  const [rootState, setRootState] = useState("/");
  const navigate = useNavigate();

  const navigator = useCallback((path: string) => {
    const naviOption = {};
    navigate(path, naviOption);
  }, []);

  useEffect(() => {
    setRootState(location.pathname);
  }, [location]);

  return (
    <Fragment>
      <Accordion
        variant="sideMenu"
        allowMultiple
        minWidth="200px"
        borderRight="1px solid"
        borderColor="primary.main.bdColor"
      >
        {menu.map((menuLi: SubMenuType, idx: number) => {
          return (
            <AccordionItem key={menuLi.title}>
              {menuLi.hasChild ? (
                <AccordionButton
                  style={{
                    fontWeight: menuLi.path === rootState ? "bold" : "",
                    justifyContent: "space-between",
                  }}
                >
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
                    {menuLi.children.map((depthLi: DepthMenuType) => {
                      return (
                        <AccordionItem key={depthLi.title}>
                          <AccordionButton
                            onClick={() => navigator(depthLi.path)}
                            style={{
                              fontWeight:
                                depthLi.path === rootState ? "bold" : "",
                            }}
                          >
                            {depthLi.title}
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
