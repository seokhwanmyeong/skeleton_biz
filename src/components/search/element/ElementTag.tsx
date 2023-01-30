import { Button, Tag, Icon } from "@chakra-ui/react";

type Props = {};

const ElementTag = ({
  onRemoveClick,
  children,
  ...props
}: {
  onRemoveClick: any;
  children: any;
}) => (
  <Tag bgColor="#4e4e4e" {...props}>
    {children}
    <Button variant="ghost" onClick={onRemoveClick}>
      <Icon type="close" />
    </Button>
  </Tag>
);

export default ElementTag;
