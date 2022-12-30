import { addressApi } from "@api/daumApi/config";

const autoAddressCreator = async (data: any) => {
  console.log(data);
  let d: any[] = [];

  await data.map((li: any) => {
    addressApi
      .address(li.address)
      .then((res) => {
        const { documents, meta } = res;

        if (meta.total_count > 1) {
          console.log(li.address);
          console.log(documents);
        }
      })
      .catch((err) => console.log(err));
  });
};

export { autoAddressCreator };
