import axios from 'axios';

export const apiSource = axios.create({ baseURL: 'https://remediesapi.webaryco.com/app/' });