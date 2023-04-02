import { Icon, createIcon, Flex, Box } from "@chakra-ui/react";

type HEX = `#${string}`;

const Deco01 = (iconProps: any) => {
  return (
    <Icon
      viewBox="0 0 429 4"
      // boxSize="2rem"
      fill="none"
      {...iconProps}
    >
      <path d="M2 2H427" stroke="#535353" strokeOpacity="0.5" />
      <path d="M44 2H385" stroke="#414141" strokeWidth="1.5" />
      <rect width="4" height="4" fill="#414141" />
      <rect x="425" width="4" height="4" fill="#414141" />
    </Icon>
  );
};

const DecoBoxL = (iconProps: any) => {
  return (
    <Icon viewBox="0 0 17 260" fill="none" {...iconProps}>
      <path d="M1 0V260" stroke="white" />
      <rect x="1" width="16" height="1" fill="white" />
      <rect x="1" y="259" width="16" height="1" fill="white" />
    </Icon>
  );
};

const DecoBoxR = (iconProps: any) => {
  return (
    <Icon viewBox="0 0 17 260" fill="none" {...iconProps}>
      <path d="M16 0V260" stroke="white" />
      <rect width="16" height="1" fill="white" />
      <rect y="259" width="16" height="1" fill="white" />
    </Icon>
  );
};

export { Deco01, DecoBoxL, DecoBoxR };
