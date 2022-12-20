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

const SideMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathState = location.pathname;
  const root = pathState.split("/")[1];
  const menu = useRecoilValue(subMenuSelector(root) || undefined);

  const navigator = (path: string): void => {
    if (path) {
      const naviOption = {};

      navigate(
        indexChecker(path) ? `/${root}` : `/${root}/${path}`,
        naviOption
      );
    } else {
      alert("path missing");
    }
  };

  const pathChecker = (path: string): boolean => {
    if (path) {
      return indexChecker(path)
        ? pathState === `/${root}`
        : pathState.includes(path);
    } else {
      return false;
    }
  };

  return (
    <Accordion variant="sideMenu" allowMultiple>
      {menu &&
        menu.map((menuLi: SubRouteType) => (
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

export default SideMenu;
