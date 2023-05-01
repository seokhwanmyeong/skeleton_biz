import { keyframes } from "@chakra-ui/react";

const alertFrames = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
`;

const boxBaseFrames = keyframes`
0% { opacity: 0 }
100% { opacity: 1 }
`;

const alertAnimation = `${alertFrames} 0.3s ease-in-out`;
const toolAnimation = `${alertFrames} 0.3s linear`;
const boxBaseAnimation = `${boxBaseFrames} 0.2s ease-in-out`;

export { alertAnimation, boxBaseAnimation, toolAnimation };
