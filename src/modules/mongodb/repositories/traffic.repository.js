import Traffic from '../schemas/traffic.schema';

export class TrafficRepository {
	async create({
		shortenId,
		userAgent,
		browser,
		operationSystem,
		device,
		referrer,
	}) {
		const traffic = await Traffic.create({
			shortenId,
			userAgent,
			browser,
			operationSystem,
			device,
			referrer,
		});

		return traffic;
	}
}
