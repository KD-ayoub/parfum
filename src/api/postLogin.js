import axios from "axios";

export default async function postLogin(data) {
  try {
    const response = await axios.post(
      "https://remediesapi.webaryco.com/api/token/",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in login ", error.response.data.detail);
  }
}
