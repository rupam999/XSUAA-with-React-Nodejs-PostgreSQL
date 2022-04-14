import axios from './Config';

export const getRequest = async (endPoint, params = {}) =>
  axios.get(endPoint, { params });
