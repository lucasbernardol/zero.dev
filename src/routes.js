import { Router } from 'express';

import { handle } from '@common/utils/handle';
import shorten from '@app/modules/shorten/shorten.routes';
import { createRedirectShortenFactory } from '@app/modules/shorten/factories/redirect-shorten.factory';

const createRedirectShortenController = createRedirectShortenFactory();
const handleRedirect = handle(
	createRedirectShortenController,
	createRedirectShortenController.execute,
);

const router = Router();

router.get('/:hash', handleRedirect);

router.use('/api', shorten);

export { router };
