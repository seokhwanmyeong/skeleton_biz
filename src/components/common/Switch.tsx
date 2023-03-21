import {
  Flex,
  ResponsiveValue,
  Switch as ChakraSwitch,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

type SwitchProps = {
  variant?: string;
  size?: ResponsiveValue<(string & {}) | "sm" | "md" | "lg">;
  hasContent?: boolean;
  activeContent?: any;
  inactiveContent?: any;
  isChecked?: boolean;
  onChange: (props?: any) => any;
};

const Switch = ({
  variant,
  size,
  hasContent = true,
  activeContent,
  inactiveContent,
  isChecked = false,
  onChange,
}: SwitchProps) => {
  const [chk, setChk] = useState<boolean>(isChecked || false);

  return (
    <Flex position="relative" h="fit-content">
      {hasContent && (
        <>
          <Flex
            position="absolute"
            left={"5px"}
            zIndex={1}
            h="100%"
            alignItems="center"
            visibility={chk ? "visible" : "hidden"}
            fontSize="sm"
            fontWeight="strong"
          >
            {activeContent || "on"}
          </Flex>
          <Flex
            position="absolute"
            right={"5px"}
            zIndex={1}
            h="100%"
            alignItems="center"
            visibility={chk ? "hidden" : "visible"}
            fontSize="sm"
            fontWeight="strong"
          >
            {inactiveContent || "off"}
          </Flex>
        </>
      )}
      <ChakraSwitch
        variant={variant}
        spacing="5rem"
        size={size}
        isChecked={isChecked || chk}
        onChange={(e) => {
          setChk(e.target.checked);
          onChange(e);
        }}
      />
    </Flex>
  );
};

const ThemeSwitch = ({
  size,
  hasContent = true,
  activeContent,
  inactiveContent,
  isChecked = false,
  onChange,
}: SwitchProps) => {
  return (
    <Flex
      position="relative"
      w="42px"
      h="22px"
      cursor="pointer"
      onChange={() => {
        console.log("click");
        onChange();
      }}
    >
      {hasContent && (
        <>
          <Flex
            position="absolute"
            left={0}
            zIndex={1}
            p="0 2px"
            w="fit-content"
            h="100%"
            alignItems="center"
            visibility={isChecked ? "visible" : "hidden"}
            fontSize="sm"
            fontWeight="strong"
            color="font.primary"
          >
            {activeContent || "on"}
          </Flex>
          <Flex
            position="absolute"
            right={0}
            zIndex={1}
            p="0 2px"
            w="fit-content"
            h="100%"
            alignItems="center"
            visibility={isChecked ? "hidden" : "visible"}
            fontSize="sm"
            fontWeight="strong"
          >
            {inactiveContent || "off"}
          </Flex>
        </>
      )}
      <ChakraSwitch
        variant={"themeChanger"}
        spacing="5rem"
        size={size}
        isChecked={isChecked}
        onChange={() => {
          onChange();
          console.log("click");
        }}
      />
    </Flex>
  );
};

export { Switch, ThemeSwitch };
