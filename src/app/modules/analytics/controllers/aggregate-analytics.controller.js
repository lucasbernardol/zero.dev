import { StatusCodes } from 'http-status-codes';

export class AggregateAnalyticsController {
	constructor(aggregateAnalyticsService) {
		this.aggregateAnalyticsService = aggregateAnalyticsService;
	}

	async execute({ request, response }) {
		const { hash } = request.params;

		const analytics = await this.aggregateAnalyticsService.execute({ hash });

		return response.status(StatusCodes.OK).json(analytics);
	}
}
