import { ShortenRepository } from '@modules/mongodb/repositories/shorten.repository';
import { TrafficRepository } from '@modules/mongodb/repositories/traffic.repository';

import { RedirectShortenService } from '../services/redirect-shorten.service';
import { RedirectShortenController } from '../controllers/redirect-shorter.controller';

export function createRedirectShortenFactory() {
	const shortenRepository = new ShortenRepository();
	const trafficRepository = new TrafficRepository();

	const redirectShortenService = new RedirectShortenService(
		shortenRepository,
		trafficRepository,
	);

	return new RedirectShortenController(redirectShortenService);
}
