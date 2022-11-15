import { useState } from "react";
import { Flex, Button } from "@chakra-ui/react";

type Props = {};

const SementicSearchEngine = (props: Props) => {
  const [isOpen, setOpen] = useState(true);
  const onToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <Flex
      position="absolute"
      left="0"
      top="0"
      zIndex="100"
      h="100%"
      flexDirection="row-reverse"
    >
      <Button bgColor="#555555" onClick={onToggle}>
        Toggle
      </Button>
      <Flex
        w={isOpen ? "200px" : "0"}
        alignItems="center"
        justifyContent="center"
        borderLeft="1px solid"
        bgColor="#555555"
        overflow="hidden"
        transition="0.3s"
      >
        SementicViewer
      </Flex>
    </Flex>
  );
};

export default SementicSearchEngine;
