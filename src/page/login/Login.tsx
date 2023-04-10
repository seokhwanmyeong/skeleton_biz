//  LIB
import { useEffect, useState } from "react";
import { Flex, Heading, Link, Text, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//  Components
import FormLogin from "@components/form/login/FormLogin";
//  Services
import { loginApi } from "@src/api/biz/config";
//  Icon
import { IcoLogoMain } from "@assets/icons/icon";

const Login = () => {
  const { login } = loginApi;
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingChk, setLoadingChk] = useState(false);
  const tk = localStorage.getItem("tk");

  const requsetLoginBtn = (val: { username: string; password: string }) => {
    if (!val.username || !val.password) {
      alert("정보입력필요_test");
      return;
    }

    setLoadingChk(true);
    login(val)
      .then((res: any) => {
        const { accessToken, expiresIn, userData } = res.data;
        console.log(res);

        if (expiresIn > 0) {
          localStorage.setItem("token", accessToken);
          setTimeout(() => {
            setLoadingChk(false);
            navigator("/maps");
          }, 300);
        } else {
          alert("expires is already");
          setLoadingChk(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingChk(false);
        alert("아이디, 비밀번호를 확인해주세요");
      });
  };

  useEffect(() => {
    if (tk) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigator("/maps");
      }, 500);
    }
  }, []);

  return (
    <Flex w="100%" justify="center" align="center">
      {loadingChk && (
        <Flex
          position="fixed"
          top={0}
          left={0}
          zIndex={100}
          w="100%"
          h="100%"
          justify="center"
          align="center"
          _after={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            display: "block",
            w: "100%",
            h: "100%",
            bgColor: "#00000090",
          }}
        >
          <Spinner
            zIndex={101}
            w="20rem"
            h="20rem"
            speed="2s"
            color="primary.type7"
            emptyColor="#eeeeee"
            thickness="10px"
          />
        </Flex>
      )}
      {loading ? (
        <Spinner
          w="20rem"
          h="20rem"
          speed="2s"
          color="primary.type7"
          emptyColor="#eeeeee"
          thickness="10px"
        />
      ) : (
        <Flex direction="column">
          <IcoLogoMain mb="7vh" w="16.125rem" h="8rem" color="font.title" />
          <Heading variant="loginHead" mb="7vh">
            ONTHE MAP
          </Heading>
          <FormLogin
            initVal={{
              username: "",
              password: "",
            }}
            setValues={requsetLoginBtn}
          />
          <Flex mb="15vh" w="100%" justify="space-between">
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
          <Flex w="100%" justify="center">
            <Text fontSize="sm" lineHeight="1.375rem" color="font.placeholder">
              Copyright ©2023 Produced by OntheMap
            </Text>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default Login;
