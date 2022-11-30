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
  tagBtn?: boolean;
  isChecked?: boolean;
};

const Tag = (props: Props) => {
  const {
    text,
    variant = "subtle",
    onClick,
    tagProps,
    hasBtn = false,
    tagBtn = false,
    isChecked = false,
  } = props;

  return (
    <ChakraTag
      variant={variant}
      onClick={tagBtn ? onClick : undefined}
      style={{
        cursor: tagBtn ? "pointer" : "default",
        backgroundColor: isChecked ? "#000000" : "#999999",
      }}
    >
      <TagLabel
        style={{
          color: isChecked ? "#ffffff" : "#ededed",
        }}
      >
        {text}
      </TagLabel>
      {hasBtn && <TagCloseButton onClick={onClick} />}
    </ChakraTag>
  );
};

export default Tag;
