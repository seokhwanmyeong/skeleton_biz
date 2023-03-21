//  Lib
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Flex, Image, Heading, Text, Button, useTheme } from "@chakra-ui/react";
//  State
import {
  subMenuSelector,
  indexChecker,
  SubRouteType,
} from "@states/route/stateRoute";
//  CustomHook
import useLocationState from "@hook/useLocationState";

const MenuSide = () => {
  const { rootState, pathState } = useLocationState();
  const subMenu = useRecoilValue(subMenuSelector(rootState) || undefined);
  const navigate = useNavigate();
  const theme = useTheme();

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
    <Flex
      p="0.875rem 0"
      w="4.75rem"
      h="100%"
      flex="none"
      direction="column"
      bgColor="bg.primary"
      border="1.42332px solid"
      borderColor="neutral.gray1"
      boxShadow="0px 2.84664px 2.84664px rgba(0, 0, 0, 0.25)"
      backdropFilter="blur(3.5583px)"
      borderRadius="10.6749px"
    >
      <Flex mb="26px" direction="column" align="center" gap="6px">
        <Flex
          w="1.5rem"
          h="1.5rem"
          align="center"
          justify="center"
          borderRadius="50%"
          boxShadow="0px 0px 2.84664px rgba(0, 0, 0, 0.4)"
          bgColor="#FFFFFF"
        >
          <Image />
        </Flex>
        <Heading variant="subMenu">BBQ</Heading>
        <Text
          fontSize="0.534rem"
          fontFamily="main"
          fontWeight="medium"
          textAlign="center"
          lineHeight="0.625rem"
          color="font.primary"
          opacity="0.8"
        >
          admin
        </Text>
      </Flex>
      <Flex direction="column" align="center" gap="2rem">
        {subMenu &&
          subMenu.map((menuLi: SubRouteType) => {
            return menuLi.isMenu ? (
              <Button
                variant="subMenu"
                key={menuLi.title}
                isActive={pathChecker(menuLi.path)}
                onClick={() => navigator(menuLi.path)}
              >
                {menuLi.icon && (
                  <Flex
                    w="2.5rem"
                    h="2.5rem"
                    align="center"
                    justify="center"
                    bgColor="#FFFFFF"
                    borderRadius="70px"
                    boxShadow="0px 0px 4px 0px #00000040"
                    border="1px solid #FFFFFF"
                    bg="linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0))"
                  >
                    {menuLi.icon()}
                  </Flex>
                )}
                {menuLi.title}
              </Button>
            ) : null;
          })}
      </Flex>
    </Flex>
    // <Accordion variant="menuSide" allowMultiple>
    //   {subMenu &&
    //     subMenu.map((menuLi: SubRouteType) =>
    //       menuLi.isMenu ? (
    //         <AccordionItem key={menuLi.title}>
    //           <AccordionButton
    //             onClick={() => {
    //               menuLi.hasChild ? null : navigator(menuLi.path);
    //             }}
    //             style={{
    //               fontWeight: pathChecker(menuLi.path) ? "bold" : "",
    //             }}
    //           >
    //             {menuLi.title}
    //             {menuLi.hasChild && <AccordionIcon />}
    //           </AccordionButton>
    //           {menuLi.hasChild && (
    //             <AccordionPanel>
    //               <Accordion allowMultiple>
    //                 {menuLi.children &&
    //                   menuLi.children.map((depthLi: DepthRouteType) =>
    //                     depthLi.isMenu ? (
    //                       <AccordionItem key={depthLi.title}>
    //                         <AccordionButton
    //                           onClick={() => navigator(depthLi.path)}
    //                           style={{
    //                             fontWeight: pathChecker(depthLi.path)
    //                               ? "bold"
    //                               : "",
    //                           }}
    //                         >
    //                           {depthLi.title}
    //                         </AccordionButton>
    //                       </AccordionItem>
    //                     ) : null
    //                   )}
    //               </Accordion>
    //             </AccordionPanel>
    //           )}
    //         </AccordionItem>
    //       ) : null
    //     )}
    // </Accordion>
  );
};

export default MenuSide;
