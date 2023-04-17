import { Box, Button, Flex, Grid, Heading } from "@chakra-ui/react";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
import {
  DecoBoxR,
  DecoBoxL,
} from "@components/sementicMapLayer/elementDeco/Deco";

type Props = {
  title: string;
  isOpen: boolean;
  list: {
    name: string;
    code: string;
    path: never[] | any[];
  }[];
  setSlctArea: (props: {
    slctName: string;
    slctCode: string;
    slctIdx: string;
    slctPath: any;
  }) => any;
  onClick?: (props?: any) => any;
};

const AreaListBox = ({ title, isOpen, list, setSlctArea, onClick }: Props) => {
  return (
    <Flex
      pos="absolute"
      top="4rem"
      left="50%"
      transform="translateX(-50%)"
      p="0.6875rem 0.6875rem 1.4375rem"
      display={isOpen ? "flex" : "none"}
      direction="column"
      justify="center"
      border="1px solid #BFBFBF"
    >
      <Heading
        as={"h5"}
        fontSize="md"
        lineHeight="1.5rem"
        color="font.title"
        textAlign="center"
        bg="none"
      >
        {title}
      </Heading>
      <Deco01 margin="0.625rem 0 1.375rem" width="100%" height="4px" />
      <Grid w="100%" templateColumns="repeat(5, calc(20% - 0.8rem))" gap="1rem">
        {list.map(
          ({
            name,
            code,
            path,
          }: {
            name: string;
            code: string;
            path: never[] | any[];
          }) => {
            return (
              <Button
                variant="slctArea"
                key={`key-${code}`}
                onClick={() => {
                  setSlctArea({
                    slctName: name,
                    slctCode: code,
                    slctIdx: `area${code}`,
                    slctPath: path,
                  });
                  onClick && onClick();
                }}
              >
                {name}
              </Button>
            );
          }
        )}
      </Grid>
      <Flex
        position="absolute"
        top="-4.6%"
        left="50%"
        transform="translateX(-50%)"
        gap="0.25rem"
      >
        <Box
          boxSizing="border-box"
          w="0.25rem"
          h="0.25rem"
          background="#FFFFFF"
          border="1px solid #FFFFFF"
        ></Box>
        <Box
          boxSizing="border-box"
          w="0.25rem"
          h="0.25rem"
          background="#FFFFFF"
          border="1px solid #FFFFFF"
        ></Box>
      </Flex>
      <DecoBoxL
        position="absolute"
        top="50%"
        left="-0.5rem"
        transform="translateY(-50%)"
        width="3.6%"
        height="107%"
        color="#FFFFFF"
      />
      <DecoBoxR
        position="absolute"
        top="50%"
        right="-0.5rem"
        transform="translateY(-50%)"
        width="3.6%"
        height="107%"
        color="#FFFFFF"
      />
      <Box
        zIndex={-1}
        position="absolute"
        top={0}
        left={0}
        display="block"
        width="100%"
        height="100%"
        bg="rgba(255, 255, 255, 0.75)"
        backdropFilter="blur(5px)"
        userSelect="none"
      ></Box>
    </Flex>
  );
};

export default AreaListBox;
