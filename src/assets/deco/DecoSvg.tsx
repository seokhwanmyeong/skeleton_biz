import { Icon } from "@chakra-ui/react";

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

export { Deco01 };
