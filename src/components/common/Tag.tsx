import {
  Tag as ChakraTag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from "@chakra-ui/react";

type Props = {
  text: string;
  variant?: string;
  onClick?: any;
  tagProps?: any;
  hasBtn?: boolean;
};

const Tag = (props: Props) => {
  const { text, variant = "subtle", onClick, tagProps, hasBtn = false } = props;

  return (
    <ChakraTag variant={variant}>
      <TagLabel>{text}</TagLabel>
      {hasBtn && <TagCloseButton onClick={onClick} />}
    </ChakraTag>
  );
};

export default Tag;
