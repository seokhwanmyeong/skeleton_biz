//  Components
import Form from "@components/form/Form";

const SearchBox = ({ req, setReq, form }: any) => {
  const onSubmitSearch = (val: any) => {
    console.log("search val", val);
    setReq({
      ...req,
      ...val,
    });
  };
  return <Form form={form} onSubmit={onSubmitSearch} />;
};

export default SearchBox;
