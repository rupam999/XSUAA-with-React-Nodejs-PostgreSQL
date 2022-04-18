import { getFullNodeMainData } from '../controllers/tableData.js';
import { checkAdminScope, checkPublicScope } from '../middleware/index.js';

export const tableData = (router) => {
  router.get('/node-main', getFullNodeMainData);
};
