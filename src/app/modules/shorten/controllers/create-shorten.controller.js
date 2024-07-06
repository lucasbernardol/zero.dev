import { StatusCodes } from 'http-status-codes';

export class CreateShortenController {
	constructor(createShortenService) {
		this.createShortenService = createShortenService;
	}

	// httpContext
	async execute({ request, response }) {
		const { href } = request.body;

		const shorten = await this.createShortenService.execute({ href });

		return response.status(StatusCodes.CREATED).json(shorten);
	}
}
