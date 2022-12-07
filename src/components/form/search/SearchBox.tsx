//  LIB
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";

const SearchBox = (props: any) => {
  const { req, setReq, initialReq } = props;

  return (
    <Formik
      initialValues={initialReq}
      onSubmit={(val) => {
        console.log("search val", val);
        setReq({
          ...req,
          ...val,
        });
      }}
    >
      {({ handleSubmit, errors, touched, getFieldProps, setFieldValue }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Flex gap="10px" mb="20px">
              <FormControl>
                <FormLabel htmlFor="date">Date</FormLabel>
                <Field
                  as={Input}
                  id="date"
                  name="date"
                  type="date"
                  variant="filled"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  type="text"
                  variant="filled"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="age">Age</FormLabel>
                <Field
                  as={Input}
                  id="age"
                  name="age"
                  type="number"
                  variant="filled"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="address">Address</FormLabel>
                <Field
                  as={Input}
                  id="address"
                  name="address"
                  type="text"
                  variant="filled"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="gender">Gender</FormLabel>
                <RadioGroup
                  onChange={(e) => setFieldValue("gender", e)}
                  name="gender"
                  value={getFieldProps("gender").value}
                >
                  <Stack direction="row">
                    <Radio value="woman">Woman</Radio>
                    <Radio value="man">Man</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </Flex>
            <Button type="submit" w="120px">
              Search
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default SearchBox;
