import { BadRequest } from 'http-errors';

function aggregate(analytics) {
	const browsers = [];
	const devices = [];
	const os = [];
	const daily = {};

	analytics.forEach((analytic) => {
		const date = new Date(analytic.createdAt).toLocaleDateString();

		if (!daily[date]) {
			daily[date] = 0;
		}

		daily[date] += 1;

		// browser
		if (analytic?.browser) {
			const browser = analytic.browser;

			const browserPosition = browsers.findIndex(
				({ name }) => name === browser,
			);

			if (browserPosition < 0) {
				browsers.push({
					name: browser,
					total: 0,
				});
			}

			browsers[browserPosition < 0 ? 0 : browserPosition].total += 1;
		}

		// device
		if (analytic?.device) {
			const device = analytic.device;

			const devicePosition = devices.findIndex(({ name }) => name === device);

			if (devicePosition < 0) {
				devices.push({
					name: device,
					total: 0,
				});
			}

			devices[devicePosition < 0 ? 0 : devicePosition].total += 1;
		}

		// os
		if (analytic.operationSystem) {
			const osName = analytic.operationSystem;

			const osPosition = os.findIndex(({ name }) => name === osName);

			if (osPosition < 0) {
				os.push({
					name: osName,
					total: 0,
				});
			}

			os[osPosition < 0 ? 0 : osPosition].total += 1;
		}
	});

	return {
		daily,
		aggregate: {
			browsers,
			devices,
			os,
		},
	};
}

export class AggregateAnalyticsService {
	constructor(shortenRepository, trafficRepository) {
		this.shortenRepository = shortenRepository;
		this.trafficRepository = trafficRepository;
	}

	async execute({ hash }) {
		const shorten = await this.shortenRepository.exists({ hash });

		if (!shorten) {
			throw new BadRequest('Invalid code/hash params');
		}

		const traffics = await this.trafficRepository.findMany({
			shortenId: shorten._id,
		});

		const analytics = aggregate(traffics);

		return {
			total: traffics.length,
			analytics,
		};
	}
}
