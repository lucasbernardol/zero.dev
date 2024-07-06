export class CreateShortenService {
	constructor(shortenRepository, nanoIdLibrary) {
		this.shortenRepository = shortenRepository;
		this.nanoIdLibrary = nanoIdLibrary;
	}

	async execute({ href }) {
		const hash = await this.nanoIdLibrary.nanoid();

		const shorten = await this.shortenRepository.create({
			href,
			hash,
		});

		return {
			code: shorten.hash,
			url: `${process.env.HOST}/${shorten.hash}`, // http://localhost:3000/e874fra8
		};
	}
}
