//  LIB
import { useMemo, useState, useEffect } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//  Components
import SearchHistory from "@components/search/SearchHistory";
import Table from "@components/table/Table";
//  Form & Column
import { columnHistory } from "@components/table/column/erp";
import { BtnDelete, IcoBtnDelete } from "@components/common/Btn";
import ModalHistoryEditor from "@src/components/modal/erp/ModalHistoryEditor";
import Divider from "@src/components/common/Divider";

const StoreHistory = ({
  id,
  title,
}: {
  id: string | number;
  title?: string;
}) => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<any[]>([]);
  const [sampleData, setSampleData] = useState<any[]>([]);
  const [selectData, setSelectData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [curPage, setCurPage] = useState<number>(1);
  const [initVal, setInitVal] = useState<any>({
    dataType: "total",
    searchType: "title",
    text: "",
  });
  const column = useMemo(() => columnHistory, []);

  const searchHandler = (values: any) => {
    console.log(values);
    // setValues(values);
  };

  const removeHistoryHandler = () => {
    setSelectData([]);
  };

  useEffect(() => {
    if (tableData.length === 0) {
      searchHandler({ ...initVal, page: curPage });
    }
  }, []);

  useEffect(() => {
    const current = sampleData.slice(
      Math.floor(curPage / 10),
      Math.floor(curPage / 10) + 10
    );
    setTableData(current);
  }, [initVal, curPage, sampleData]);

  useEffect(() => {
    let sample = [];

    for (let i = 0; i < 10; i++) {
      sample.push({
        type: "로그",
        title: "로그인 및 멤버계정 생성",
        writer: "홍길동",
        createdAt: "2022.12.28",
        location: "경기도 김포시 풍무동",
        img: [],
        content: "testsetdsgtstsetestsdsdsdfsssffffff",
      });
      sample.push({
        type: "작성",
        title: "매장관리 및 고객현황",
        writer: "임첨지",
        createdAt: "2022.12.28",
        location: "경기도 김포시 풍무동",
        img: [
          "https://www.google.com/imgres?imgurl=https%3A%2F%2Fblogthumb.pstatic.net%2FMjAyMDAyMDhfMTI3%2FMDAxNTgxMTM0NzE4NDU4.jdPtLGcqEXZ3Bnn78ke2-kVqxiusJ4FNc55T8xRr-6og.7IftkJ0RktjEw3pUINoaAP5LLPEgeqMys8qV_CXzeYgg.JPEG.boak9700%2F20200115_124837.jpg%3Ftype%3Dw2&tbnid=uDIt74gje4RneM&vet=12ahUKEwjrgLCag_T9AhWDdXAKHXgpCtEQMygTegUIARDkAQ..i&imgrefurl=https%3A%2F%2Fm.blog.naver.com%2Fboak9700%2F221800935069&docid=0bNlAWBhKh7_zM&w=743&h=557&q=%EC%8B%9D%EB%8B%B9%20%EB%A7%A4%EC%9E%A5%20%EC%9D%B4%EB%AF%B8%EC%A7%80&ved=2ahUKEwjrgLCag_T9AhWDdXAKHXgpCtEQMygTegUIARDkAQ",
        ],
        content: "testsetdsgtstsetestsdsdsdfsssffffff",
      });
    }

    setSampleData(sample);
    setTotalPage(sample.length);
  }, []);

  return (
    <Flex w="100%" h="100%" flexDirection="column">
      <Flex mb="2.5rem" pl="0.875rem" w="100%" direction="column">
        {title && (
          <Flex
            position="relative"
            mb="0.875rem"
            w="100%"
            justify="center"
            align="center"
            direction="column"
          >
            <Heading as="h3" mb="2rem" variant="detailTitle">
              {title}
            </Heading>
          </Flex>
        )}
        <SearchHistory initVal={initVal} setValues={setInitVal} />
      </Flex>
      <Flex pl="0.875rem" justify="space-between">
        <Flex align="flex-end" gap="0.25rem">
          <Heading as={"h3"} variant="outlet">
            검색 결과
          </Heading>
          <Text variant="outlet">Result</Text>
        </Flex>
        <Flex gap="0.5rem">
          <ModalHistoryEditor />
          <BtnDelete
            onClick={removeHistoryHandler}
            isDisabled={selectData.length > 0 ? false : true}
          />
        </Flex>
      </Flex>
      <Divider m="0.4375rem 0 0" />
      <Table
        data={tableData}
        actviePage={true}
        divide={5}
        columns={column}
        totalPage={totalPage}
        page={curPage}
        getPage={setCurPage}
        getSelectData={setSelectData}
      />
    </Flex>
  );
};

export default StoreHistory;
