import { Router } from 'express';

import DevController from './controllers/DevController';
import LikeController from './controllers/LikeController';
import DislikeController from './controllers/DislikeController';

const routes = Router();

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

export default routes;
