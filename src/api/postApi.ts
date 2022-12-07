//  LIB
import axios from "axios";
//  Type
import { NiceApiInstance } from "@src/util/type/apiType";

const postApi: NiceApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_POSTMAN,
  responseType: "json",
  responseEncoding: "utf8",
  timeout: 2000,
  headers: {
    Accept: "*/*",
  },
});

postApi.interceptors.request.use((req: any) => {
  console.log("intercept Req", req);
  console.log("Req Data", req.data);
  return req;
});

postApi.interceptors.response.use((res: any) => {
  console.log("res", res);
  return res.data;
});

const getTestTable = (url: string, reqBody: any, dataSet: any, refSet: any) => {
  postApi
    .post<any, { success: boolean; data: any[]; totalLen: number }>(
      url,
      reqBody
    )
    .then((res) => {
      if (res.success) {
        const data = res.data;
        const totalReg = res.totalLen;
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

export { getTestTable, postApi };
