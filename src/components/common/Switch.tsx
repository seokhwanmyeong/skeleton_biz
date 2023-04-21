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
  isDisabled?: boolean;
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

const SwitchTheme = ({
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

const SwitchFilter = ({
  size,
  hasContent = true,
  isChecked = false,
  isDisabled = false,
  onChange,
}: SwitchProps) => {
  return (
    <Flex
      position="relative"
      w="2.5rem"
      h="1rem"
      cursor="pointer"
      onChange={() => {
        if (isDisabled) return;

        onChange();
      }}
    >
      {hasContent && (
        <>
          <Flex
            position="absolute"
            top="1px"
            left={0}
            zIndex={1}
            pl="0.5rem"
            w="fit-content"
            h="100%"
            alignItems="center"
            visibility={isChecked ? "visible" : "hidden"}
            textStyle="base"
            fontSize="xs"
            fontWeight="regular"
            lineHeight="2rem"
            color="font.primary"
            cursor={isDisabled ? "not-allowed" : "pointer"}
            onClick={(e) => {
              if (isDisabled) return;
              e.stopPropagation();
              onChange();
            }}
          >
            ON
          </Flex>
          <Flex
            position="absolute"
            top="1px"
            right={0}
            zIndex={1}
            w="fit-content"
            h="100%"
            alignItems="center"
            visibility={isChecked ? "hidden" : "visible"}
            textStyle="base"
            fontSize="xs"
            fontWeight="regular"
            cursor={isDisabled ? "not-allowed" : "pointer"}
            onClick={(e) => {
              if (isDisabled) return;
              e.stopPropagation();
              onChange();
            }}
          >
            OFF
          </Flex>
        </>
      )}
      <ChakraSwitch
        variant="filterControl"
        spacing="5rem"
        size={size}
        isDisabled={isDisabled}
        isChecked={isChecked}
        onChange={(e) => {
          e.stopPropagation();
          onChange();
        }}
      />
    </Flex>
  );
};

export { Switch, SwitchTheme, SwitchFilter };
