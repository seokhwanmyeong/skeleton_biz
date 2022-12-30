//  Lib
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
//  State
import {
  subMenuSelector,
  indexChecker,
  SubRouteType,
  DepthRouteType,
} from "@states/route/stateRoute";
//  CustomHook
import useLocationState from "@src/hook/useLocationState";

const MenuSide = () => {
  const { rootState, pathState } = useLocationState();
  const subMenu = useRecoilValue(subMenuSelector(rootState) || undefined);
  const navigate = useNavigate();

  const navigator = (path: string): void => {
    if (path) {
      const naviOption = {};

      navigate(
        indexChecker(path) ? `/${rootState}` : `/${rootState}/${path}`,
        naviOption
      );
    } else {
      alert("path missing");
    }
  };

  const pathChecker = (path: string): boolean => {
    if (path) {
      return indexChecker(path)
        ? pathState === `/${rootState}`
        : pathState.includes(path);
    } else {
      return false;
    }
  };

  return (
    <Accordion variant="menuSide" allowMultiple>
      {subMenu &&
        subMenu.map((menuLi: SubRouteType) => (
          <AccordionItem key={menuLi.title}>
            <AccordionButton
              onClick={() => {
                menuLi.hasChild ? null : navigator(menuLi.path);
              }}
              style={{
                fontWeight: pathChecker(menuLi.path) ? "bold" : "",
              }}
            >
              {menuLi.title}
              {menuLi.hasChild && <AccordionIcon />}
            </AccordionButton>
            {menuLi.hasChild && (
              <AccordionPanel>
                <Accordion allowMultiple>
                  {menuLi.children &&
                    menuLi.children.map((depthLi: DepthRouteType) => (
                      <AccordionItem key={depthLi.title}>
                        <AccordionButton
                          onClick={() => navigator(depthLi.path)}
                          style={{
                            fontWeight: pathChecker(depthLi.path) ? "bold" : "",
                          }}
                        >
                          {depthLi.title}
                        </AccordionButton>
                      </AccordionItem>
                    ))}
                </Accordion>
              </AccordionPanel>
            )}
          </AccordionItem>
        ))}
    </Accordion>
  );
};

export default MenuSide;
