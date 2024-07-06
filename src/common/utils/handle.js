export function handle(controller, method) {
	return async (request, response, next) => {
		const httpContext = {
			request,
			response,
		};

		try {
			const _method = method.bind(controller);

			return await _method(httpContext); //
		} catch (error) {
			return next(error);
		}
	};
}
