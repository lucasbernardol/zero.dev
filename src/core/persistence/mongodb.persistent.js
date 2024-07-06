import mongoose from 'mongoose';

export class MongoDBDriverPersistence {
	#connectionURI = process.env.MONGODB_URI;

	/**
	 * @type {import('mongoose').ConnectOptions}
	 */
	#mongodbOptions = Object.freeze({
		autoIndex: true,
		autoCreate: true,
	});

	/**
	 * @type {MongoDBDriverPersistence}
	 */
	static #instance = null;

	static instance() {
		if (!this.#instance) {
			this.#instance = new MongoDBDriverPersistence(); // new this - singleton
		}

		return this.#instance;
	}

	constructor() {}

	#events() {
		mongoose.connection.on('open', () => this.#onConnectionOpened());
		mongoose.connection.on('error', (error) => this.#onError(error));
	}

	async connect() {
		try {
			this.#events();

			await mongoose.connect(this.#connectionURI, this.#mongodbOptions);
		} catch (error) {
			this.#onError(error);
		}
	}

	#onConnectionOpened() {
		console.log(`\nDatabase connected!`);
	}

	#onError(error) {
		console.log(error);

		process.exit(1);
	}
}

export const MongoDBDriver = MongoDBDriverPersistence.instance();
