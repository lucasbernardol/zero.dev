import { Router } from 'express';
import { createShortenFactory } from './factories/create-shorten.factory';

const handle = (controller, handler) => {
	return async (request, response, next) => {
		const httpContext = {
			request,
			response,
		};

		try {
			await handler.bind(controller)(httpContext);
		} catch (error) {
			return next(error);
		}
	};
};

const createShortenController = createShortenFactory();

const routes = Router();

routes.post(
	'/shorts',
	handle(createShortenController, createShortenController.execute),
);

export default routes;
