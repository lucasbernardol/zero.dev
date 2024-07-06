import { customAlphabet } from 'nanoid/async';
import { alphanumeric } from 'nanoid-dictionary';

class NanoID {
	static NANOID_SIZE = 8;

	static #instance = null;

	static instance() {
		if (!this.#instance) {
			this.#instance = new NanoID({ size: this.NANOID_SIZE });
		}

		return this.#instance;
	}

	#genetator;

	constructor({ size }) {
		this.#genetator = customAlphabet(alphanumeric, size);
	}

	async nanoid(size = NanoID.NANOID_SIZE) {
		return await this.#genetator(size);
	}
}

export default NanoID.instance();
