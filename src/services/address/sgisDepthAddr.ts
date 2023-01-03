//  Api
import { addrDepthApi } from "@api/sgisApi/config";

const addrApiHandler = async (addr: string) => {
  return await addrDepthApi
    .address(addr)
    .then((res) => {
      if (res.result) {
        return res.result.map(
          (addLi: {
            addr_name: string;
            cd: string;
            full_addr: string;
            x_coor: string;
            y_coor: string;
          }) => ({
            address: addLi.addr_name,
            code: addLi.cd,
          })
        );
      } else {
        console.log("no Address");
        return [];
      }
    })
    .catch((e) => console.log(e));
};

export { addrApiHandler };
