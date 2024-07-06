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

	async findMany({ shortenId }) {
		const traffics = await Traffic.find({ shortenId }).lean().exec();

		return traffics;
	}
}
