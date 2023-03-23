import { Flex, List, ListItem, Text } from "@chakra-ui/react";

const ListTable = ({
  data,
  listKeys,
  isDivide = false,
  tableProps,
}: {
  data: { [key: string]: any };
  listKeys: { [key: string]: string };
  isDivide?: boolean;
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
            gap="1rem"
          >
            <Text w="50%" textStyle="list.title">
              {listKeys[key]}
            </Text>
            <Text w="100%" textStyle="list.text">
              {data[key]}
            </Text>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ListTable;
