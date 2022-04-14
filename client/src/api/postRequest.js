import axios from './Config';

export const postRequest = (endPoint, params) => {
  const param = params || null;
  return axios.post(endPoint, param);
};
