//  Components
import FormSample from "@components/form/FormSample";

const SearchBox = ({ req, setReq, form }: any) => {
  const onSubmitSearch = (val: any) => {
    console.log("search val", val);
    setReq({
      ...req,
      ...val,
    });
  };
  return <FormSample form={form} onSubmit={onSubmitSearch} />;
};

export default SearchBox;
