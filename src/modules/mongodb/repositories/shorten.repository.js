import Shorten from '../schemas/shorten.schema';

export class ShortenRepository {
	constructor() {}

	async exists({ hash }) {
		const entry = await Shorten.findOne({ hash })
			.select(['_id', 'href'])
			.lean()
			.exec();

		return entry;
	}

	async create({ href, hash }) {
		const entry = await Shorten.findOne({ hash }).select(['_id']).lean().exec();

		if (entry) {
			// TODO: CUSTON error
			throw new Error('Unique identify exists');
		}

		const shorten = await Shorten.create({
			href,
			hash,
		});

		return shorten;
	}

	async incRedirections({ shortenId }) {
		const entry = await Shorten.updateOne(
			{ _id: shortenId },
			{
				$inc: {
					redirectings: 1,
				},
			},
		);

		return entry;
	}
}
