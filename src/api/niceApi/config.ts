//  LIB
import axios, { AxiosInstance } from "axios";
import dayjs from "dayjs";

type Req = {};
type Res = {};

interface AxiosInterceptorManager {}

type AxiosRequestConfig = {};

interface NiceApiInstance extends AxiosInstance {
  interceptors: {
    request: any;
    response: any;
  };
  getUri(config?: AxiosRequestConfig): string;
  request<T>(config: AxiosRequestConfig): Promise<T>;
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<R, T>(url: string, data?: R, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

const niceApi: NiceApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_NICE_URL,
  responseType: "json",
  responseEncoding: "utf8",
  timeout: 20000,
  headers: {
    Accept: "*/*",
    "Content-Type": "multipart/form-data",
  },
});

const loginInstance: NiceApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_NICE_URL,
  responseType: "json",
  responseEncoding: "utf8",
  timeout: 10000,
  headers: {
    Accept: "*/*",
    "Content-Type": "multipart/form-data",
  },
});

niceApi.interceptors.request.use((req: any) => {
  const localStorage = window.localStorage;
  const niceTokenInfo = localStorage.getItem("nc");
  const parseJson = niceTokenInfo ? JSON.parse(niceTokenInfo) : null;
  console.log(req);
  if (parseJson && parseJson?.tk && parseJson?.tm) {
    const { tk, tm } = parseJson;
    const data = dayjs();
    if (dayjs().valueOf() < Number(tm)) {
      req.params = { ...req.params, accessToken: tk };
      return req;
    } else {
      const accessReq = getAccessToken()
        .then((loginRes) => {
          if (loginRes?.data?.result) {
            const { accessToken, accessTimeout } = loginRes.data.result;

            localStorage.setItem(
              "sg",
              JSON.stringify({ tk: accessToken, to: accessTimeout })
            );
            req.params = { ...req.params, accessToken: accessToken };
            return req;
          } else {
            return Promise.reject("getAccessToken Error");
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });

      return accessReq;
    }
  } else {
    const accessReq = getAccessToken()
      .then((loginRes) => {
        console.log(loginRes);
        const text = "20230217043042791_";
        const trans = text.slice(0, -1);
        // if (loginRes?.data?.result) {
        //   const { accessToken, accessTimeout } = loginRes.data.result;

        //   localStorage.setItem(
        //     "sg",
        //     JSON.stringify({ tk: accessToken, tm: accessTimeout })
        //   );
        //   req.params = { ...req.params, accessToken: accessToken };
        //   return req;
        // } else {
        //   return Promise.reject("getAccessToken Error");
        // }
      })
      .catch((err) => {
        return Promise.reject(err);
      });

    return accessReq;
  }
});

niceApi.interceptors.response.use((res: any) => {
  return res;
});

const niceArrCode = {
  C001: { msg: "조회", messageKey: "select.success" },
  C002: { msg: "수정", messageKey: "update.success" },
  C003: { msg: "생성", messageKey: "insert.success" },
  C004: { msg: "삭제", messageKey: "delete.success" },
  C005: { msg: "성공", messageKey: "success" },
  C999: { msg: "실패", messageKey: "fail" },
  C006: { msg: "비지니스로직오류", messageKey: "business.error" },
  "0": { msg: "데이터 없음", messageKey: "no.data" },
  C008: { msg: "처리완료", messageKey: "operate.success" },
  C009: { msg: "권한없음", messageKey: "no.auth" },
  C010: { msg: "비밀번호오류", messageKey: "password.fail" },
  L001: { msg: "아이디없음", messageKey: "login.fail.id" },
  T001: { msg: "토큰 검증 실패", messageKey: "token.fail" },
  C011: { msg: "데이터 정기 작업", messageKey: "data.proc" },
};

//  Api Module
//  01. 토큰발급
const getAccessToken = () =>
  loginInstance.get("/common/getToken", {
    params: {
      loginId: import.meta.env.VITE_API_NICE_ID,
      pwd: import.meta.env.VITE_API_NICE_PWD,
    },
  });

//  02. 인구정보 (시/군/구 단위)
export const getSigunguPopInfo = ({
  upjongCode,
  sigunguCode,
}: {
  upjongCode: string;
  sigunguCode: string;
}) => {
  niceApi.post(`/nice/bizRecipe/getGuCustDataList`, {
    params: {
      upjongCd: "D11002",
      sigunguCode: sigunguCode,
    },
  });
};

export default niceApi;
