import { apiSource } from "./instance";

export default async function getItemStatus(id) {
  try {
    const response = await apiSource.get(`/togglestatus/${id}/`)
    console.log('get response (item status)', response.data);
    return response.data;
  } catch (error) {
    console.log("Error getting Item status", error);
  }
}