import { apiSource } from "./instance";

function getQueries(queryParam) {
  console.log("object here", Object.entries(queryParam));
  let result = "?";
  Object.entries(queryParam).map((item, index) => {
    if (item[0] !== "pageSize") {
      result += `${item[0]}=${item[1]}&`;
      console.log(`inside: ${item[0]}=${item[1]}`, item);
    }
  });
  console.log("result: ", result);
  return result;
}

export default async function getItems(queryParams, authHeader) {
  try {
    console.log("before..", queryParams);
    getQueries(queryParams);
    const response = await apiSource.get(
      `/items/${getQueries(queryParams)}page_size=${queryParams.pageSize}`,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );
    // ?page_size=${queryParams.pageSize}&page=${queryParams.page}&status=${queryParams.status}&search=${queryParams.search}&ordering=${queryParams.ordering}`
    return response.data;
  } catch (error) {
    console.log("Error getting items data", error);
    return;
  }
}
