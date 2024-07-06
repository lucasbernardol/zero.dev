import { Router } from 'express';

import { handle } from '@common/utils/handle';
import shorten from '@app/modules/shorten/shorten.routes';
import analytics from '@app/modules/analytics/analytics.routes';

import { createRedirectShortenFactory } from '@app/modules/shorten/factories/redirect-shorten.factory';

const createRedirectShortenController = createRedirectShortenFactory();
const handleRedirect = handle(
	createRedirectShortenController,
	createRedirectShortenController.execute,
);

const router = Router();

router.get('/:hash', handleRedirect);

router.use('/api', shorten);
router.use('/api', analytics);

export { router };
