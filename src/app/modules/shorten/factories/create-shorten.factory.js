import { ShortenRepository } from '@modules/mongodb/repositories/shorten.repository';
import NanoidLibrary from '@core/lib/nanoid.lib';

import { CreateShortenController } from '../controllers/create-shorten.controller';
import { CreateShortenService } from '../services/create-shorten.service';

export function createShortenFactory() {
	const shortenRepository = new ShortenRepository();

	const createShortenService = new CreateShortenService(
		shortenRepository,
		NanoidLibrary,
	);

	return new CreateShortenController(createShortenService);
}
