import { StatusCodes } from 'http-status-codes';

export class RedirectShortenController {
	constructor(redirectShortenService) {
		this.redirectShortenService = redirectShortenService;
	}

	async execute({ request, response }) {
		const { hash } = request.params;

		const userAgent = request.headers['user-agent'] ?? 'anonymous';
		const referrer = request.headers['referer'] ?? 'anonymous';

		const { href } = await this.redirectShortenService.execute({
			hash,
			userAgent,
			referrer,
		});

		return response.status(StatusCodes.MOVED_TEMPORARILY).redirect(href);
	}
}
