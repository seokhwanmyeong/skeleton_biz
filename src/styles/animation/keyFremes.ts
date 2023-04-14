import { keyframes } from "@chakra-ui/react";

const alertframes = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
`;

const alertAnimation = `${alertframes} 0.3s ease-in-out`;

export { alertAnimation };
