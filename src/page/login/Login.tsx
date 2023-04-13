//  LIB
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import dayjs from "dayjs";
import { Flex, Link, Text, Spinner, Button, Box } from "@chakra-ui/react";
import { FormikValues } from "formik";
//  Components
import FormLogin from "@components/form/login/FormLogin";
import { CheckBox } from "@components/common/CheckBox";
//  Api
import { loginApi } from "@api/biz/config";
//  State
import { atomUser } from "@states/user/stateUser";
//  Icon
import { IcoLogoMain, IcoLogoText } from "@assets/icons/icon";

const Login = () => {
  const { login } = loginApi;
  const setUserInfo = useSetRecoilState(atomUser);
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingChk, setLoadingChk] = useState(false);
  const submitRef = useRef<FormikValues>();
  const localStorage = window.localStorage;
  const tk = localStorage.getItem("tk");
  const te = localStorage.getItem("te");

  const requsetLoginBtn = (val: { username: string; password: string }) => {
    if (!val.username || !val.password) {
      alert("아이디 및 패스워드를 입력해주세요");
      return;
    }

    setLoadingChk(true);
    login(val)
      .then((res: any) => {
        console.log(res);
        const { accessToken, expiresIn, userData } = res.data;

        localStorage.setItem("tk", accessToken);
        localStorage.setItem("te", expiresIn);

        setTimeout(() => {
          setLoadingChk(false);
          navigator("/maps");
        }, 300);
      })
      .catch((err) => {
        console.log(err);
        setLoadingChk(false);
        alert("아이디, 비밀번호를 확인해주세요");
      });
  };

  const submitHandler = () => {
    submitRef?.current && submitRef.current.handleSubmit();
  };

  useEffect(() => {
    if (tk && te) {
      if (dayjs().valueOf() > Number(te)) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          navigator("/maps");
        }, 500);
      }
    }
  }, []);

  return (
    <Flex
      pb="0.25rem"
      w="100%"
      h="100%"
      direction="column"
      justify="center"
      align="center"
    >
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
        <Flex
          minW="22.5rem"
          w="fit-content"
          h="100%"
          direction="column"
          justify="center"
          align="center"
        >
          <IcoLogoMain
            marginBottom="0.75rem"
            w="8rem"
            h="4rem"
            color="font.title"
          />
          <IcoLogoText
            mb="3.25rem"
            width="14.75rem"
            height="2.2rem"
            color="font.title"
          />
          <FormLogin
            ref={submitRef}
            initVal={{
              username: "",
              password: "",
            }}
            setValues={requsetLoginBtn}
          />
          <Flex mb="1.25rem" w="100%" justify="space-between">
            <CheckBox title="자동 로그인" fontSize="sm" color="font.primary" />
            <Link
              isExternal={true}
              href="https://www.onthemap.kr/"
              textStyle="base"
              fontSize="sm"
              fontWeight="regular"
              lineHeight="1.375rem"
              color="font.secondary"
              _hover={{
                fontWeight: "regular",
                textDecoration: "underline",
              }}
            >
              아이디 / 비밀번호 찾기
            </Link>
          </Flex>
          <Button
            p="0"
            w="100%"
            h="3rem"
            gap="0.5rem"
            fontSize="sm"
            lineHeight="3rem"
            bg="primary.type7"
            _hover={{
              bgColor: "primary.type8",
            }}
            onClick={submitHandler}
          >
            <Text position="relative" top="1px">
              로그인
            </Text>
          </Button>
          <Flex m="1.25rem 0rem" w="100%" align="center" gap="1rem">
            <Box w="100%" border="1px solid" borderColor="neutral.gray6" />
            <Text
              textStyle="base"
              fontSize="sm"
              lineHeight="1.375rem"
              color="font.secondary"
              flex="none"
            >
              또는
            </Text>
            <Box w="100%" border="1px solid" borderColor="neutral.gray6" />
          </Flex>
          <Flex mb="15vh" w="100%" justify="center" gap="0.75rem">
            <Text
              textStyle="base"
              fontSize="sm"
              lineHeight="1.375rem"
              color="font.secondary"
            >
              브랜드 계정이 없으신가요?
            </Text>
            <Link
              isExternal={true}
              href="https://www.onthemap.kr/"
              fontSize="sm"
              fontWeight="regular"
              lineHeight="1.375rem"
              color="primary.type8"
              transition="0.1s"
              _hover={{ fontWeight: "regular", textDecoration: "underline" }}
            >
              회원가입
            </Link>
          </Flex>
        </Flex>
      )}
      <Flex w="100%" justify="center">
        <Text
          textStyle="base"
          fontSize="sm"
          fontWeight="regular"
          lineHeight="1.375rem"
          color="font.placeholder"
        >
          Copyright ©2023 Produced by OntheMap
        </Text>
      </Flex>
    </Flex>
  );
};

export default Login;
