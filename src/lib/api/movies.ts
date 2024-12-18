import { headers } from 'next/headers';
import { endpoints } from '@/common/constants';
import { MovieFetchError } from '../error-handling';

type MovieEndpoint = keyof typeof endpoints.MOVIE_LISTS;

interface MovieError {
	message: string;
	statusCode?: number;
}

const builBaseUrl = async () => {
	const headersList = await headers();
	const host = headersList.get('host') || 'localhost:3000';
	const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
	return `${protocol}://${host}`;
};

export const getMovies = async (endpoint: MovieEndpoint, params?: string) => {
	const baseUrl = await builBaseUrl();
	let url = `${baseUrl}/api/movies/${endpoints.MOVIE_LISTS[endpoint]}`;
	if (params) url += `?${params}`;
	try {
		const response = await fetch(url);

		if (!response.ok) {
			let errorMessage: MovieError = {
				message: 'An unexpected error occurred',
				statusCode: 500,
			};

			switch (response.status) {
				case 404:
					errorMessage = {
						message: `No movies found for ${endpoint.toLowerCase()}`,
						statusCode: 404,
					};
					break;
				case 429:
					errorMessage = {
						message: 'Rate limit exceeded, please try again later',
						statusCode: 429,
					};
					break;
				case 401:
					errorMessage = {
						message: 'Authentication failed',
						statusCode: 401,
					};
					break;
				default:
					const errorData = await response.json().catch(() => ({}));
					errorMessage = {
						message: errorData.message || 'Failed to fetch movies',
						statusCode: response.status,
					};
			}

			console.log(`🟢Error: ${errorMessage.message}`);
			throw new MovieFetchError(errorMessage.message, errorMessage.statusCode);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		if (error instanceof MovieFetchError) {
			throw error;
		}

		console.log('🚀 ~ getMovies ~ error:', error);
		throw new MovieFetchError('Failed to fetch movies', 500);
	}
};

export const getMovieById = async (id: string) => {
	const baseUrl = await builBaseUrl();

	const url = `${baseUrl}/api/movie/${id}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			let errorMessage: MovieError = {
				message: 'An unexpected error occurred',
				statusCode: 500,
			};

			switch (response.status) {
				case 404:
					errorMessage = {
						message: 'Movie not found',
						statusCode: 404,
					};
					break;
				case 401:
					errorMessage = {
						message: 'Authentication failed',
						statusCode: 401,
					};
					break;
				default:
					const errorData = await response.json().catch(() => ({}));
					errorMessage = {
						message: errorData.message || 'Failed to fetch movie',
						statusCode: response.status,
					};
			}

			throw new MovieFetchError(errorMessage.message, errorMessage.statusCode);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		if (error instanceof MovieFetchError) {
			throw error;
		}

		console.error('🚀 ~ getMovieById ~ error:', error);
		throw new MovieFetchError('Failed to fetch movie', 500);
	}
};

export const searchMovies = async (query: string, page?: string) => {
	const baseUrl = await builBaseUrl();
	const url = `${baseUrl}/api/movies/search?query=${query}&page=${page || 1}`;
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error('Failed to fetch search results');
		return response.json();
	} catch (error) {
		console.error('Error searching movies:', error);
		throw error;
	}
};
