//  LIB
import { useEffect, useState, useContext } from "react";
import { QueryBuilder, useCubeQuery } from "@cubejs-client/react";
import type { Query } from "@cubejs-client/core";
import { Flex, Button } from "@chakra-ui/react";
import SearchMember from "./element/SearchMember";
import { CubeContext } from "@cubejs-client/react";

type PropsSearch = {
  initQ: Query;
  totalQ?: { measures: string[] };
  page?: number;
  setTotal?: React.Dispatch<React.SetStateAction<number>>;
  setQueryData: React.Dispatch<React.SetStateAction<any[]>>;
};

const Search = ({
  initQ,
  totalQ,
  page,
  setTotal,
  setQueryData,
}: PropsSearch) => {
  const { cubejsApi } = useContext(CubeContext);
  const [query, setQuery] = useState<Query>({
    ...initQ,
    offset: page || initQ.offset || 1,
  });
  const { resultSet, error, isLoading } = useCubeQuery(query);

  useEffect(() => {
    if (resultSet) {
      setQueryData(resultSet.tablePivot());
      if (totalQ && setTotal) {
        cubejsApi.load(totalQ).then((res) => {
          const total = Number(res.rawData()[0][totalQ.measures[0]]) || 1;
          setTotal(total);
        });
      }
    }
  }, [resultSet]);

  useEffect(() => {
    setQuery({
      ...query,
      offset: page || 1,
    });
  }, [page]);

  return (
    <Flex flexDirection="column" gap="10px">
      <QueryBuilder
        defaultChartType="table"
        // onVizStateChanged={(vizState) => {}}
        render={({
          validatedQuery,
          isQueryPresent,
          chartType,
          updateChartType,
          measures,
          availableMeasures,
          updateMeasures,
          dimensions,
          availableDimensions,
          updateDimensions,
          segments,
          availableSegments,
          updateSegments,
          filters,
          updateFilters,
          timeDimensions,
          availableTimeDimensions,
          updateTimeDimensions,
          orderMembers,
          updateOrder,
          pivotConfig,
          updatePivotConfig,
          resultSet,
        }) => {
          resultSet && console.log("resultSet\n", resultSet.tablePivot(), "\n");
          // console.log("validatedQuery\n", validatedQuery, "\n");
          // console.log("Mesures\n", measures, availableMeasures, "\n");
          // console.log("Dimensions\n", dimensions, availableDimensions, "\n");
          // console.log("segments\n", segments, availableSegments, "\n");
          // console.log("Filters\n", filters, "\n");
          // console.log("Config\n", pivotConfig, updatePivotConfig, "\n");
          // console.log(
          //   "Etc\n",
          //   timeDimensions,
          //   availableTimeDimensions,
          //   orderMembers
          // );
          const queryHandler = () => {
            console.log("click");
          };

          return (
            <Flex
              w="100%"
              flexDirection="column"
              gap="20px"
              p="2rem 2rem"
              border="1px solid"
              borderColor="primary.main.bdColor"
              borderRadius="base"
            >
              <Flex gap="20px" flexWrap="wrap">
                {availableMeasures.length > 0 && (
                  <SearchMember
                    members={measures}
                    availableMembers={availableMeasures}
                    addMemberName="Measure"
                    updateMethods={updateMeasures}
                  />
                )}
                {availableDimensions.length > 0 && (
                  <SearchMember
                    members={dimensions}
                    availableMembers={availableDimensions}
                    addMemberName="Dimension"
                    updateMethods={updateDimensions}
                  />
                )}
                {availableSegments.length > 0 && (
                  <SearchMember
                    members={segments}
                    availableMembers={availableSegments}
                    addMemberName="Segment"
                    updateMethods={updateSegments}
                  />
                )}
              </Flex>
              <Flex justifyContent="center">
                <Button
                  w="10rem"
                  variant="reverse"
                  justifyContent="center"
                  onClick={() => queryHandler()}
                >
                  검색
                </Button>
              </Flex>
            </Flex>
          );
        }}
      />
    </Flex>
  );
};

export default Search;
