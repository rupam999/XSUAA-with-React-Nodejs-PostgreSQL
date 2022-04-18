import {
  getDummyData,
  adminRoute,
  publicRoute,
  generalRoute,
} from '../controllers/dummy.js';
import { checkAdminScope, checkPublicScope } from '../middleware/index.js';

export const dummyData = (router) => {
  router.get('/dummy', getDummyData);
  router.get('/public', publicRoute);
  router.get('/admin', adminRoute);
  router.get('/general', generalRoute);
};
