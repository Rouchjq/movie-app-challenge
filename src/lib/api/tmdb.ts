// main tools
import axios from 'axios';

// commons
import { BACKDROP_SIZES_ENUMS, POSTER_SIZES_ENUMS } from '@/common/enums';
import { TMDB_IMAGE_BASE_URL } from '@/common/constants';

// types
import type { BackdropSizeType, PosterSizeType } from '@/types/models/tmdb';

interface MovieParams {
	page?: number;
	language?: string;
}

export const DEFAULT_PARAMS: MovieParams = {
	page: 1,
	language: 'en-US',
};

export const tmdbApi = () => {
	const axiosInstance = axios.create({
		baseURL: process.env.TMDB_API_URL,
		headers: {
			Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
		},
	});

	return axiosInstance;
};

export const getImageUrl = (
	path: string | null,
	type: 'backdrop' | 'poster',
	size?: BackdropSizeType | PosterSizeType,
): string | null => {
	if (!path) return null;

	const defaultSize =
		type === 'backdrop' ? BACKDROP_SIZES_ENUMS.MEDIUM : POSTER_SIZES_ENUMS.LARGE;

	return `${TMDB_IMAGE_BASE_URL}${size || defaultSize}${path}`;
};
