import axios from "axios";
import { apiSource } from "./instance";

export default async function postSettings(data) {
  try {
    // const response = await axios.post('http://192.168.1.22:8000/app/updatesetting', JSON.stringify(data), {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "f6ecf46f3dd38b2bf50d0fb677638e41448ac622",
    //   },
    // })
    const response = await apiSource.post(
      "/updatesetting",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "f6ecf46f3dd38b2bf50d0fb677638e41448ac622",
        },
      }
    );
    console.log('post response', response.data);
  } catch (error) {
    console.log("Error posting settings", error);
  }
}
