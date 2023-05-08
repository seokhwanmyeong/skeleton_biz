//  Lib
import { Fragment, useContext, useState } from "react";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
//  Component
import ErpFilter from "@components/sementicMapLayer/elementFilter/ErpFilter";
import BtnReset from "@components/sementicMapLayer/elementFilter/BtnReset";
import ModalDaumAddr from "@components/modal/common/ModalDaumAddr";
import ToolBox from "@components/sementicMapLayer/toolBox/ToolBox";
//  Icon
import { IcoDoubleSquere } from "@assets/icons/icon";
//  Deco
import {
  DecoBotHightBox,
  DecoFilterDivider,
  DecoTop,
} from "@components/sementicMapLayer/elementDeco/Deco";
import { erpHistoryApi } from "@src/api/biz/config";

const FlowErp = () => {
  const {
    getHistoryStoreLi,
    getHistoryStoreDetail,
    createHistoryStore,
    getHistoryRentLi,
    getHistoryRentDetail,
    createHistoryRent,
  } = erpHistoryApi;
  const { state, dispatch } = useContext(NaverMapContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isToolOpen, toolOpen] = useState(false);

  const setAddrCenter = (val: any) => {
    // @ts-ignore
    const geocoder = new kakao.maps.services.Geocoder();
    const { address } = val;

    geocoder.addressSearch(address, (result: any, status: any) => {
      if (status === "OK") {
        const { x, y } = result[0];

        state.map?.setOptions({
          zoom: 15,
          center: {
            lat: y,
            lng: x,
          },
        });
      }
    });
  };

  return (
    <Fragment>
      {/* ------------------------------ 상단 ------------------------------*/}
      {!isToolOpen && (
        <Flex
          pos="absolute"
          top="1%"
          left="50%"
          zIndex={2}
          transform="translateX(-50%)"
          gap="4rem"
        >
          <Flex
            pos="relative"
            pt="0.3rem"
            direction="column"
            justify="flex-start"
            color="#000000"
            gap="0.5rem"
          >
            <Flex pos="relative" direction="column">
              <Button
                variant="filterTopMain"
                onClick={() => {
                  isOpen ? onClose() : onOpen();
                }}
              >
                주소를 검색하세요
              </Button>
              <ModalDaumAddr
                isOpen={isOpen}
                onClose={onClose}
                onComplete={setAddrCenter}
              />
              <DecoTop width={"10rem"} />
            </Flex>
          </Flex>
        </Flex>
      )}
      {/* ------------------------------ 하단 ------------------------------*/}
      <DecoBotHightBox>
        <Button
          variant="filterTop"
          isActive={true}
          onClick={() => {
            isOpen ? onOpen() : onClose();
          }}
        >
          <Box>
            <IcoDoubleSquere width="1.125rem" height="1.125rem" />
          </Box>
          브랜드 데이터
        </Button>
        <DecoFilterDivider />
        <BtnReset />
        <Button
          variant="filterTop"
          isActive={true}
          onClick={() => {
            getHistoryStoreLi({
              historyType: "total", // 'total' || 'log' || 'write'
              erpCode: "6441d27c43a470c11697be6e",
              searchType: "title", // ‘title’ || ‘writer’
              text: "",
              pageNo: 1,
              perPage: 10,
            }).then((res): any => console.log(res));
          }}
        >
          매장 테이블 조회
        </Button>
        <Button
          variant="filterTop"
          isActive={true}
          onClick={() => {
            getHistoryStoreDetail({
              id: "6454cacbf87ffd2f8453c143",
            }).then((res): any => console.log(res));
          }}
        >
          매장 상세 조회
        </Button>
        <Button
          variant="filterTop"
          isActive={true}
          onClick={() => {
            createHistoryStore({
              erpCode: "6441d27c43a470c11697be6e",
              writer: "김양일",
              title: "store test",
              content: "store test",
              curAddr: "서울특별시 용산구 동자동 19-28",
              img: [
                "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg4.daumcdn.net%2Fthumb%2FR658x0.q70%2F%3Ffname%3Dhttps%3A%2F%2Ft1.daumcdn.net%2Fnews%2F202105%2F25%2Fholapet%2F20210525081724428qquq.jpg&tbnid=K19cUfGH9h9xlM&vet=12ahUKEwji8ryC5t3-AhVjm1YBHVEzApkQMygFegUIARCeAg..i&imgrefurl=https%3A%2F%2F1boon.daum.net%2Fholapet%2Fholapet1377&docid=B1o9I2Ys-kmnHM&w=640&h=434&q=%EA%B0%95%EC%95%84%EC%A7%80&ved=2ahUKEwji8ryC5t3-AhVjm1YBHVEzApkQMygFegUIARCeAg",
              ],
            }).then((res): any => console.log(res));
          }}
        >
          매장 생성
        </Button>
        <Button
          variant="filterTop"
          isActive={true}
          onClick={() => {
            getHistoryRentLi({
              historyType: "total", // 'total' || 'log' || 'write'
              erpCode: "6441d36c43a470c11697ca90",
              searchType: "title", // ‘title’ || ‘writer’
              text: "",
              pageNo: 1,
              perPage: 10,
            }).then((res): any => console.log(res));
          }}
        >
          매물 테이블 조회
        </Button>
        <Button
          variant="filterTop"
          isActive={true}
          onClick={() => {
            getHistoryRentDetail({
              id: "6454d54d4acc6d31523de25d",
            }).then((res): any => console.log(res));
          }}
        >
          매물 상세 조회
        </Button>
        <Button
          variant="filterTop"
          isActive={true}
          onClick={() => {
            createHistoryRent({
              erpCode: "6441d36c43a470c11697ca90",
              writer: "김양일",
              title: "rent test",
              content: "rent test",
              curAddr: "서울특별시 용산구 동자동 19-28",
              img: [
                "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg4.daumcdn.net%2Fthumb%2FR658x0.q70%2F%3Ffname%3Dhttps%3A%2F%2Ft1.daumcdn.net%2Fnews%2F202105%2F25%2Fholapet%2F20210525081724428qquq.jpg&tbnid=K19cUfGH9h9xlM&vet=12ahUKEwji8ryC5t3-AhVjm1YBHVEzApkQMygFegUIARCeAg..i&imgrefurl=https%3A%2F%2F1boon.daum.net%2Fholapet%2Fholapet1377&docid=B1o9I2Ys-kmnHM&w=640&h=434&q=%EA%B0%95%EC%95%84%EC%A7%80&ved=2ahUKEwji8ryC5t3-AhVjm1YBHVEzApkQMygFegUIARCeAg",
              ],
            }).then((res): any => console.log(res));
          }}
        >
          매물 생성
        </Button>
      </DecoBotHightBox>
      <ErpFilter isToolOpen={isToolOpen} toolOpen={toolOpen} />
      <ToolBox />
    </Fragment>
  );
};

export default FlowErp;
