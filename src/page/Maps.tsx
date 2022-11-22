//  Lib
import { Fragment, useEffect } from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
//  Components
import SementicFilter from "@src/components/sementicMapLayer/filter/SementicFilter";
import SementicSearchEngine from "@src/components/sementicMapLayer/filter/SementicSearchEngine";
import SementicMap from "@components/sementicMapLayer/SementicMap";
import SementicViewer from "@components/sementicMapLayer/SementicViewer";

const Maps = () => {
  return (
    <Flex w="100%" h="inherit" flexDirection="column">
      {/* <Flex flex="0">
        <SementicFilter />
      </Flex> */}
      <Flex flex="1" flexDirection="row" position="relative">
        <SementicSearchEngine />
        <SementicMap />
        <SementicViewer />
      </Flex>
    </Flex>
  );
};

export default Maps;
