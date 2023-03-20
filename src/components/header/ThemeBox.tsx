//  Lib
import { useRecoilState, useRecoilValue } from "recoil";
import { Flex, useColorMode } from "@chakra-ui/react";
//  State
import { atomThemeColor } from "@states/theme/themeState";
//  Components
import { ThemeSwitch } from "@components/common/Switch";

const ThemeBox = () => {
  const { toggleColorMode } = useColorMode();
  const [themeColor, setThemeColor] = useRecoilState(atomThemeColor);

  return (
    <Flex position="relative" alignItems="center">
      <ThemeSwitch
        isChecked={themeColor === "light"}
        onChange={() => {
          setThemeColor(themeColor === "light" ? "dark" : "light");
          toggleColorMode();
        }}
      />
    </Flex>
  );
};

export default ThemeBox;
