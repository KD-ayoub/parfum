import axios from "axios";
import { apiSource } from "./instance";

export default async function putItemSettings(data, id, authHeader) {
  try {
    // const response = await axios.put(
    //   `http://192.168.1.22:8000/app/togglesetting/${id}/`,
    //   JSON.stringify(data),
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "token f6ecf46f3dd38b2bf50d0fb677638e41448ac622",
    //     },
    //   }
    // );
    console.log('data sent ..', data);
    const response = await apiSource.put(
      `/togglesetting/${id}/`,
      data ? JSON.stringify(data) : data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      }
    );
    console.log("put response", response.data);
    return response.data;
  } catch (error) {
    console.log("Error puting item settings", error);
  }
}
