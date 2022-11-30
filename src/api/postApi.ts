//  LIB
import axios from "axios";
//  Type
import { NiceApiInstance } from "@src/util/type/apiType";

const postApi: NiceApiInstance = axios.create({
  baseURL: "https://37e5ccbb-b1d0-477a-870d-6629384c0cd5.mock.pstmn.io",
  responseType: "json",
  responseEncoding: "utf8",
  timeout: 2000,
  headers: {
    Accept: "*/*",
  },
});

postApi.interceptors.request.use((req: any) => {
  return req;
});

postApi.interceptors.response.use((res: any) => {
  console.log(res);
  return res.data;
});

const getTestTable = (url: string, dataSet: any, refSet: any) => {
  postApi
    .post<any, { success: boolean; data: any[] }>(url)
    .then((res) => {
      if (res.success) {
        const data = res.data;
        const totalReg = data.length;

        dataSet(data);
        refSet(totalReg);
      } else {
        console.log("Internal Sever Error");
      }
      console.log("api End");
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getTestTable };
