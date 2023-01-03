//  Lib
import { Heading, Flex, Stack, Text, Divider } from "@chakra-ui/react";
//  Components
import {
  Input,
  InputAddon,
  InputBtn,
  InputPwd,
} from "@components/common/Input";
import { Select } from "@components/common/Select";
import TextArea from "@components/common/TextArea";
import Btn from "@components/common/Btn";
import Tag from "@components/common/Tag";

const Guide = () => {
  const selectOptions = [
    { id: 0, text: "test" },
    { id: 1, text: "test1" },
    { id: 2, text: "test2" },
    { id: 3, text: "test3" },
  ];

  return (
    <Flex flexDirection="column">
      <Heading>Components</Heading>
      <Stack spacing={20} m={30} divider={<Divider />}>
        <Flex justifyContent="space-between">
          <Stack spacing={4}>
            <Heading size="md">Components : Input</Heading>
            <Text>Input : base (default)</Text>
            <Input
              _onChange={(props: any) => {
                console.log(props);
              }}
              placeholder="placeHolder"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor="black.100"
              errorBorderColor="red.300"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              isRequired={true}
            />
            <Divider />
            <Text>Input : BTN</Text>
            <InputBtn
              groupProps={{}}
              addonProps={{}}
              btnProps={{ fontSize: "sm", fontWeight: "bold" }}
              btnText="BTN"
              event={() => alert("Click")}
              inputProps
              placeholder="placeHolder"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor="black.100"
              errorBorderColor="red.300"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              isRequired={true}
            />
            <Divider />
            <Text>Input : PWD</Text>
            <InputPwd
              _onChange={(props: any) => {
                console.log(props);
              }}
              groupProps={{ size: "md" }}
              addonProps={{ width: "4.5rem" }}
              btnProps={{ h: "1.75rem", size: "sm" }}
              placeholder="placeHolder"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor="black.100"
              errorBorderColor="red.300"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              isRequired={true}
            />
            <Divider />
            <Text>Input : Base with Title</Text>
            <InputAddon
              _onChange={(props: any) => {
                console.log(props);
              }}
              groupProps={{ size: "sm" }}
              addonProps={{ fontSize: "sm" }}
              addonType="left"
              addonText="TEXT"
              inputProps={{}}
              placeholder="placeHolder"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor="black.100"
              errorBorderColor="red.300"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              isRequired={true}
            />
          </Stack>
          <Stack spacing={4}>
            <Heading size="md">Components : Select</Heading>
            <Text>Select : Base</Text>
            <Select
              selectProps={{
                focusBorderColor: "black.100",
                errorBorderColor: "red.300",
              }}
              defaultText="select option"
              data={selectOptions}
              _onChange={(val: any) => console.log(val)}
              opBaseTxt="text"
              opBaseId="id"
              opBaseKey="id"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              isRequired={true}
            />
          </Stack>
          <Stack spacing={4}>
            <Heading size="md">Components : TextArea</Heading>
            <Text>TextArea : Base</Text>
            <TextArea />
          </Stack>
        </Flex>
        <Flex justifyContent="space-between">
          <Stack spacing={4}>
            <Heading size="md">Components : Button</Heading>
            <Text>Button : Base</Text>
            <Btn text="BTN" />
            <Divider />
            <Text>Button : Base</Text>
            <Btn text="BTN" />
            <Divider />
            <Text>Button : Base</Text>
            <Btn text="BTN" />
          </Stack>
          <Stack spacing={4}>
            <Heading size="md">Components : Bedge</Heading>
            <Text>Bedge : Base</Text>
          </Stack>
          <Stack spacing={4}>
            <Heading size="md">Components : Tag</Heading>
            <Text>Tag : Base</Text>
            <Tag
              key={"sm"}
              variant="subtle"
              text="Base: sm"
              onClick={() => alert("Click")}
            />
            <Tag
              key={"md"}
              variant="subtle"
              text="Base: md"
              hasBtn={true}
              onClick={() => alert("Click")}
            />
            <Tag
              key={"lg"}
              variant={"filterOption"}
              text="Base: lg"
              tagBtn={true}
              onClick={() => alert("Click")}
            />
          </Stack>
        </Flex>
        <Flex justifyContent="space-between">
          <Stack spacing={4}>
            <Heading size="md">Components : CheckBox</Heading>
          </Stack>
          <Stack spacing={4}>
            <Heading size="md">Components : RadioBox</Heading>
          </Stack>
        </Flex>
        <Stack spacing={4}>
          <Heading size="md">Components : Table</Heading>
        </Stack>
        <Stack spacing={4}>
          <Heading size="md">Components : Modal</Heading>
        </Stack>
        <Stack spacing={4}>
          <Heading size="md">Components : Msg & Feedback</Heading>
        </Stack>
        <Stack spacing={4}>
          <Heading size="md">Components : Spinner</Heading>
        </Stack>
        <Stack spacing={4}>
          <Heading size="md">Components : Tab</Heading>
        </Stack>
        <Stack spacing={4}>
          <Heading size="md">Components : Side Bar</Heading>
        </Stack>
        <Stack spacing={4}>
          <Heading size="md">Components : Search Bar</Heading>
        </Stack>
        <Stack spacing={4}>
          <Heading size="md">Components : Menu</Heading>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Guide;
