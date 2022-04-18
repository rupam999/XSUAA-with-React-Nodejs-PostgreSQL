import { GET_MASTER_NODE_DATA } from './Config';
import { getRequest } from './getRequest';

const getMasterNodeData = async () => {
  try {
    const response = await getRequest(GET_MASTER_NODE_DATA);
    return response.data;
  } catch (error) {
    console.log('Error at getMasterNodeData api', error);
    return -1;
  }
};

export default getMasterNodeData;
