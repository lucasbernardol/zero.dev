import Shorten from '../schemas/shorten.schema';

export class ShortenRepository {
	constructor() {}

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
}
