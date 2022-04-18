import axios from 'axios';

export const BASE_URL =
  // 'https://demo-node-1.cfapps.ap21.hana.ondemand.com/api';
  'http://localhost:8000/api';
export const GET_DUMMY = '/dummy';
export const GET_MASTER_NODE_DATA = '/node-main';

export default axios.create({
  baseURL: BASE_URL,
});
