//  LIB
import { Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//  Components
import FormSample from "@components/form/FormSample";
//  Form & Column
import { formLogin } from "@src/page/login/form";
//  Services
import { loginHandler } from "@src/services/login/loginHandler";

import instance from "@src/api/bizApi/config";
import { BIZ_LOGIN } from "@src/api/bizApi/url";

const Login = () => {
  const navigator = useNavigate();

  const requsetLoginBtn = (val: { username: string; password: string }) => {
    // loginHandler(val);
    instance
      .post<
        { username: string; password: string },
        {
          accessToken: string;
          expiresIn: number;
          userData: {
            id: number | undefined;
            username: string;
            password: string;
          };
        }
      >(BIZ_LOGIN, val)
      .then((res) => {
        const { accessToken, expiresIn, userData } = res;
        console.log(res);

        if (expiresIn > 0) {
          localStorage.setItem("token", accessToken);
          navigator("/maps");
        } else {
          alert("expires is already");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Flex w="100%" alignItems="center" justifyContent="center">
      <FormSample
        form={formLogin}
        onSubmit={requsetLoginBtn}
        styleProps={{ width: "20rem" }}
      />
    </Flex>
  );
};

export default Login;
