import {
  Flex,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from "@chakra-ui/react";

type Props = {};

const ChakraTag = (props: any) => {
  const { tagProps, text, variant } = props;

  return <Tag variant={variant}>{text}</Tag>;
};

const TagGroup = (props: any) => {
  const { tagGroupProps, data, type } = props;

  return (
    <Flex>
      <ChakraTag text="s" variant="s" />
      <ChakraTag text="sm" variant="sm" />
      <ChakraTag text="base" variant="base" />
      <ChakraTag text="m" variant="m" />
      <ChakraTag text="wm" variant="wm" />
      <ChakraTag text="w" variant="w" />
    </Flex>
  );
};

export { ChakraTag, TagGroup };
