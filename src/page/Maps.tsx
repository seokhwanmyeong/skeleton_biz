//  Lib
import { Flex } from "@chakra-ui/react";
//  Components
import SementicSearchEngine from "@src/components/sementicMapLayer/SementicSearchEngine";
import SementicMap from "@components/sementicMapLayer/SementicMap";
import SementicViewer from "@components/sementicMapLayer/SementicViewer";

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
        <SementicSearchEngine />
        <SementicMap />
        <SementicViewer />
      </Flex>
    </Flex>
  );
};

export default Maps;
