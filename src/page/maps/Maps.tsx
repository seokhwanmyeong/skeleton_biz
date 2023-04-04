//  Lib
import { Flex } from "@chakra-ui/react";
//  Components
import SementicSearchEngine from "@components/sementicMapLayer/SementicSearchEngine";
import SementicMap from "@components/sementicMapLayer/SementicMap";
import SementicViewer from "@components/sementicMapLayer/SementicViewer";

const Maps = () => {
  return (
    <Flex w="inherit" h="100%" flexDirection="column">
      <Flex
        flex="1"
        flexDirection="row"
        position="relative"
        w="inherit"
        h="100%"
        overflow="hidden"
      >
        <SementicViewer />
        <SementicSearchEngine />
        <SementicMap />
      </Flex>
    </Flex>
  );
};

export default Maps;
