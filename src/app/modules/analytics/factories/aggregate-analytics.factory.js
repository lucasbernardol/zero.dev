import { ShortenRepository } from '@modules/mongodb/repositories/shorten.repository';
import { TrafficRepository } from '@modules/mongodb/repositories/traffic.repository';

import { AggregateAnalyticsService } from '../services/aggregate-analytics.service';
import { AggregateAnalyticsController } from '../controllers/aggregate-analytics.controller';

export function createAggregateAnalyticsFactory() {
	const shortenRepository = new ShortenRepository();
	const trafficRepository = new TrafficRepository();

	const aggregateAnalyticsService = new AggregateAnalyticsService(
		shortenRepository,
		trafficRepository,
	);

	return new AggregateAnalyticsController(aggregateAnalyticsService);
}
