import { Flex, List, ListItem, Text } from "@chakra-ui/react";

const ListTable = ({
  data,
  listKeys,
  tableProps,
}: {
  data: { [key: string]: string | number | undefined };
  listKeys: { [key: string]: string };
  tableProps?: {};
}) => {
  return (
    <List {...tableProps}>
      {Object.keys(listKeys).map((key: string, idx: number, arr) => {
        return (
          <ListItem
            key={key}
            w="100%"
            m={idx === 0 || idx === arr.length - 1 ? "0" : "1rem 0"}
            display="flex"
          >
            <Text w="40%" fontWeight="bold">
              {listKeys[key]}
            </Text>
            <Text w="100%">{data[key]}</Text>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ListTable;
