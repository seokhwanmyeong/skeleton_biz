//  LIB
import axios from "axios";
//  Type
import { NiceApiInstance } from "@src/util/type/apiType";

const niceApi: NiceApiInstance = axios.create({ baseURL: "" });

niceApi.interceptors.request.use((req: any) => {
  return req;
});

niceApi.interceptors.response.use((res: any) => {
  return res;
});

export default niceApi;
