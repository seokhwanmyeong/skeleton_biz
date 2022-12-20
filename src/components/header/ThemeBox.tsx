//  Lib
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Flex, Button, Link, useDisclosure, Grid } from "@chakra-ui/react";
//  State
import { themeList, atomThemeColor } from "@src/states/theme/themeState";
//  Components
import Tag from "@components/common/Tag";

const ThemeBox = () => {
  const themeArr = useRecoilValue(themeList);
  const setThemeColor = useSetRecoilState(atomThemeColor);
  const { isOpen, onToggle } = useDisclosure();

  const themeHandler = (theme: string) => {
    onToggle();
    setThemeColor(theme);
  };

  return (
    <Flex position="relative">
      <Button
        color="primary.reverse.font"
        bgColor="primary.reverse.color"
        _hover={{
          backgroundColor: "primary.reverse.hover",
        }}
        onClick={onToggle}
      >
        Theme
      </Button>
      <Flex
        position="absolute"
        bottom="-50px"
        right="0"
        display={isOpen ? "flex" : "none"}
        opacity={isOpen ? 1 : 0}
        h="auto"
        p="10px"
        bgColor="primary.main.bg"
        border="1px solid"
        borderColor="primary.main.bdColor"
        borderRadius="5px"
        gap="5px"
        transition="0.5s"
      >
        {themeArr.map((li) => (
          <Tag
            key={`tag-theme-${li.key}`}
            tagBtn={true}
            text={li.title}
            onClick={() => {
              themeHandler(li.key);
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default ThemeBox;
