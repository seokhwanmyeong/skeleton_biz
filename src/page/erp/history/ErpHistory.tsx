//  LIB
import { useMemo, useState, useEffect } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//  Components
import SearchHistory from "@components/search/SearchHistory";
import Table from "@components/table/Table";
//  Form & Column
import { columnHistory } from "@components/table/column/erp";
import { IcoBtnDelete } from "@components/common/Btn";
import ModalHistoryEditor from "@src/components/modal/erp/ModalHistoryEditor";

const ErpHistory = ({ id, title }: { id: string | number; title?: string }) => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<any[]>([]);
  const [samplePageData, setSample] = useState<any[]>([]);
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
    setInitVal({ ...values, page: curPage });
  };

  const removeStoreHandler = () => {
    setSelectData([]);
  };

  useEffect(() => {
    console.log("search start");
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
    setTableData(sample);
    setTotalPage(sample.length);
  }, [initVal, curPage]);

  useEffect(() => {
    if (tableData) {
      setSample(
        tableData.slice(Math.floor(curPage / 10), Math.floor(curPage / 10) + 10)
      );
    }
  }, []);

  useEffect(() => {
    if (tableData) {
      setSample(
        tableData.slice(Math.floor(curPage / 10), Math.floor(curPage / 10) + 10)
      );
    }
  }, [curPage]);

  return (
    <Flex w="100%" h="100%" flexDirection="column" gap="0.5rem">
      <Flex mb="2.5rem" p="0rem 1.65625rem 0rem" w="100%" direction="column">
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
        <SearchHistory initVal={initVal} setValues={setTableData} />
      </Flex>
      <Table
        data={tableData}
        actviePage={true}
        divide={5}
        columns={column}
        totalPage={totalPage}
        page={curPage}
        getPage={setCurPage}
        getSelectData={setSelectData}
      >
        <Flex
          p="0rem 1.65625rem 0.5rem"
          w="100%"
          justify="flex-end"
          gap="1.5rem"
        >
          <ModalHistoryEditor />
          <IcoBtnDelete
            onClick={removeStoreHandler}
            isDisabled={selectData.length > 0 ? false : true}
          />
        </Flex>
      </Table>
    </Flex>
  );
};

export default ErpHistory;
