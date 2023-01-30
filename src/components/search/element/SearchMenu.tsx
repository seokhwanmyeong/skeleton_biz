import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

const SearchMenu = ({
  addMemberName,
  availableMembers,
  updateMethods,
}: any) => (
  <Menu>
    <MenuButton as={Button} bgColor="#4e4e4e">
      {addMemberName}
    </MenuButton>
    <MenuList>
      {availableMembers.map((m: any) => (
        <MenuItem key={m.name} onClick={() => updateMethods(m)}>
          {m.title}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);

export default SearchMenu;
