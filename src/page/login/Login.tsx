//  LIB
import { useState } from "react";
import { Flex, Heading, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//  Components
import Form from "@components/form/Form";
import FormLogin from "@components/form/FormLogin";
import { Input, InputPwd } from "@components/common/Input";
//  Services
import { BIZ_LOGIN } from "@api/bizApi/url";
import instance from "@api/bizApi/config";
import { loginHandler } from "@services/login/loginHandler";
import { IcoLogoMain } from "@src/assets/icons/icon";

const Login = () => {
  const navigator = useNavigate();

  const requsetLoginBtn = (val: { username: string; password: string }) => {
    console.log(val);
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
    <Flex w="100%" justify="center" align="center">
      <Flex direction="column">
        <IcoLogoMain mb="5rem" w="16.125rem" h="8rem" color="font.title" />
        <Heading variant="loginHead">ONTHE MAP</Heading>
        <FormLogin
          initVal={{
            id: "",
            pwd: "",
          }}
          setValues={requsetLoginBtn}
        />
        <Flex w="100%" justify="space-between">
          <Link
            variant="serviceLink"
            isExternal={true}
            href="https://www.bizrecipe.co.kr/"
          >
            아이디 / 비밀번호 찾기
          </Link>
          <Link
            variant="serviceLink"
            isExternal={true}
            href="https://www.bizrecipe.co.kr/"
          >
            회원가입
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
