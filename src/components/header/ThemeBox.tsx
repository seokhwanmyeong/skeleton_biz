//  Lib
import { useRecoilState, useRecoilValue } from "recoil";
import { Flex, useColorMode } from "@chakra-ui/react";
//  State
import { atomThemeColor } from "@states/theme/stateTheme";
//  Components
import { SwitchTheme } from "@components/common/Switch";

const ThemeBox = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [themeColor, setThemeColor] = useRecoilState(atomThemeColor);
  return (
    <Flex position="relative" alignItems="center">
      <SwitchTheme
        isChecked={themeColor === "light"}
        onChange={() => {
          console.log(themeColor);
          console.log(colorMode);
          if (themeColor === colorMode) {
            setThemeColor(themeColor === "light" ? "dark" : "light");
            toggleColorMode();
          } else {
            if (colorMode === "light") {
              setThemeColor("dark");
              toggleColorMode();
            } else {
              setThemeColor("light");
              toggleColorMode();
            }
          }
        }}
      />
    </Flex>
  );
};

export default ThemeBox;
