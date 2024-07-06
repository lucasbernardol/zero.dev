import { createServer } from 'node:http';

import { MongoDBDriver } from '@core/persistence/mongodb.persistent';

import { app } from './app';

const PORT = Number(process.env.PORT) || 3333;
const HOST = process.env.HOST;

function application(app) {
	const server = createServer(app);

	return new Promise((resolve, _reject) => {
		server.listen(PORT, () => {
			console.log(`\nHOST: ${HOST} - PORT: ${PORT}`);

			return resolve(server);
		});
	});
}

export async function bootstrap() {
	await MongoDBDriver.connect();

	const server = await application(app); // listen
}
