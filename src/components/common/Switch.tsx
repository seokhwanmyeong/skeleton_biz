//  Lib
import { useState } from "react";
import {
  Flex,
  ResponsiveValue,
  Switch as ChakraSwitch,
} from "@chakra-ui/react";
//  Icon
import { IcoLight, IcoDark } from "@assets/icons/icon";

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
        onChange();
      }}
    >
      {hasContent && (
        <>
          <Flex
            position="absolute"
            left={0}
            zIndex={1}
            p="0 6px"
            w="fit-content"
            h="100%"
            alignItems="center"
            visibility={isChecked ? "visible" : "hidden"}
            fontSize="sm"
            fontWeight="strong"
            color="font.primary"
            onClick={(e) => {
              e.stopPropagation();
              onChange();
            }}
          >
            <IcoLight color="font.inverse" />
          </Flex>
          <Flex
            position="absolute"
            right={0}
            zIndex={1}
            p="0 6px"
            w="fit-content"
            h="100%"
            alignItems="center"
            visibility={isChecked ? "hidden" : "visible"}
            fontSize="sm"
            fontWeight="strong"
            onClick={(e) => {
              e.stopPropagation();
              onChange();
            }}
          >
            <IcoDark color="system.accessible.gray.type6" />
          </Flex>
        </>
      )}
      <ChakraSwitch
        variant={"themeChanger"}
        spacing="5rem"
        size={size}
        isChecked={isChecked}
        onChange={(e) => {
          e.stopPropagation();
          onChange();
        }}
      />
    </Flex>
  );
};

export { Switch, ThemeSwitch };
