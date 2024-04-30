import { apiSource } from "./instance";

export default async function getSettings(authHeader) {
    // try {
    //     const response = await apiSource.get('/updatesetting');
    //     console.log('status', response.status);
    //     return response.data;
    // } catch (error) {
    //     console.log('Error getting settings data');
    //     return ;
    // }
  const response = await fetch('https://remediesapi.webaryco.com/app/updatesetting/', {
    method: 'GET',
    headers: {
      Authorization: authHeader,
    }
  });
  if (!response.ok) {
    console.log('Error getting settings data');
    return ;
  }
  return response.json();
}
