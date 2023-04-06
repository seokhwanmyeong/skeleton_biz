//  Lib
import React from "react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Text,
} from "@chakra-ui/react";

type ListProps = {
  cate: string;
  textKey: string;
  subKey?: string;
  data: any[];
  onClick: (props: any) => any;
};

const DashboardLi = ({ cate, textKey, subKey, data, onClick }: ListProps) => {
  return (
    <List>
      {data.slice(0, 3).map((li: any, idx) => {
        return (
          <ListItem
            key={`${cate}-${idx}`}
            display="flex"
            flexDirection="row"
            mb="0.25rem"
            p="0.5rem 1rem"
            w="100%"
            justifyContent="space-between"
            bgColor="#FFFFFF"
            cursor="pointer"
            border="1px solid"
            borderRadius="base"
            borderColor="system.accessible.gray.type6"
            fontFamily="main"
            fontWeight="medium"
            fontSize="xs"
            lineHeight="1rem"
            color="font.secondary"
            _hover={{
              color: "font.primary",
            }}
            _last={{
              mb: "0",
            }}
            onClick={() => onClick(li)}
          >
            <Text
              textStyle="base"
              fontSize="md"
              fontWeight="medium"
              color="inherit"
            >
              {li[textKey]}
            </Text>
            {subKey && <Text textStyle="base">{li[subKey]}</Text>}
          </ListItem>
        );
      })}
    </List>
  );
};

export { DashboardLi };
