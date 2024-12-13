// utils/error-handling.ts
export interface MovieError {
	message: string;
	statusCode?: number;
}

export class MovieFetchError extends Error {
	statusCode?: number;

	constructor(message: string, statusCode?: number) {
		super(message);
		this.name = 'MovieFetchError';
		this.statusCode = statusCode;
	}
}
