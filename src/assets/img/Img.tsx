//  Lib
import { Icon, Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
//  Img
import DotTop from "@assets/img/dot_init_top.png";

const ImgBarLeft = (iconProps: any) => {
  return (
    <Flex
      as={motion.div}
      pos="absolute"
      top="50%"
      transform="translateY(-50%)"
      w="auto"
      h="auto"
      transition="0.1s linear"
      initial={{
        opacity: 0,
        left: "25px",
      }}
      animate={{
        opacity: 1,
        left: "-14px",
      }}
      exit={{
        opacity: 1,
        left: "-14px",
      }}
    >
      <Icon
        width="23px"
        height="84px"
        viewBox="0 0 23 84"
        fill="none"
        color="neutral.gray10"
        {...iconProps}
      >
        <path
          d="M15.2071 83.7812C5.48446 72.1942 0.107182 57.5792 0.00158529 42.4538C-0.104011 27.3284 5.06869 12.6397 14.6286 0.918091L22.1843 7.08038C14.0584 17.0438 9.66159 29.5291 9.75135 42.3857C9.8411 55.2423 14.4118 67.6651 22.676 77.514L15.2071 83.7812Z"
          fill="currentColor"
        />
        <circle cx="5" cy="42" r="1.5" stroke="white" />
      </Icon>
    </Flex>
  );
};

const ImgBarRight = (iconProps: any) => {
  return (
    <Flex
      as={motion.div}
      pos="absolute"
      top="50%"
      transform="translateY(-50%)"
      w="auto"
      h="auto"
      transition="0.1s linear"
      initial={{
        opacity: 0,
        right: "25px",
      }}
      animate={{
        opacity: 1,
        right: "-14px",
      }}
      exit={{
        opacity: 1,
        right: "-14px",
      }}
    >
      <Icon
        width="23px"
        height="84px"
        viewBox="0 0 23 84"
        fill="none"
        color="neutral.gray10"
        {...iconProps}
      >
        <path
          d="M7.79289 83.7811C17.5155 72.1941 22.8928 57.579 22.9984 42.4537C23.104 27.3283 17.9313 12.6396 8.37139 0.917969L0.815678 7.08026C8.94161 17.0436 13.3384 29.529 13.2487 42.3856C13.1589 55.2422 8.5882 67.6649 0.323954 77.5139L7.79289 83.7811Z"
          fill="currentColor"
        />
        <circle cx="18" cy="41.9999" r="1.5" stroke="white" />
      </Icon>
    </Flex>
  );
};

const ImgDotTop = () => {
  return (
    <Image
      pos="absolute"
      top="-10px"
      left="50%"
      transform="translateX(-50%)"
      src={DotTop}
    />
  );
};

export { ImgBarLeft, ImgBarRight, ImgDotTop };
