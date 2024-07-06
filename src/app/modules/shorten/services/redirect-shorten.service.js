import UAParser from 'ua-parser-js';
import { BadRequest } from 'http-errors';

export class RedirectShortenService {
	shortenRepository;
	trafficRepository;

	constructor(shortenRepository, trafficRepository) {
		this.shortenRepository = shortenRepository;
		this.trafficRepository = trafficRepository;
	}

	async execute({ hash, userAgent, referrer }) {
		const shorten = await this.shortenRepository.exists({ hash });

		if (!shorten) {
			// Add http-error
			throw new BadRequest('Invalid code/hash.');
		}

		const parser = UAParser(userAgent);

		const browser = parser.browser?.name;
		const device = parser.device?.model;
		const operationSystem = parser.os?.name;

		await this.trafficRepository.create({
			shortenId: shorten._id,
			userAgent,
			referrer,
			browser,
			device,
			operationSystem,
		});

		await this.shortenRepository.incRedirections({ shortenId: shorten._id });

		return shorten;
	}
}
