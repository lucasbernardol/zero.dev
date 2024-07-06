import { Router } from 'express';

import { handle } from '@common/utils/handle';
import { createShortenFactory } from './factories/create-shorten.factory';

const createShortenController = createShortenFactory();
const handleCreate = handle(
	createShortenController,
	createShortenController.execute,
);

const routes = Router();

routes.post('/shorts', handleCreate);

export default routes;
