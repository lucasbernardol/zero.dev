import { Router } from 'express';

import { handle } from '@common/utils/handle';
import { createAggregateAnalyticsFactory } from './factories/aggregate-analytics.factory';

const aggregateAnalyticsController = createAggregateAnalyticsFactory();
const aggregateHandle = handle(
	aggregateAnalyticsController,
	aggregateAnalyticsController.execute,
);

const routes = Router();

routes.get('/analytics/:hash', aggregateHandle);

export default routes;
