//  Lib
import { Fragment, useEffect } from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
//  Components
import SementicFilter from "@components/sementicMapLayer/SementicFilter";
import SementicSearchEngine from "@components/sementicMapLayer/SementicSearchEngine";
import SementicMap from "@components/sementicMapLayer/SementicMap";
import SementicViewer from "@components/sementicMapLayer/SementicViewer";

const Maps = () => {
  return (
    <Flex w="100%" h="inherit" flexDirection="column">
      <Flex h="5rem">
        <SementicFilter />
      </Flex>
      <Flex flex="1" flexDirection="row" position="relative">
        <SementicSearchEngine />
        <SementicMap />
        <SementicViewer />
      </Flex>
    </Flex>
  );
};

export default Maps;
