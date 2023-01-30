//  LIB
import cubejs from "@cubejs-client/core";

const cubejsApi = cubejs(import.meta.env.VITE_API_CUBE_APIKEY, {
  apiUrl: import.meta.env.VITE_API_CUBE,
});

export default cubejsApi;
