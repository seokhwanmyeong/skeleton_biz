import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { Button, Flex, Text } from "@chakra-ui/react";
//  State
import { atomFilterFlow } from "@states/sementicMap/stateFilter";
//  Icon
import {
  IcoApartment,
  IcoManageSearch,
  IcoShareLocation,
} from "@assets/icons/icon";
//  Deco
import { ImgBarLeft, ImgBarRight, ImgDotTop } from "@assets/img/Img";
import { DecoInitFilter } from "@components/sementicMapLayer/elementDeco/Deco";

const FlowController = () => {
  const setFlow = useSetRecoilState(atomFilterFlow);

  return (
    <DecoInitFilter>
      <BtnInitFilter
        color="#36CFC9"
        text="분석필터"
        svg={
          <IcoManageSearch
            width="2rem"
            height="2rem"
            filter="drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.5))"
          />
        }
        onClick={() => setFlow("enter")}
        bottom="2rem"
        left="3.75rem"
      />
      <BtnInitFilter
        color="#FFEC3D"
        text="영역분석"
        svg={
          <IcoApartment
            width="2rem"
            height="2rem"
            filter="drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.5))"
          />
        }
        onClick={() => setFlow("find")}
        bottom="4.625rem"
        left="50%"
        transform="translateX(-50%)"
      />
      <BtnInitFilter
        color="#FF7A45"
        text="브랜드 데이터"
        svg={
          <IcoShareLocation
            width="2rem"
            height="2rem"
            filter="drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.5))"
          />
        }
        onClick={() => setFlow("erp")}
        bottom="2rem"
        right="3.75rem"
      />
    </DecoInitFilter>
  );
};

const BtnInitFilter = ({
  color,
  text,
  svg,
  onClick,
  ...rest
}: {
  color: string;
  text: string;
  svg: any;
  onClick: any;
  [x: string]: any;
}) => {
  const [isHover, onHover] = useState(false);
  return (
    <Button
      variant="filterInit"
      pos="absolute"
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      {...rest}
      fontWeight="inherit"
    >
      <ImgDotTop />
      <Flex pos="relative" direction="column" align="center">
        {isHover && <ImgBarLeft />}
        {isHover && <ImgBarRight />}
        <Flex
          justify="center"
          align="center"
          w="104px"
          h="104px"
          bgColor={color || "transparent"}
          border="1px solid"
          borderColor="neutral.gray7"
          borderRadius="50%"
        >
          <Flex
            justify="center"
            align="center"
            w="96px"
            h="96px"
            bg="linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%)"
            filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="neutral.gray7"
            borderRadius="50%"
          >
            <Flex
              justify="center"
              align="center"
              w="48px"
              h="48px"
              bg="linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)"
              filter="drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))"
              backdropFilter="blur(5px)"
              border="1px solid"
              borderColor="neutral.gray8"
              borderRadius="50%"
            >
              <Flex
                justify="center"
                align="center"
                w="48px"
                h="48px"
                bg="linear-gradient(180deg, #FFFFFF 10%, rgba(255, 255, 255, 0) 100%)"
                bgColor={color}
                backdropFilter="blur(5px)"
                border="1px solid"
                borderColor="neutral.gray8"
                borderRadius="50%"
                boxShadow="0px 4px 1px 0px rgba(0, 0, 0, 0.25), 0px -4px 1px 0px rgba(0, 0, 0, 0.25)"
              >
                {svg}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Text
        pos="absolute"
        bottom="-14px"
        left="50%"
        transform="translateX(-50%)"
        w="100px"
        h="28px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%)"
        filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
        backdropFilter="blur(10px)"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        border="1px solid"
        borderColor="neutral.gray10"
        borderRadius="14px"
        textStyle="base"
        fontSize="sm"
        fontWeight="inherit"
        color="font.primary"
      >
        {text}
      </Text>
    </Button>
  );
};

export default FlowController;
