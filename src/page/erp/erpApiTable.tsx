//  Components
import SearchTable from "@components/table/SearchTable";
//  Data
import { BaseTableSet, LineTableSet } from "@util/data/erpTableData";

const ErpApiTable = () => {
  return (
    <>
      <SearchTable
        actviePage={true}
        url="/rate"
        reqBody={{}}
        reqType={{}}
        resType={{}}
        caption="BaseApiTable"
        columns={BaseTableSet}
        emptyData={{ text: "No Contents" }}
        variant="striped"
      />
      <SearchTable
        actviePage={true}
        url="/benefit"
        reqBody={{}}
        reqType={{}}
        resType={{}}
        caption="BaseApiTable"
        columns={LineTableSet}
        emptyData={{ text: "No Contents" }}
        variant="striped"
      />
    </>
  );
};

export default ErpApiTable;
