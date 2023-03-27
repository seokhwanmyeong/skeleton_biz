//  Lib
import { Flex } from "@chakra-ui/react";
//  Components
import SementicSearchEngine from "@components/sementicMapLayer/SementicSearchEngine";
import SementicMap from "@components/sementicMapLayer/SementicMap";
import SementicViewer from "@components/sementicMapLayer/SementicViewer";
import BaseAreaProvider from "@src/components/sementicMapLayer/filter/BaseAreaProvider";
import SementicMapLagacy from "@src/components/sementicMapLayer/SementicMapLagacy";

const Maps = () => {
  return (
    <Flex w="inherit" h="inherit" flexDirection="column">
      <Flex
        flex="1"
        flexDirection="row"
        position="relative"
        w="inherit"
        overflow="hidden"
      >
        <SementicMap />
        {/* <BaseAreaProvider>
          <SementicSearchEngine />
          <SementicMap />
          <SementicViewer />
        </BaseAreaProvider> */}
      </Flex>
    </Flex>
  );
};

export default Maps;
