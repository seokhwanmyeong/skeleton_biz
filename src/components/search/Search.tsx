//  LIB
import { useEffect, useState, useContext } from "react";
import { QueryBuilder, useCubeQuery } from "@cubejs-client/react";
import type { Query } from "@cubejs-client/core";
import { Flex, Button, Text, FormControl, FormLabel } from "@chakra-ui/react";
import SearchMember from "./element/SearchMember";
import { CubeContext } from "@cubejs-client/react";
import { IcoSearch } from "@assets/icons/icon";
import { Formik, Form, FormikProps } from "formik";
//  Component
import { SelectAddr } from "@components/common/Select";

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
      {/* <QueryBuilder
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
                <Button variant="search" onClick={() => queryHandler()}>
                  <IcoSearch />
                  <Text variant="search">검색</Text>
                </Button>
              </Flex>
            </Flex>
          );
        }}
      /> */}
      <Flex justifyContent="center">
        <Button variant="search" onClick={() => {}}>
          <IcoSearch />
          <Text variant="search">검색</Text>
        </Button>
      </Flex>
    </Flex>
  );
};

const SearchTest = ({
  initVal,
  setValues,
}: {
  initVal: {};
  setValues: any;
}) => {
  return (
    <Flex
      p="2rem 2rem"
      border="1px solid"
      borderColor="primary.main.bdColor"
      borderRadius="base"
    >
      <Formik
        initialValues={initVal}
        onSubmit={(values) => {
          if (values && setValues !== undefined) {
            setValues(values);
          }
        }}
      >
        {({ handleSubmit, errors, touched, getFieldProps, setFieldValue }) => {
          return (
            <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Flex w="100%" flexDirection="row" gap="2rem">
                <FormControl as={Flex} flexDirection="row">
                  <FormLabel
                    display="flex"
                    alignItems="center"
                    marginBottom={0}
                    gap="0.5rem"
                  >
                    {/* <Text color="red.500">*</Text> */}
                    검색어
                  </FormLabel>
                  {fieldElement[fieldType]}
                  <SelectAddr
                    selectProps={fieldStyle}
                    value={_value}
                    onChange={(val: any) => setFieldValue(_fieldKey, val)}
                    isDisabled={isDisabled}
                    isInvalid={isInvalid}
                    isReadOnly={isReadOnly}
                    isRequired={isRequired}
                  />
                </FormControl>
                <Flex justifyContent="center">
                  <Button
                    type="submit"
                    variant="search"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    <IcoSearch />
                    <Text variant="search">검색</Text>
                  </Button>
                </Flex>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Flex>
  );
};

export default Search;
