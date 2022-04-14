import { GET_DUMMY } from './Config';
import { getRequest } from './getRequest';

const getDummyData = async () => {
  try {
    const response = await getRequest(GET_DUMMY);
    return response.data;
  } catch (error) {
    console.log('Error at getDummyData api', error);
    return -1;
  }
};

export default getDummyData;
